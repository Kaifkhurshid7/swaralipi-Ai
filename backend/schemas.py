from pydantic import BaseModel
from typing import List


class Detection(BaseModel):
    label: str
    english_name: str | None = None
    symbol: str | None = None
    score: float
    bbox: List[int]
    numeric: int | None = None


class DetectResponse(BaseModel):
    detections: List[Detection]
    ordered_labels: List[str]
    numeric_sequence: List[int]
    overall_confidence: float
    timestamp: str | None = None
    model_info: str | None = None


class ScanRecord(BaseModel):
    id: int
    timestamp: str
    result: DetectResponse
    overall_confidence: float
