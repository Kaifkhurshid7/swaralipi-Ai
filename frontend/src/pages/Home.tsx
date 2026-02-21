import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, BookOpen, Clock, ChevronRight } from 'lucide-react'; // Using lucide for cleaner icons
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-black">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 py-12 space-y-12">

        {/* Impactful Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-black/5 rounded-[2.5rem] blur-2xl group-hover:bg-black/10 transition-colors duration-700" />
            <div className="relative w-24 h-24 bg-black rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-black tracking-tighter italic mb-3">
              SWARA<span className="text-gray-300 not-italic">LIPI</span>
            </h1>
            <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              AI Music Recognition • v2.0
            </p>
            <p className="text-gray-500 text-base font-medium leading-relaxed max-w-[320px] mx-auto">
              Digitizing Indian Classical heritage with precision neural mapping.
            </p>
          </div>
        </section>

        {/* Primary Action Button */}
        <div className="px-2">
          <Link
            to="/scan"
            className="group relative flex items-center justify-between bg-black text-white p-6 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] hover:bg-zinc-900 active:scale-[0.98] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight uppercase italic">Initiate Scan</span>
            </div>

            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Technical Architecture View */}
        <section>
          <div className="relative overflow-hidden bg-black rounded-[2.5rem] p-10 shadow-3xl border border-white/5 group">
            {/* Subtle Technical Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Infrastructure</h2>
                  <p className="text-lg font-black text-white tracking-tight uppercase italic">System Protocol</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>

              <div className="relative space-y-12 pl-4">
                <div className="absolute left-[-2px] top-4 bottom-4 w-px bg-white/10" />

                {[
                  { step: "01", label: "Capture", title: "Visual Scan", desc: "Snap high-res swaralipi notations." },
                  { step: "02", label: "Analyze", title: "Neural Processing", desc: "YOLOv8 maps musical geometry." },
                  { step: "03", label: "Export", title: "Digital Output", desc: "Clean, verified numeric sequence." }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex gap-10 items-start group/step">
                    <div className="absolute left-[-10px] top-1.5 w-4 h-4 bg-black border border-white/10 rounded-full z-10 group-hover/step:border-white transition-colors" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover/step:text-white/60 transition-colors">
                          Phase {item.step}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-white tracking-tight uppercase italic">{item.title}</h3>
                      <p className="text-white/40 text-[11px] leading-relaxed mt-2 font-medium max-w-[200px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fast Access Grid */}
        <div className="grid grid-cols-2 gap-4 pb-12">
          <Link
            to="/tutorial"
            className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-black transition-all hover:shadow-xl group"
          >
            <div className="bg-gray-50 p-3 rounded-2xl mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <BookOpen className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-secondary group-hover:text-black transition-colors mb-1">Learn</span>
            <span className="text-sm font-black text-black">Theory</span>
          </Link>

          <Link
            to="/history"
            className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-black transition-all hover:shadow-xl group"
          >
            <div className="bg-gray-50 p-3 rounded-2xl mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <Clock className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-secondary group-hover:text-black transition-colors mb-1">Archive</span>
            <span className="text-sm font-black text-black">Recent</span>
          </Link>
        </div>

        {/* Professional Footer */}
        <footer className="text-center pt-8 pb-4 border-t border-gray-100">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mb-2">
            AI-POWERED HERITAGE PRESERVATION
          </p>
          <div className="flex items-center justify-center gap-2 opacity-30">
            <div className="w-8 h-[1px] bg-black" />
            <div className="w-1 h-1 rounded-full bg-black" />
            <div className="w-8 h-[1px] bg-black" />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;