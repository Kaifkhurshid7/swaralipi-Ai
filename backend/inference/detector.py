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
    Runs multi-scale SAHI sliced inference for 99% accuracy mission.
    """
    # Run inference at two different slice scales to catch all swara sizes
    scales = [400, 600]
    all_predictions = []
    
    for size in scales:
        result = get_sliced_prediction(
            image,
            detection_model,
            slice_height=size,
            slice_width=size,
            overlap_height_ratio=0.3, # Increased overlap for better continuity
            overlap_width_ratio=0.3,
            postprocess_type="NMM",
            postprocess_match_threshold=0.5
        )
        all_predictions.extend(result.object_prediction_list)
    
    # We'll let SAHI's post-processing handle individual scale merges, 
    # but since we combined scales manually, we return the first result object with extended list 
    # as a simple way to pass it back to app.py
    final_result = get_sliced_prediction(image, detection_model, slice_height=1000, slice_width=1000)
    final_result.object_prediction_list = all_predictions
    return final_result
