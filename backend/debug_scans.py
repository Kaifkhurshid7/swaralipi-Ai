import sqlite3
import json
import os

# Use the same path as database.py
DB_PATH = os.path.join(os.path.dirname(__file__), 'scans.db')

def inspect():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT timestamp, result_json FROM scans ORDER BY id DESC LIMIT 1')
        rows = cursor.fetchall()

        if not rows:
            print("No scans found in database.")
            return

        for ts, res_json in rows:
            data = json.loads(res_json)
            detections = data.get('detections', [])
            print(f"\nMOST RECENT SCAN at {ts}:")
            print(f"Total Detections: {len(detections)}")
            
            for i, d in enumerate(detections[:15]): # Show first 15
                print(f"  Det {i:2d}: Label='{d.get('label'):20s}' | English='{d.get('english_name'):15s}' | Symbol='{d.get('symbol'):5s}' | Score={d.get('score'):.2f}")
            
            if len(detections) > 15:
                print(f"  ... and {len(detections) - 15} more")
    except sqlite3.OperationalError as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    inspect()
