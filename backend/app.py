import os
import sys
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Add the backend directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from mapping.swara_map import map_swara_to_num
from database import save_scan, get_history
from schemas import DetectResponse, Detection
from inference.detector import get_detector

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


@app.get('/health')
def health():
    detector = get_detector()
    return {
        "status": "healthy",
        "model_loaded": detector.model is not None,
        "model_path": detector.model_path
    }


@app.post('/detect', response_model=DetectResponse)
async def detect(file: UploadFile = File(...), confidence: float = 0.3):
    content = await file.read()
    try:
        detector = get_detector()
        detections = detector.detect_from_bytes(content, confidence_threshold=confidence)
    except Exception as e:
        logger.error(f"Detection failed: {e}")
        import traceback
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Backend Analysis Failed. Check server logs.")

    ordered_labels = [d['label'] for d in detections]
    numeric_sequence = [map_swara_to_num(lbl) for lbl in ordered_labels]
    overall_confidence = float(sum(d['score'] for d in detections) / len(detections)) if detections else 0.0

    det_objs = []
    for d, num in zip(detections, numeric_sequence):
        det = Detection(label=d['label'], score=d['score'], bbox=d['bbox'], numeric=num)
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
        save_scan(response.dict())
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
