import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { uploadImage } from '../services/api';
import { Camera, Upload, ChevronLeft, Maximize, ShieldCheck, Zap } from 'lucide-react';

const Scan: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect device type for contextual UI
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setLoading(true);
    try {
      const res = await uploadImage(f);
      sessionStorage.setItem('lastResult', JSON.stringify(res));
      navigate('/result');
    } catch (err) {
      alert('Inference Failed: Please verify backend connectivity.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[85vh] px-8 text-center">
          <div className="relative w-32 h-40 mb-10">
            <div className="absolute inset-0 border-[0.5px] border-gray-200 rounded-3xl bg-gray-50/50"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent animate-scan-line shadow-[0_0_15px_rgba(0,0,0,0.2)]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-black/5 border-t-black rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-tighter italic uppercase mb-3">Processing</h2>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-black animate-pulse" />
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Neural Inference • Swara Mapping
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-6 pb-40">
        <header className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="group w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 hover:border-black transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
          </button>
          <div className="text-center">
            <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-0.5">Terminal</h2>
            <h1 className="text-lg font-black tracking-tight uppercase italic leading-none">
              {isMobile ? 'Optical Scan' : 'File Ingestion'}
            </h1>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
            <Maximize className="w-4 h-4 text-gray-300" />
          </div>
        </header>

        {/* Viewfinder / Drop Zone */}
        <div
          onClick={() => fileRef.current?.click()}
          className="relative group cursor-pointer active:scale-[0.99] transition-all duration-500"
        >
          {/* Precise Corner Brackets */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-black rounded-tl-3xl z-10 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-black rounded-tr-3xl z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-black rounded-bl-3xl z-10 transition-transform group-hover:-translate-x-1 group-hover:translate-y-1"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-black rounded-br-3xl z-10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>

          <div className="w-full aspect-[4/5] bg-[#fafafa] rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden border border-gray-100 relative shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] mb-8 group-hover:scale-105 transition-all duration-700 group-hover:rotate-3">
                {isMobile ? (
                  <Camera className="w-10 h-10 text-black" strokeWidth={1.2} />
                ) : (
                  <Upload className="w-10 h-10 text-black" strokeWidth={1.2} />
                )}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors duration-500 text-center px-8">
                {isMobile
                  ? 'Awaiting Camera Input'
                  : 'Click to Browse or Drag File'}
              </p>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture={isMobile ? "environment" : undefined}
            className="hidden"
            onChange={onPick}
          />
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between p-5 rounded-3xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative flex">
                <div className="w-2 h-2 bg-black rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-black rounded-full relative"></div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-black mb-0.5">YOLOv8 Engine</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none italic">Status: System Ready</p>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-gray-300" />
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-xl border-t border-gray-50 flex flex-col items-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full max-w-sm bg-black text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] active:scale-[0.96] transition-all hover:bg-zinc-900"
          >
            {isMobile ? 'Initialize Scanner' : 'Upload Notation'}
          </button>
          <p className="mt-6 text-[8px] font-black uppercase tracking-[0.4em] text-gray-300">
            High-Res JPG • PNG • HEIC
          </p>
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