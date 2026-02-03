import torch
import functools
import numpy as np
import cv2
from typing import List, Dict, Tuple
from pathlib import Path
from ultralytics import YOLO

# PyTorch 2.6+ compatibility fix
# Monkeypatch torch.load to handle weight loading for older ultralytics models
if hasattr(torch, 'load'):
    original_load = torch.load
    def patched_load(*args, **kwargs):
        # We set weights_only=False because ultralytics models contain custom classes
        # that aren't on the default allowlist in PyTorch 2.6+
        if 'weights_only' not in kwargs:
            kwargs['weights_only'] = False
        return original_load(*args, **kwargs)
    torch.load = patched_load

MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "best.pt"

class SwaralipiDetector:
    def __init__(self, model_path: str = None):
        self.model_path = model_path or str(MODEL_PATH)
        
        if not Path(self.model_path).exists():
            print(f"CRITICAL: Model file not found at {self.model_path}")
            self.model = None
        else:
            try:
                print(f"Loading YOLO model from {self.model_path}...")
                self.model = YOLO(self.model_path)
                print("Model loaded successfully.")
            except Exception as e:
                print(f"CRITICAL: Failed to load YOLO model: {e}")
                import traceback
                traceback.print_exc()
                self.model = None

    def detect(self, image: np.ndarray, confidence_threshold: float = 0.3) -> List[Dict]:
        if self.model is None:
            return []

        img_h, img_w = image.shape[:2]
        all_detections = []

        # 1. SAHI Integration (Slicing Aided Hyper Inference)
        # Params: slice_height=640, slice_width=640, overlap_ratio=0.2
        slice_h, slice_w = 640, 640
        overlap = 0.2
        step_h = int(slice_h * (1 - overlap))
        step_w = int(slice_w * (1 - overlap))

        for y in range(0, img_h, step_h):
            for x in range(0, img_w, step_w):
                # Handle edge cases
                h_end = min(y + slice_h, img_h)
                w_end = min(x + slice_w, img_w)
                
                slice_img = image[y:h_end, x:w_end]
                if slice_img.size == 0: continue

                results = self.model(slice_img, conf=confidence_threshold, verbose=False)[0]
                
                for box in results.boxes:
                    coords = box.xyxy[0].tolist()
                    label_idx = int(box.cls[0])
                    label = results.names[label_idx]
                    conf = float(box.conf[0])

                    # Shift coordinates back to original image
                    all_detections.append({
                        'label': label,
                        'score': conf,
                        'bbox': [
                            int(coords[0] + x), 
                            int(coords[1] + y), 
                            int(coords[2] + x), 
                            int(coords[3] + y)
                        ]
                    })

        # 2. Conflict Resolution (Overlap > 80% -> keep higher confidence)
        refined = self._resolve_conflicts(all_detections, overlap_threshold=0.8)

        # 3. Multi-Label Verification (Conf < 70%)
        final_detections = []
        for det in refined:
            if det['score'] < 0.70:
                det = self._verify_modifiers(image, det)
            final_detections.append(det)

        # 4. Geometric Post-Processing (Line-Grouping with 50px tolerance)
        if final_detections:
            # Sort primarily by y (rows) then x (left-to-right)
            final_detections.sort(key=lambda x: (x['bbox'][1], x['bbox'][0]))
            
            ordered = []
            rows = []
            current_row = [final_detections[0]]
            row_y_tolerance = 50  # Increased to 50px as requested

            for i in range(1, len(final_detections)):
                if final_detections[i]['bbox'][1] - current_row[-1]['bbox'][1] < row_y_tolerance:
                    current_row.append(final_detections[i])
                else:
                    rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
                    current_row = [final_detections[i]]
            rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
            
            for row in rows:
                ordered.extend(row)
            return ordered
        
        return final_detections

    def _resolve_conflicts(self, detections: List[Dict], overlap_threshold: float) -> List[Dict]:
        """Keep higher confidence box if overlap (IoU) > threshold."""
        if not detections: return []
        
        # Sort by confidence descending
        dets = sorted(detections, key=lambda x: x['score'], reverse=True)
        keep = []
        
        while dets:
            best = dets.pop(0)
            keep.append(best)
            dets = [d for d in dets if self._calculate_iou(best['bbox'], d['bbox']) < overlap_threshold]
            
        return keep

    def _calculate_iou(self, boxA, boxB):
        xA = max(boxA[0], boxB[0])
        yA = max(boxA[1], boxB[1])
        xB = min(boxA[2], boxB[2])
        yB = min(boxA[3], boxB[3])
        interArea = max(0, xB - xA + 1) * max(0, yB - yA + 1)
        boxAArea = (boxA[2] - boxA[0] + 1) * (boxA[3] - boxA[1] + 1)
        boxBArea = (boxB[2] - boxB[0] + 1) * (boxB[3] - boxB[1] + 1)
        iou = interArea / float(boxAArea + boxBArea - interArea)
        return iou

    def _verify_modifiers(self, full_img, detection):
        """
        Triggered for low-confidence detections. 
        Perform secondary crop analysis for dots/lines.
        """
        # [Placeholder] In a production system, this would call a 
        # secondary CNN classifier for (Underline/Over-dot/Under-dot).
        # For now, we keep the detection but log the need for verification.
        # This structure allows for easy expansion.
        bbox = detection['bbox']
        crop = full_img[bbox[1]:bbox[3], bbox[0]:bbox[2]]
        
        # logic for 'Modifier Classifier' could go here
        # Example: if check_for_dot(crop): ...
        
        return detection

    def detect_from_bytes(self, image_bytes: bytes, confidence_threshold: float = 0.3) -> List[Dict]:
        arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if img is None:
            return []
        return self.detect(img, confidence_threshold=confidence_threshold)

# Singleton instance
_detector = None

def get_detector():
    global _detector
    if _detector is None:
        _detector = SwaralipiDetector()
    return _detector

def detect_swaras_from_bytes(image_bytes: bytes, confidence_threshold: float = 0.3):
    detector = get_detector()
    return detector.detect_from_bytes(image_bytes, confidence_threshold=confidence_threshold)
