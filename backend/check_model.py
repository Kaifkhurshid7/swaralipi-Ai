import torch
from pathlib import Path

# Patch torch.load for compatibility
if hasattr(torch, 'load'):
    original_load = torch.load
    def patched_load(*args, **kwargs):
        if 'weights_only' not in kwargs:
            kwargs['weights_only'] = False
        return original_load(*args, **kwargs)
    torch.load = patched_load

from ultralytics import YOLO

MODEL_PATH = "models/brain.pt"
try:
    model = YOLO(MODEL_PATH)
    import json
    print(f"MODEL_NAMES: {json.dumps(model.names)}")
except Exception as e:
    print(f"ERROR: {e}")
