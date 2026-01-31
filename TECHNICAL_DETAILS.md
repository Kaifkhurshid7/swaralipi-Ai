# Swaralipi AI - Technical Architecture & Methodology


## 1. Deep Learning Architecture: YOLOv8
The core of the system is based on **YOLOv8 (You Only Look Once version 8)**, a state-of-the-art Deep Learning model for real-time object detection.

- **Method**: Single-stage object detection. Unlike older methods that first propose regions and then classify them, YOLO looks at the entire image in a single pass of the neural network.
- **Model File**: Located at `backend/models/best.pt`. This is a pre-trained model fine-tuned specifically on Swaralipi notation datasets (Sa, Re, Ga, Ma, etc.).
- **Inference Logic**: Found in `backend/inference/detector.py`. It uses the `ultralytics` library to load the weights and run predictions on uploaded images.

## 2. Spatial Ordering Algorithm
Object detection models return bounding boxes in random order (based on confidence). For music notation, the **chronological order** (left-to-right, top-to-bottom) is critical.

**The Algorithm (`detector.py`):**
1. **Vertical Grouping (Row Detection)**: The code groups detection boxes that have similar Y-coordinates (within a 40-pixel threshold). This essentially "discovers" lines of music.
2. **Horizontal Sorting**: Within each identified row, the swaras are sorted by their X-coordinate.
3. **Sequential Mapping**: Rows are then concatenated from top to bottom, producing a linear string of swaras that matches the human reading pattern.

## 3. Confidence Scores
Each result includes a "Confidence Score" which represents the AI's certainty.

- **Individual Score**: For every single note detected, the model provides a probability (e.g., 0.92 for 'Sa').
- **Overall Confidence**: Calculated in `backend/app.py` as the simple average of all individual scores in the detection list.
- **Thresholding**: The system defaults to a `0.3` confidence threshold. Anything below 30% certainty is discarded to prevent "ghost" detections or noise.

## 4. System Flow & File Roles

### Backend (Python/FastAPI)
- `backend/app.py`: The API "Gateway." It handles incoming image uploads, calls the detector, calculates the sequence, and returns a JSON response.
- `backend/inference/detector.py`: The "Brain." It manages the YOLOv8 model loading and the spatial sorting algorithm.
- `backend/mapping/swara_map.py`: The "Translator." It uses Regular Expressions (Regex) to map complex AI labels (like `Sa(dot above)`) into simple numeric representations or clean identifiers.
- `backend/database.py`: The "Memory." StoresEvery scan in a local SQLite database (`scans.db`) for future history viewing.

### Frontend (React/Vite/TypeScript)
- `frontend/src/services/api.ts`: Communicates with the backend via `fetch` calls.
- `frontend/src/pages/Scan.tsx`: Manages the camera/upload UI and triggers the analysis.
- `frontend/src/pages/Result.tsx`: Visualizes the bounding boxes and the detected sequence returned by the API.

---

## 5. Technology Stack Summary
| Component | Technology |
| :--- | :--- |
| **Model** | YOLOv8 (Deep Learning) |
| **Backend** | FastAPI (Python 3) |
| **Computer Vision** | OpenCV + PyTorch |
| **Frontend** | React + Tailwind CSS |
| **State Mgmt** | React Hooks + SessionStorage |
| **Database** | SQLite3 |
