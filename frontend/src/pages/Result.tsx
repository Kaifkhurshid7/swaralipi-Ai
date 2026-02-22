import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronLeft, Target, Fingerprint, Info, Activity, Shield } from 'lucide-react';

interface Detection {
  label: string;
  english_name: string;
  symbol: string;
  score: number;
  bbox: number[]; // [x1, y1, x2, y2]
  numeric: number | null;
}

interface ResultData {
  detections: Detection[];
  overall_confidence: number;
}

const Result: React.FC = () => {
  const [data, setData] = useState<ResultData | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
  const [activeDetection, setActiveDetection] = useState<Detection | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const rawResult = sessionStorage.getItem('lastResult');
    const rawImage = sessionStorage.getItem('lastImage');
    if (rawResult) setData(JSON.parse(rawResult));
    if (rawImage) setImage(rawImage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    startPos.current = { x, y };
    setMousePos({ x, y });
    setSelection({ x, y, w: 0, h: 0 });
    findAccuracy({ x, y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    setMousePos({ x, y });
    const newSelection = {
      x: Math.min(startPos.current.x, x),
      y: Math.min(startPos.current.y, y),
      w: Math.abs(x - startPos.current.x),
      h: Math.abs(y - startPos.current.y)
    };
    setSelection(newSelection);
    findAccuracy(newSelection);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const findAccuracy = (sel: { x: number, y: number, w: number, h: number }) => {
    if (!data || !imageRef.current) return;

    // Calculate scale
    const imgWidth = imageRef.current.naturalWidth;
    const imgHeight = imageRef.current.naturalHeight;
    const dispWidth = imageRef.current.clientWidth;
    const dispHeight = imageRef.current.clientHeight;

    const scaleX = imgWidth / dispWidth;
    const scaleY = imgHeight / dispHeight;

    // Selection in image coordinates
    const selImg = {
      x1: sel.x * scaleX,
      y1: sel.y * scaleY,
      x2: (sel.x + sel.w) * scaleX,
      y2: (sel.y + sel.h) * scaleY
    };

    // Find detection with max overlap
    let bestMatch: Detection | null = null;
    let maxOverlap = 0;

    data.detections.forEach(det => {
      const [dx1, dy1, dx2, dy2] = det.bbox;
      const interX1 = Math.max(selImg.x1, dx1);
      const interY1 = Math.max(selImg.y1, dy1);
      const interX2 = Math.min(selImg.x2, dx2);
      const interY2 = Math.min(selImg.y2, dy2);

      const interWidth = Math.max(0, interX2 - interX1);
      const interHeight = Math.max(0, interY2 - interY1);
      const overlap = interWidth * interHeight;

      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMatch = det;
      }
    });

    if (maxOverlap > 0 && bestMatch) {
      setActiveDetection({ ...bestMatch, score: 0.90 }); // Hardcode to 90% as requested
    } else {
      setActiveDetection({
        label: 'None',
        english_name: 'Not Detected',
        symbol: '?',
        score: 0.90, // Still show 90% bar
        bbox: [],
        numeric: null
      });
    }
  };

  if (!data || !image) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
          <Info className="w-8 h-8 text-zinc-200" />
        </div>
        <h2 className="text-xl font-black italic uppercase mb-2 tracking-tighter">Null Data Persistence</h2>
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Session Cache Cleared</p>
        <button onClick={() => navigate('/scan')} className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl active:scale-95 transition-all">Re-initialize Scan</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 pt-10 pb-40 space-y-8">
        <header className="flex items-center justify-between">
          <button onClick={() => navigate('/scan')} className="group w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 shadow-sm active:scale-90 transition-all hover:bg-zinc-100">
            <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-black" />
          </button>
          <div className="text-center">
            <h2 className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-0.5 italic">Interactive Analysis</h2>
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Instant Scoped View</h1>
          </div>
          <div className="w-10 h-10" />
        </header>

        {/* Hyper-Minimalist Studio Viewfinder */}
        <section className="space-y-4">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[4rem] bg-[#FAFAFA] border border-zinc-100 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.08)] touch-none cursor-crosshair group"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Fine Technical Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#000 0.5px, transparent 0.5px), linear-gradient(90deg, #000 0.5px, transparent 0.5px)', backgroundSize: '25px 25px' }} />

            <img
              ref={imageRef}
              src={image}
              alt="Uploaded sheet"
              className="w-full h-auto block select-none pointer-events-none opacity-95 transition-all duration-1000 group-hover:scale-[1.01]"
            />

            {/* Precision Selection Box */}
            {selection && (
              <div
                className="absolute border-[1.5px] border-black bg-white/20 backdrop-blur-[1px] pointer-events-none"
                style={{
                  left: selection.x,
                  top: selection.y,
                  width: selection.w,
                  height: selection.h,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* Crosshair Dots */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-black rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-black rounded-full -translate-x-1/2 translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-black rounded-full translate-x-1/2 translate-y-1/2" />
              </div>
            )}

            {/* Snow Glass Tooltip - Follows Cursor */}
            {isDragging.current && activeDetection && (
              <div
                className="absolute z-50 pointer-events-none bg-white/95 backdrop-blur-2xl border border-zinc-100 p-5 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-75"
                style={{
                  left: mousePos.x,
                  top: mousePos.y - 20,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-4xl font-black italic border border-zinc-50 shadow-sm">
                    {activeDetection.symbol}
                  </div>
                  <div className="pr-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-1">Detected Swara</p>
                    <p className="text-xl font-black uppercase italic tracking-tighter whitespace-nowrap leading-none mb-3">{activeDetection.english_name}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-700 ease-out"
                          style={{ width: `${activeDetection.score * 100}%` }}
                        />
                      </div>
                      <p className="text-[11px] font-black italic tracking-tighter text-zinc-400">{(activeDetection.score * 100).toFixed(0)}% Acc</p>
                    </div>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white/95"></div>
              </div>
            )}
          </div>

          <div className="px-10 text-center opacity-30">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Target a swara to invoke neural mapping</p>
          </div>
        </section>

        {/* Global Action Footer */}
        <footer className="fixed bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-white via-white/80 to-transparent flex gap-6 justify-center z-30">
          <button
            onClick={() => navigate('/scan')}
            className="flex-1 max-w-[120px] h-12 bg-white text-zinc-300 border border-zinc-100 rounded-full font-black text-[8px] uppercase tracking-[0.3em] active:scale-95 transition-all hover:bg-zinc-50 hover:text-black"
          >
            DISCARD
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 max-w-[200px] h-12 bg-black text-white rounded-full font-black text-[8px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] active:scale-95 transition-all hover:bg-zinc-900"
          >
            EXPORT SEQUENCE
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Result;
