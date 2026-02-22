import sqlite3
import json

conn = sqlite3.connect('scans.db')
cursor = conn.cursor()
cursor.execute('SELECT timestamp, result_json FROM scans ORDER BY timestamp DESC LIMIT 10')
rows = cursor.fetchall()

for ts, res_json in rows:
    data = json.loads(res_json)
    detections = data.get('detections', [])
    print(f"\n{ts}:")
    for d in detections:
        print(f"  - Label: '{d.get('label')}' | Symbol: '{d.get('symbol')}'")
conn.close()
