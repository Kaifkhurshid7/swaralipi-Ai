import os
import sys
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from typing import List

# Add the backend directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from mapping.swara_map import map_swara_to_num, get_swara_details
from database import save_scan, get_history
from schemas import DetectResponse, Detection
from inference.detector import run_detection

import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title='Swaralipi Detection API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

def deskew(img: np.ndarray) -> np.ndarray:
    """Corrects image rotation for better horizontal alignment."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.bitwise_not(gray)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    
    coords = np.column_stack(np.where(thresh > 0))
    angle = cv2.minAreaRect(coords)[-1]
    
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
        
    (h, w) = img.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(img, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated

def enhance_notation(img: np.ndarray) -> np.ndarray:
    """
    Swaralipi X-Engine Pre-processing
    Uses CLAHE (Contrast Limited Adaptive Histogram Equalization) and deskewing.
    """
    # 1. Deskew
    img = deskew(img)
    
    # 2. Convert to LAB color space and apply CLAHE to L-channel
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    final = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
    
    # 3. Denoising
    final = cv2.fastNlMeansDenoisingColored(final, None, 10, 10, 7, 21)
    
    return final


@app.get('/health')
def health():
    return {
        "status": "healthy",
        "engine": "SAHI"
    }


@app.post('/detect', response_model=DetectResponse)
async def detect(file: UploadFile = File(...), confidence: float = 0.3):
    content = await file.read()
    try:
        # Decode image
        nparr = np.frombuffer(content, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")

        # Apply Clear-Ink Filter
        enhanced_img = enhance_notation(img)

        # Run SAHI detection
        result = run_detection(enhanced_img)
        
        # Convert SAHI result to expected format
        detections = []
        for pred in result.object_prediction_list:
            detections.append({
                'label': pred.category.name,
                'score': float(pred.score.value),
                'bbox': [int(pred.bbox.minx), int(pred.bbox.miny), int(pred.bbox.maxx), int(pred.bbox.maxy)]
            })
        
        # Semantic Sequence Policing: Filter out 'merged' or 'noise' boxes
        # Extreme aspect ratios or huge boxes are usually wrong
        filtered_detections = []
        for d in detections:
            x1, y1, x2, y2 = d['bbox']
            w, h = x2 - x1, y2 - y1
            if w > h * 6 or h > w * 6: # Slightly more lenient for SAHI
                continue
            filtered_detections.append(d)
        detections = filtered_detections

    except Exception as e:
        logger.error(f"Detection failed: {e}")
        import traceback
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Backend Analysis Failed. Check server logs.")

    ordered_labels = [d['label'] for d in detections]
    numeric_sequence = [map_swara_to_num(lbl) for lbl in ordered_labels]
    overall_confidence = float(sum(d['score'] for d in detections) / len(detections)) if detections else 0.0

    det_objs = []
    for d in detections:
        details = get_swara_details(d['label'])
        det = Detection(
            label=d['label'],
            english_name=details['english'],
            symbol=details['symbol'],
            score=d['score'],
            bbox=d['bbox'],
            numeric=details['numeric']
        )
        det_objs.append(det)

    from datetime import datetime
    response = DetectResponse(
        detections=det_objs, 
        ordered_labels=ordered_labels,
        numeric_sequence=numeric_sequence, 
        overall_confidence=overall_confidence,
        timestamp=datetime.utcnow().isoformat() + 'Z',
        model_info="YOLOv8-Swaralipi-Detector"
    )

    # persist
    try:
        save_scan(response.model_dump())
    except Exception:
        # non-fatal
        pass

    return response


@app.get('/history')
def history(limit: int = 50):
    return get_history(limit)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
