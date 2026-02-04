from pathlib import Path
import torch
import numpy as np
from sahi.models.ultralytics import UltralyticsDetectionModel
from sahi.predict import get_sliced_prediction

# PyTorch 2.6+ compatibility fix
if hasattr(torch, 'load'):
    original_load = torch.load
    def patched_load(*args, **kwargs):
        if 'weights_only' not in kwargs:
            kwargs['weights_only'] = False
        return original_load(*args, **kwargs)
    torch.load = patched_load

# Absolute path to best_new.pt
MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "best_new.pt"

# Load YOLOv8 model with SAHI
detection_model = UltralyticsDetectionModel(
    model_path=str(MODEL_PATH),
    confidence_threshold=0.3,
    device="cpu"   # change to "cuda" if GPU is available
)

def run_detection(image: np.ndarray):
    """
    Runs SAHI sliced inference with optimized parameters for small notes.
    """
    # Optimized for 800-1200px scanned documents
    result = get_sliced_prediction(
        image,
        detection_model,
        slice_height=480,
        slice_width=480,
        overlap_height_ratio=0.25,
        overlap_width_ratio=0.25,
        postprocess_type="NMM", # Non-Maximum Merging for better boundary handling
        postprocess_match_threshold=0.5
    )
    return result
