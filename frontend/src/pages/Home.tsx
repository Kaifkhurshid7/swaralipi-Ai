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
            Scan Notes
            <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Professional System Protocol - Technical Architecture View */}
        <section className="mb-14">
          <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]">

            {/* Decorative Technical Grid Background */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <header className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-1">
                  How it works
                </h2>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                  Steps
                </p>
              </div>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
              </div>
            </header>

            <div className="relative space-y-12">
              {/* Structural Connector Line */}
              <div className="absolute left-[17px] top-2 bottom-2 w-[1.5px] bg-gray-50" />

              {[
                {
                  step: "01",
                  label: "Capture",
                  title: "Scan Notation",
                  desc: "Simply snap a photo of your music notes or upload an image."
                },
                {
                  step: "02",
                  label: "Analyze",
                  title: "AI Recognition",
                  desc: "Our AI identifies the swaras and understands their musical order."
                },
                {
                  step: "03",
                  label: "Result",
                  title: "Instant Mapping",
                  desc: "Get an accurate numeric sequence ready for playback or study."
                }
              ].map((item, idx) => (
                <div key={idx} className="relative flex gap-8 items-start group">

                  {/* Technical Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-9 h-9 bg-white border-2 border-gray-50 rounded-xl flex items-center justify-center shadow-sm group-hover:border-black group-hover:shadow-md transition-all duration-500">
                      <span className="text-[10px] font-black text-black">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                        {item.label}
                      </span>
                      <div className="h-px w-4 bg-gray-100 group-hover:w-8 transition-all" />
                    </div>

                    <h3 className="text-[15px] font-bold text-black tracking-tight uppercase italic not-italic">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-[11px] leading-relaxed mt-2 font-medium max-w-[220px]">
                      {item.desc}
                    </p>
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