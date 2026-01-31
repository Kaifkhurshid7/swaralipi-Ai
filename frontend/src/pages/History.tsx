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
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Retrieving Records</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-8 pb-32">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-black tracking-tighter italic">RECORDS</h2>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </header>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm font-medium">No notation history found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((h) => (
              <div
                key={h.id}
                onClick={() => {
                  sessionStorage.setItem('lastResult', JSON.stringify(h.result));
                  navigate('/result');
                }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-black transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black italic leading-none">
                      {(h.result.overall_confidence * 100).toFixed(0)}%
                    </span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Match</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {h.result.numeric_sequence.slice(0, 6).map((n: number, i: number) => (
                      <span key={i} className="w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-black text-[11px] font-black rounded-lg">
                        {n}
                      </span>
                    ))}
                    {h.result.numeric_sequence.length > 6 && (
                      <span className="text-gray-300 text-xs font-black self-center ml-1">...</span>
                    )}
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 left-0 right-0 px-6 flex justify-center pointer-events-none">
          <button
            onClick={() => navigate('/scan')}
            className="pointer-events-auto bg-black text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            New Scan
          </button>
        </div>
      </main>
    </div>
  );
};

export default History;