import numpy as np
import cv2
from typing import List, Dict, Tuple

from pathlib import Path
from ultralytics import YOLO

MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "best.pt"

class SwaralipiDetector:
    def __init__(self, model_path: str = None):
        self.model_path = model_path or str(MODEL_PATH)
        
        if not Path(self.model_path).exists():
            print(f"Warning: Model file not found at {self.model_path}. Detection will fail.")
            self.model = None
        else:
            self.model = YOLO(self.model_path)

    def detect(self, image: np.ndarray, confidence_threshold: float = 0.3) -> List[Dict]:
        if self.model is None:
            return []

        results = self.model(image, conf=confidence_threshold)[0]
        detections = []

        for box in results.boxes:
            # box.xyxy[0] is [xmin, ymin, xmax, ymax]
            coords = box.xyxy[0].tolist()
            label_idx = int(box.cls[0])
            label = results.names[label_idx]
            conf = float(box.conf[0])

            detections.append({
                'label': label,
                'score': conf,
                'bbox': [int(coords[0]), int(coords[1]), int(coords[2]), int(coords[3])]
            })

        # Spatial ordering: row-based grouping (top-to-bottom then left-to-right)
        if detections:
            # Simple heuristic for row grouping: sort by y then x, 
            # and group items with similar y into the same row.
            detections.sort(key=lambda x: (x['bbox'][1], x['bbox'][0]))
            
            ordered = []
            if detections:
                rows = []
                current_row = [detections[0]]
                row_y_threshold = 40  # pixels difference for new row

                for i in range(1, len(detections)):
                    if detections[i]['bbox'][1] - current_row[-1]['bbox'][1] < row_y_threshold:
                        current_row.append(detections[i])
                    else:
                        rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
                        current_row = [detections[i]]
                rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
                
                for row in rows:
                    ordered.extend(row)
            
            return ordered

        return detections

# Singleton instance
_detector = None

def get_detector():
    global _detector
    if _detector is None:
        _detector = SwaralipiDetector()
    return _detector

def detect_swaras_from_bytes(image_bytes: bytes, confidence_threshold: float = 0.3):
    arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    detector = get_detector()
    return detector.detect(img, confidence_threshold=confidence_threshold)

