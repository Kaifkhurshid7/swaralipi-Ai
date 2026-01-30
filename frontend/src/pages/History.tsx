import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../services/api';

const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getHistory().then(res => {
      setHistory(res);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-secondary hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white">History</h2>
        <div className="w-8"></div>
      </header>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No scan history yet.</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pb-8">
          {history.map((h) => (
            <div key={h.id}
              onClick={() => {
                sessionStorage.setItem('lastResult', JSON.stringify(h.result));
                navigate('/result');
              }}
              className="card cursor-pointer hover:border-primary/20 transition-all flex items-center justify-between">
              <div>
                <div className="text-sm text-secondary mb-1">
                  {new Date(h.timestamp).toLocaleDateString()} • {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex gap-2">
                  {h.result.numeric_sequence.slice(0, 4).map((n: number, i: number) => (
                    <span key={i} className="text-accent font-bold">{n}</span>
                  ))}
                  {h.result.numeric_sequence.length > 4 && <span>...</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-primary font-black text-lg">{(h.overall_confidence * 100).toFixed(0)}%</div>
                <div className="text-[10px] text-secondary uppercase tracking-widest">Conf.</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="pt-4">
        <button onClick={() => navigate('/scan')} className="btn-primary">New Scan</button>
      </footer>
    </div>
  );
};

export default History;

