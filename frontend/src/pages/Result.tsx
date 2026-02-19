import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface Detection {
  label: string;
  english_name: string;
  symbol: string;
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
      <div className="container-mobile bg-gradient-to-b from-background to-surface">
        <Navbar />
        <div className="content-area flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-black mb-4">No Result Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary max-w-xs py-3">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-mobile bg-gradient-to-b from-background to-surface">
      <Navbar />
      <div className="content-area bg-background">
        <header className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between sticky top-0 bg-white border-b border-gray-200 z-10">
          <button onClick={() => navigate('/')} className="text-secondary hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-black">Analysis Result</h2>
          <div className="w-6 sm:w-7"></div>
        </header>

        <div className="px-4 sm:px-6 py-6 sm:py-8">
          {/* Analysis Summary Section */}
          <section className="mb-6 sm:mb-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-widest">Annotations Detected</span>
                <span className="text-2xl sm:text-3xl font-black text-black">{data.detections.length}</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-widest">System Accuracy</span>
                <span className="text-2xl sm:text-3xl font-black text-primary">{(data.overall_confidence * 100).toFixed(1)}%</span>
              </div>

              <div>
                <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-widest block mb-4">Composition Names</span>
                <div className="flex flex-wrap gap-2">
                  {data.ordered_labels.map((label, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-bold border border-gray-200">
                      {label.split('(')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Breakdown Section */}
          <section className="mb-28 sm:mb-32">
            <h3 className="text-xs sm:text-sm text-secondary uppercase tracking-widest mb-4 font-bold px-1">Detailed Breakdown</h3>
            <div className="space-y-3 sm:space-y-4">
              {data.detections.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl hover:border-black transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl text-2xl font-bold shadow-sm">
                      {d.symbol}
                    </div>
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-black block leading-tight">{d.english_name || d.label}</span>
                      <span className="text-xs sm:text-sm text-secondary font-medium">Confidence: {Math.round(d.score * 100)}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-secondary font-bold uppercase tracking-tighter">Pos</div>
                    <div className="text-sm font-black text-black">#{i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-white border-t border-gray-200 grid grid-cols-2 gap-3 sm:gap-4 safe-area-bottom">
          <button onClick={() => navigate('/scan')} className="btn-secondary py-3 sm:py-4 text-sm sm:text-base">Rescan</button>
          <button onClick={() => window.print()} className="btn-primary py-3 sm:py-4 text-sm sm:text-base">Save</button>
        </footer>
      </div>
    </div>
  );
};

export default Result;
