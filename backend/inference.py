"""
Run Faster R-CNN inference on dental X-ray images.
"""
import logging
from typing import Any

import numpy as np
import torch
from PIL import Image
from torchvision import transforms

from config import CLASS_NAMES, CONFIDENCE_THRESHOLD, IMAGE_SIZE

logger = logging.getLogger(__name__)

# ImageNet normalization (matches torchvision pretrained conventions)
TRANSFORM = transforms.Compose(
    [
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ]
)


def _describe_location(bbox: list[float], img_w: int, img_h: int) -> str:
    """
    Convert bounding box center to a human-readable quadrant label.

    Args:
        bbox: [x, y, width, height] in original image coordinates
        img_w, img_h: Original image dimensions
    """
    x, y, w, h = bbox
    cx = x + w / 2
    cy = y + h / 2

    vertical = "Upper" if cy < img_h / 2 else "Lower"
    horizontal = "Left" if cx < img_w / 2 else "Right"

    # Near center
    if abs(cx - img_w / 2) < img_w * 0.15 and abs(cy - img_h / 2) < img_h * 0.15:
        return "Center"

    return f"{vertical} {horizontal}"


def preprocess_image(image: Image.Image) -> tuple[torch.Tensor, tuple[int, int]]:
    """
    Convert PIL image to model input tensor.

    Returns:
        tensor: (1, 3, H, W) batch tensor
        original_size: (width, height) before resize
    """
    if image.mode != "RGB":
        image = image.convert("RGB")

    original_size = image.size  # (width, height)
    tensor = TRANSFORM(image)
    return tensor.unsqueeze(0), original_size


def run_inference(
    model,
    image: Image.Image,
    confidence_threshold: float = CONFIDENCE_THRESHOLD,
) -> list[dict[str, Any]]:
    """
    Run detection on a PIL image and return filtered results.

    Returns list of:
        {
            "class_id": int,
            "class": str,
            "bbox": [x, y, width, height],  # original image coords
            "confidence": float,
            "location": str
        }
    """
    tensor, (orig_w, orig_h) = preprocess_image(image)

    with torch.no_grad():
        outputs = model(tensor)

    output = outputs[0]
    boxes = output["boxes"].cpu().numpy()
    labels = output["labels"].cpu().numpy()
    scores = output["scores"].cpu().numpy()

    scale_x = orig_w / IMAGE_SIZE
    scale_y = orig_h / IMAGE_SIZE

    detections = []
    for box, label, score in zip(boxes, labels, scores):
        if score < confidence_threshold:
            continue

        class_id = int(label)
        if class_id not in CLASS_NAMES:
            continue

        x1, y1, x2, y2 = box
        # Scale back to original image dimensions
        x1 = float(x1 * scale_x)
        y1 = float(y1 * scale_y)
        x2 = float(x2 * scale_x)
        y2 = float(y2 * scale_y)

        bbox = [x1, y1, x2 - x1, y2 - y1]
        detections.append(
            {
                "class_id": class_id,
                "class": CLASS_NAMES[class_id],
                "bbox": [round(v, 2) for v in bbox],
                "confidence": round(float(score), 4),
                "location": _describe_location(bbox, orig_w, orig_h),
            }
        )

    # Sort by confidence descending
    detections.sort(key=lambda d: d["confidence"], reverse=True)
    logger.info("Found %d detections above threshold %.2f", len(detections), confidence_threshold)
    return detections
