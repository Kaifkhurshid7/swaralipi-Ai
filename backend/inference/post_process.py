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
        # Sort by confidence descending
        dets = sorted(detections, key=lambda x: x['score'], reverse=True)
        keep = []
        
        while dets:
            best = dets.pop(0)
            keep.append(best)
            # Remove any remaining boxes that overlap significantly with 'best'
            dets = [d for d in dets if self._calculate_iou(best['bbox'], d['bbox']) < self.iou_threshold]
            
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
        Groups detections into lines using median height for adaptive grouping.
        """
        if not detections: return []
        
        # Calculate median box height for adaptive line grouping
        heights = [d['bbox'][3] - d['bbox'][1] for d in detections]
        median_h = np.median(heights)
        
        # Sort by top coordinate (Y1)
        dets = sorted(detections, key=lambda x: x['bbox'][1])
        
        rows = []
        if dets:
            current_row = [dets[0]]
            for i in range(1, len(dets)):
                prev_bbox = current_row[-1]['bbox']
                curr_bbox = dets[i]['bbox']
                
                # If Y difference is less than half the median swara height, they are on same line
                if abs(curr_bbox[1] - prev_bbox[1]) < (median_h * 0.5):
                    current_row.append(dets[i])
                else:
                    rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
                    current_row = [dets[i]]
            rows.append(sorted(current_row, key=lambda x: x['bbox'][0]))
        
        final_sequence = []
        for row in rows:
            final_sequence.extend(row)
            
        return final_sequence
