"""
SQLite database operations for upload history and detection results.
"""
import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from typing import Any

from config import DATABASE_PATH


def _ensure_db_dir():
    os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)


@contextmanager
def get_connection():
    """Context manager that yields a SQLite connection with row factory."""
    _ensure_db_dir()
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    """Create tables if they do not exist."""
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                upload_date TEXT NOT NULL,
                file_path TEXT
            );

            CREATE TABLE IF NOT EXISTS detections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_id INTEGER NOT NULL,
                class_id INTEGER NOT NULL,
                class_name TEXT NOT NULL,
                bbox TEXT NOT NULL,
                confidence REAL NOT NULL,
                FOREIGN KEY (image_id) REFERENCES images(id)
            );
            """
        )


def save_upload(filename: str, file_path: str) -> int:
    """Record an uploaded image and return its database ID."""
    upload_date = datetime.now(timezone.utc).isoformat()
    with get_connection() as conn:
        cursor = conn.execute(
            "INSERT INTO images (filename, upload_date, file_path) VALUES (?, ?, ?)",
            (filename, upload_date, file_path),
        )
        return cursor.lastrowid


def save_detections(image_id: int, detections: list[dict[str, Any]]):
    """Persist detection results for an uploaded image."""
    with get_connection() as conn:
        for det in detections:
            conn.execute(
                """
                INSERT INTO detections
                    (image_id, class_id, class_name, bbox, confidence)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    image_id,
                    det.get("class_id", 0),
                    det["class"],
                    json.dumps(det["bbox"]),
                    det["confidence"],
                ),
            )


def get_stats() -> dict[str, Any]:
    """Return aggregate statistics for the dashboard."""
    with get_connection() as conn:
        total_images = conn.execute("SELECT COUNT(*) FROM images").fetchone()[0]
        total_detections = conn.execute("SELECT COUNT(*) FROM detections").fetchone()[0]

        per_class_rows = conn.execute(
            """
            SELECT class_name, COUNT(*) AS count
            FROM detections
            GROUP BY class_name
            ORDER BY count DESC
            """
        ).fetchall()

        per_class = {row["class_name"]: row["count"] for row in per_class_rows}

    return {
        "total_images": total_images,
        "total_detections": total_detections,
        "detections_per_class": per_class,
    }


def get_history(limit: int = 50) -> list[dict[str, Any]]:
    """Return recent uploads with their detections."""
    with get_connection() as conn:
        image_rows = conn.execute(
            """
            SELECT id, filename, upload_date
            FROM images
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()

        history = []
        for img in image_rows:
            det_rows = conn.execute(
                """
                SELECT class_id, class_name, bbox, confidence
                FROM detections
                WHERE image_id = ?
                ORDER BY confidence DESC
                """,
                (img["id"],),
            ).fetchall()

            detections = [
                {
                    "class_id": row["class_id"],
                    "class": row["class_name"],
                    "bbox": json.loads(row["bbox"]),
                    "confidence": row["confidence"],
                }
                for row in det_rows
            ]

            history.append(
                {
                    "id": img["id"],
                    "filename": img["filename"],
                    "upload_date": img["upload_date"],
                    "detection_count": len(detections),
                    "detections": detections,
                }
            )

    return history
