import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
      <div className="container-mobile bg-gradient-to-b from-background to-surface">
        <Navbar />
        <div className="content-area flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-mobile bg-gradient-to-b from-background to-surface">
      <Navbar />
      <div className="content-area bg-background">
        <header className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between sticky top-0 bg-white border-b border-gray-200 z-10">
          <button onClick={() => navigate(-1)} className="text-secondary hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-black">History</h2>
          <div className="w-6 sm:w-7"></div>
        </header>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-secondary">No scan history yet.</p>
          </div>
        ) : (
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 pb-20">
            {history.map((h) => (
              <div key={h.id}
                onClick={() => {
                  sessionStorage.setItem('lastResult', JSON.stringify(h.result));
                  navigate('/result');
                }}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs sm:text-sm text-secondary font-medium">
                    {new Date(h.timestamp).toLocaleDateString()} • {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-right">
                    <div className="text-black font-black text-base sm:text-lg">{(h.result.overall_confidence * 100).toFixed(0)}%</div>
                    <div className="text-[10px] text-secondary uppercase tracking-widest">Confidence</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {h.result.numeric_sequence.slice(0, 5).map((n: number, i: number) => (
                    <span key={i} className="px-3 py-1 bg-black text-white rounded-lg text-sm font-bold">{n}</span>
                  ))}
                  {h.result.numeric_sequence.length > 5 && <span className="text-secondary text-sm font-medium">...</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-white border-t border-gray-200 safe-area-bottom">
          <button onClick={() => navigate('/scan')} className="btn-primary py-3 sm:py-4">New Scan</button>
        </footer>
      </div>
    </div>
  );
};

export default History;

