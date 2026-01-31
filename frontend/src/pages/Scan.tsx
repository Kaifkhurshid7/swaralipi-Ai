import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { uploadImage } from '../services/api';

const Scan: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setLoading(true);
    try {
      const res = await uploadImage(f);
      sessionStorage.setItem('lastResult', JSON.stringify(res));
      navigate('/result');
    } catch (err) {
      alert('Upload failed. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh] px-8 text-center">
          <div className="relative w-24 h-24 mb-10">
            {/* Minimalist Scanner Animation */}
            <div className="absolute inset-0 border-2 border-gray-100 rounded-3xl"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-black rounded-full animate-scan-line shadow-[0_0_15px_rgba(0,0,0,0.2)]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-tighter italic mb-2 uppercase">Analyzing</h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
            Neural Network Processing<br />Detecting Swara Nodes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-8 pb-32">
        {/* Header Control */}
        <header className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 hover:border-black active:scale-90 transition-all"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-black tracking-tighter italic uppercase">Scanner</h2>
          <div className="w-12"></div>
        </header>

        {/* Viewfinder Interaction Area */}
        <div
          onClick={() => fileRef.current?.click()}
          className="relative group cursor-pointer active:scale-[0.99] transition-transform duration-300"
        >
          {/* High-Contrast Viewfinder Brackets */}
          <div className="absolute -top-2 -left-2 w-10 h-10 border-t-[6px] border-l-[6px] border-black rounded-tl-2xl z-20"></div>
          <div className="absolute -top-2 -right-2 w-10 h-10 border-t-[6px] border-r-[6px] border-black rounded-tr-2xl z-20"></div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[6px] border-l-[6px] border-black rounded-bl-2xl z-20"></div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[6px] border-r-[6px] border-black rounded-br-2xl z-20"></div>

          <div className="w-full aspect-[3/4] bg-gray-50 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden border border-gray-200 relative">
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', size: '20px 20px' }}></div>

            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-gray-100">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" strokeWidth={1.2} />
              </svg>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 max-w-[220px] text-center leading-relaxed px-6">
              Align notations within the frame for high-accuracy AI detection
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onPick}
          />
        </div>

        {/* Engine Status Tag */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-100 bg-gray-50/50 shadow-sm">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">System: YOLOv8-Inference-Engine</p>
          </div>
        </div>

        {/* Primary Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-xl border-t border-gray-50">
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 transition-all"
          >
            Launch Interface
          </button>
          <div className="flex justify-center gap-4 mt-5">
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">JPG</span>
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">PNG</span>
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">RAW</span>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Scan;