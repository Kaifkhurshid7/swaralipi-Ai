import cv2
import numpy as np
from inference.detector import run_detection
from mapping.swara_map import get_swara_details

# Load a sample image if exists, or just log info
def test_diag():
    print("--- Diagnostic Test Start ---")
    # Just checking model names again to be triple sure
    from ultralytics import YOLO
    model = YOLO('models/brain.pt')
    print(f"Model Names: {model.names}")
    
    # Check mapping
    from mapping.swara_map import SWARA_DETAILS
    print(f"Mapping Keys: {list(SWARA_DETAILS.keys())}")
    
    # Comparison
    for i, name in model.names.items():
        if name not in SWARA_DETAILS:
            print(f"WARNING: Model class '{name}' NOT in mapping!")
        else:
            print(f"SUCCESS: Model class '{name}' matches mapping.")

if __name__ == "__main__":
    test_diag()
