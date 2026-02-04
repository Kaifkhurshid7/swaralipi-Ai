from pathlib import Path
import torch
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

def run_detection(image_path: str):
    """
    Runs SAHI sliced inference on an image
    """
    result = get_sliced_prediction(
        image_path,
        detection_model,
        slice_height=640,
        slice_width=640,
        overlap_height_ratio=0.2,
        overlap_width_ratio=0.2
    )
    return result
