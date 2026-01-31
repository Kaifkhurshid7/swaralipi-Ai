import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, BookOpen, Clock, ChevronRight } from 'lucide-react'; // Using lucide for cleaner icons
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-10 pb-20">

        {/* Branding Section */}
        <section className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
            SWARA<span className="text-gray-400 not-italic">LIPI</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            AI Music Recognition
          </p>
          <p className="text-gray-600 text-[15px] leading-relaxed max-w-[280px] mx-auto">
            Digitizing Indian Classical heritage through deep learning and numeric mapping.
          </p>
        </section>

        {/* Primary Action */}
        <div className="mb-10">
          <Link
            to="/scan"
            className="group relative flex items-center justify-center gap-3 bg-black text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-900 active:scale-[0.98] transition-all"
          >
            <Camera className="w-6 h-6" />
            Start Scanning
            <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Workflow Section */}
        <section className="mb-10">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">The Process</h2>
            <div className="space-y-6">
              {[
                { step: "01", title: "Capture", desc: "Scan Swara notations from old texts." },
                { step: "02", title: "Analyze", desc: "AI identifies symbols and logic." },
                { step: "03", title: "Map", desc: "Instant numeric sequence output." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-[10px] font-black bg-white border border-gray-200 px-2 py-1 rounded-md shadow-sm">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-black">{item.title}</h3>
                    <p className="text-gray-500 text-xs leading-snug mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Menu */}
        <div className="grid grid-cols-2 gap-3 mb-12">
          <Link
            to="/tutorial"
            className="flex flex-col items-center justify-center p-5 bg-white border border-gray-200 rounded-2xl hover:border-black transition-colors group"
          >
            <BookOpen className="w-6 h-6 mb-2 text-gray-400 group-hover:text-black transition-colors" />
            <span className="text-sm font-bold">Tutorial</span>
          </Link>
          <Link
            to="/history"
            className="flex flex-col items-center justify-center p-5 bg-white border border-gray-200 rounded-2xl hover:border-black transition-colors group"
          >
            <Clock className="w-6 h-6 mb-2 text-gray-400 group-hover:text-black transition-colors" />
            <span className="text-sm font-bold">History</span>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[10px] font-medium text-gray-300 tracking-widest uppercase mb-1">
            Build 2026.01.v1
          </p>
          <p className="text-[11px] text-gray-400">
            Swaralipi AI • Preserving Classical Heritage
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;