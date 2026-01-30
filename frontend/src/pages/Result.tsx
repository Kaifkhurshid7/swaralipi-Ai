import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Detection {
  label: string;
  score: number;
  bbox: number[];
  numeric: number | null;
}

interface ResultData {
  detections: Detection[];
  ordered_labels: string[];
  numeric_sequence: number[];
  overall_confidence: number;
}

const Result: React.FC = () => {
  const [data, setData] = useState<ResultData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = sessionStorage.getItem('lastResult');
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse result');
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No Result Found</h2>
        <button onClick={() => navigate('/')} className="btn-primary max-w-xs">Go Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-secondary hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">Analysis Result</h2>
        <div className="w-8"></div>
      </header>

      <section className="mb-8">
        <div className="card text-center py-8">
          <div className="text-sm text-secondary uppercase tracking-widest mb-2 font-bold">Overall Confidence</div>
          <div className="text-5xl font-black text-primary">
            {(data.overall_confidence * 100).toFixed(1)}%
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-sm text-secondary uppercase tracking-widest mb-4 font-bold">Numeric Sequence</h3>
        <div className="flex flex-wrap gap-3">
          {data.numeric_sequence.map((n, i) => (
            <div key={i} className="w-12 h-12 flex items-center justify-center bg-surface border border-white/10 rounded-xl text-xl font-black text-accent drop-shadow-sm">
              {n}
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 overflow-y-auto mb-8">
        <h3 className="text-sm text-secondary uppercase tracking-widest mb-4 font-bold">Detected Swaras</h3>
        <div className="space-y-3">
          {data.detections.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-white/5">
              <span className="text-xl font-bold">{d.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-secondary text-sm">Mapping: <span className="text-accent font-mono">{d.numeric}</span></span>
                <span className="text-xs text-white/20">{(d.score * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 pb-6">
        <button onClick={() => navigate('/scan')} className="btn-secondary">Rescan</button>
        <button onClick={() => window.print()} className="btn-primary">Save Result</button>
      </div>
    </div>
  );
};

export default Result;
