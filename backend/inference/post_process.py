import numpy as np
from typing import List, Dict

class PostProcessor:
    def __init__(self, confidence_threshold: float = 0.45, iou_threshold: float = 0.4):
        self.confidence_threshold = confidence_threshold
        self.iou_threshold = iou_threshold

    def process(self, detections: List[Dict]) -> List[Dict]:
        """
        Main pipeline: Filter -> Resolve Conflicts -> Sort
        """
        # 1. Base Filter (Confidence + Geometric)
        filtered = []
        for d in detections:
            x1, y1, x2, y2 = d['bbox']
            w, h = x2 - x1, y2 - y1
            
            # Confidence floor
            if d['score'] < self.confidence_threshold:
                continue
            
            # Filter extremely elongated boxes (likely lyrics or bar lines)
            if w > h * 3 or h > w * 3:
                continue
                
            filtered.append(d)
        
        if not filtered:
            return []

        # 2. Conflict Resolution (Non-Maximum Suppression)
        # Keep highest confidence when boxes overlap significantly
        resolved = self._resolve_conflicts(filtered)

        # 3. Spatial Sorting (Multi-line)
        sorted_detections = self._spatial_sort(resolved)

        return sorted_detections

    def _resolve_conflicts(self, detections: List[Dict]) -> List[Dict]:
        """Keep higher confidence box if overlap (IoU) > threshold."""
        if not detections: return []
        
        # Sort by confidence descending
        dets = sorted(detections, key=lambda x: x['score'], reverse=True)
        keep = []
        
        while dets:
            best = dets.pop(0)
            keep.append(best)
            
            # Refined overlap handling: 
            # If two boxes overlap heavily (>0.5), remove the weaker one.
            # If they overlap slightly, they might be adjacent swaras - keep both.
            dets = [d for d in dets if self._calculate_iou(best['bbox'], d['bbox']) < 0.45]
            
        return keep

    def _calculate_iou(self, boxA, boxB):
        xA = max(boxA[0], boxB[0])
        yA = max(boxA[1], boxB[1])
        xB = min(boxA[2], boxB[2])
        yB = min(boxA[3], boxB[3])
        
        interArea = max(0, xB - xA) * max(0, yB - yA)
        boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1])
        boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1])
        
        if boxAArea + boxBArea - interArea == 0:
            return 0
            
        iou = interArea / float(boxAArea + boxBArea - interArea)
        return iou

    def _spatial_sort(self, detections: List[Dict]) -> List[Dict]:
        """
        Groups detections into lines using vertical centers (Y-center) for stability.
        """
        if not detections: return []
        
        # Add center-y for calculation
        for d in detections:
            bbox = d['bbox']
            d['cy'] = (bbox[1] + bbox[3]) / 2
            d['h'] = bbox[3] - bbox[1]
        
        # Sort primarily by Y-center
        dets = sorted(detections, key=lambda x: x['cy'])
        
        # Calculate adaptive line height based on average swara height
        avg_h = np.mean([d['h'] for d in dets])
        line_threshold = avg_h * 0.6  # If centers are within 60% of avg height, same line
        
        rows = []
        if dets:
            current_row = [dets[0]]
            for i in range(1, len(dets)):
                prev = current_row[-1]
                curr = dets[i]
                
                # If Y centers are close enough, they belong to the same line
                if abs(curr['cy'] - prev['cy']) < line_threshold:
                    current_row.append(curr)
                else:
                    rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
                    current_row = [curr]
            rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
        
        final_sequence = []
        for row in rows:
            final_sequence.extend(row)
            
        return final_sequence
