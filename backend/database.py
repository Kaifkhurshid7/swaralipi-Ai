import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'scans.db')
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS scans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            result_json TEXT,
            overall_confidence REAL
        )
        '''
    )
    conn.commit()
    conn.close()

def save_scan(result: dict) -> int:
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    ts = datetime.utcnow().isoformat() + 'Z'
    cur.execute('INSERT INTO scans (timestamp, result_json, overall_confidence) VALUES (?,?,?)',
                (ts, json.dumps(result, ensure_ascii=False), float(result.get('overall_confidence', 0.0))))
    conn.commit()
    rowid = cur.lastrowid
    conn.close()
    return rowid


def get_history(limit: int = 100):
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('SELECT id, timestamp, result_json, overall_confidence FROM scans ORDER BY id DESC LIMIT ?', (limit,))
    rows = cur.fetchall()
    conn.close()
    results = []
    for r in rows:
        results.append({
            'id': r[0],
            'timestamp': r[1],
            'result': json.loads(r[2]),
            'overall_confidence': r[3]
        })
    return results
