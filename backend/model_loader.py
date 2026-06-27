"""
Load the Faster R-CNN dental anomaly detector for CPU inference.

The model is loaded once at server startup and reused for all requests.
"""
import logging
import os

import torch
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor

from config import MODEL_PATH, NUM_CLASSES

logger = logging.getLogger(__name__)


def build_model(num_classes: int = NUM_CLASSES):
    """Build Faster R-CNN with ResNet50-FPN backbone."""
    model = fasterrcnn_resnet50_fpn(weights=None)
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)
    return model


def load_model(model_path: str = MODEL_PATH):
    """
    Load the trained model onto CPU for Replit deployment.

    Returns:
        model: Eval-mode Faster R-CNN on CPU

    Raises:
        FileNotFoundError: If the .pth file is missing
        RuntimeError: If weights cannot be loaded
    """
    if not os.path.isfile(model_path):
        raise FileNotFoundError(
            f"Model not found at '{model_path}'. "
            "Upload dental_model_v2.pth to the models/ folder."
        )

    device = torch.device("cpu")
    model = build_model(NUM_CLASSES)

    try:
        checkpoint = torch.load(model_path, map_location=device, weights_only=False)
    except TypeError:
        # Older PyTorch versions without weights_only parameter
        checkpoint = torch.load(model_path, map_location=device)

    # Support both raw state_dict and checkpoint dict formats
    if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint:
        state_dict = checkpoint["model_state_dict"]
    elif isinstance(checkpoint, dict) and "state_dict" in checkpoint:
        state_dict = checkpoint["state_dict"]
    else:
        state_dict = checkpoint

    # Load weights, allowing partial match if classifier head differs
    missing, unexpected = model.load_state_dict(state_dict, strict=False)
    if missing:
        logger.warning("Missing keys when loading model: %s", missing[:5])
    if unexpected:
        logger.warning("Unexpected keys when loading model: %s", unexpected[:5])

    model.to(device)
    model.eval()
    logger.info("Model loaded from %s (CPU inference)", model_path)
    return model
