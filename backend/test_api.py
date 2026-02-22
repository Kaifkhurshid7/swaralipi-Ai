import requests
import json
import os

# Try to find any image in the current directory or dataset
image_path = None
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.lower().endswith(('.jpg', '.png')):
            image_path = os.path.join(root, f)
            break
    if image_path: break

if not image_path:
    print("No image found for testing.")
    exit(1)

print(f"Testing with image: {image_path}")

url = "http://127.0.0.1:8000/detect"
with open(image_path, 'rb') as f:
    files = {'file': f}
    try:
        r = requests.post(url, files=files)
        print(f"Status: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            labels = [d['label'] for d in data['detections']]
            symbols = [d['symbol'] for d in data['detections']]
            print(f"Labels: {labels}")
            print(f"Symbols: {symbols}")
        else:
            print(f"Error: {r.text}")
    except Exception as e:
        print(f"Failed to connect to backend: {e}")
