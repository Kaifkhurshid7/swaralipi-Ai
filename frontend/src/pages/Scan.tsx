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
          <div className="relative w-24 h-24 mb-8">
            {/* Minimalist Scanner Animation */}
            <div className="absolute inset-0 border-2 border-gray-100 rounded-2xl"></div>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-black animate-scan-line"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-xl font-black tracking-tighter italic mb-2 uppercase">Analyzing</h2>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            Detecting Swaras • Mapping Sequence
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-8 pb-32">
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-black tracking-tighter italic">SCANNER</h2>
          <div className="w-10"></div>
        </header>

        {/* Viewfinder Area */}
        <div
          onClick={() => fileRef.current?.click()}
          className="relative group cursor-pointer active:scale-[0.98] transition-all"
        >
          {/* Corner Brackets for Viewfinder */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black rounded-tl-xl z-10"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black rounded-tr-xl z-10"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black rounded-bl-xl z-10"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black rounded-br-xl z-10"></div>

          <div className="w-full aspect-[3/4] bg-gray-50 rounded-2xl flex flex-col items-center justify-center overflow-hidden border border-gray-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" strokeWidth={1.5} />
              </svg>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 max-w-[200px] text-center leading-relaxed px-4">
              Place notation book within frame for optimal detection
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

        {/* Guidance Section */}
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-bold text-gray-600 tracking-tight">AI Engine Ready: YOLOv8 Inference</p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-md">
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all"
          >
            Launch Camera
          </button>
          <p className="text-center mt-4 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
            Supports High-Res JPG & PNG
          </p>
        </div>
      </main>

      <style>{`
        @keyframes scan-line {
          0% { top: 0% }
          100% { top: 100% }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Scan;