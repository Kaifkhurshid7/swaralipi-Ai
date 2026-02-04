from ultralytics import YOLO
import json
import os

try:
    model = YOLO("backend/models/best_new.pt")
    names = model.names
    with open("model_classes.json", "w", encoding="utf-8") as f:
        json.dump(names, f, indent=4)
    print("SUCCESS")
except Exception as e:
    print(f"FAILED: {e}")
