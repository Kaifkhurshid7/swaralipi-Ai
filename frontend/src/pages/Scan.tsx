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
      <div className="container-mobile bg-gradient-to-b from-background to-surface">
        <Navbar />
        <div className="content-area flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
            <h2 className="text-2xl font-bold text-black mb-2">Analyzing Swaralipi...</h2>
            <p className="text-secondary text-sm">Detecting swaras and mapping numeric values.</p>
          </div>
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
          <h2 className="text-lg sm:text-xl font-bold text-black">New Scan</h2>
          <div className="w-6 sm:w-7"></div>
        </header>

        <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
          <div 
            className="w-full aspect-[4/5] border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer hover:border-black transition-colors bg-white"
            onClick={() => fileRef.current?.click()}
          >
            <div className="absolute inset-0 border-4 border-black/10 m-6 rounded-2xl pointer-events-none"></div>

            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 text-black mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <p className="text-center px-6 sm:px-8 text-secondary text-sm sm:text-base font-medium">
              Align Swaralipi notations within the frame and capture
            </p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={onPick}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-6 py-4 sm:py-6 bg-white border-t border-gray-200 space-y-3 safe-area-bottom">
          <button onClick={() => fileRef.current?.click()} className="btn-primary py-3 sm:py-4 font-bold">
            Open Camera
          </button>
          <p className="text-center text-secondary text-xs sm:text-sm">
            Supports JPG, PNG images from gallery or direct capture
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scan;
