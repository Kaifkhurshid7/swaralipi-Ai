import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold mb-2">Analyzing Swaralipi...</h2>
        <p className="text-secondary">Detecting swaras and mapping numeric values.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
      <header className="mb-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-secondary hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">New Scan</h2>
        <div className="w-8"></div>
      </header>

      <div className="relative flex-1 flex flex-col items-center justify-center mb-12">
        <div className="w-full aspect-[4/5] border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileRef.current?.click()}>

          <div className="absolute inset-0 border-4 border-primary/20 m-6 rounded-2xl pointer-events-none"></div>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <p className="text-center px-8 text-secondary">
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

      <div className="space-y-4">
        <button onClick={() => fileRef.current?.click()} className="btn-primary">
          Open Camera
        </button>
        <p className="text-center text-secondary text-sm">
          Supports JPG, PNG images from gallery or direct capture
        </p>
      </div>
    </div>
  );
};

export default Scan;
