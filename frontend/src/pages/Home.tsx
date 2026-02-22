import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, BookOpen, Clock, ChevronRight, Activity, Globe, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 py-12 space-y-16">

        {/* Impactful Hero Section */}
        <section className="text-center space-y-8 pt-8">
          <div className="relative inline-block group">
            {/* Ambient Glow */}
            <div className="absolute inset-x-0 -bottom-4 h-8 bg-black/5 blur-2xl rounded-full" />

            <div className="relative w-28 h-28 bg-white rounded-[2.5rem] border border-gray-100 flex items-center justify-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)]">
              <div className="w-16 h-16 bg-black rounded-[1.8rem] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter italic leading-[0.9]">
              SWARA<span className="text-zinc-200 not-italic font-light">LIPI</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-4 bg-zinc-200" />
              <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.5em]">
                Advanced Notation Intel • v2.1
              </p>
              <span className="h-[1px] w-4 bg-zinc-200" />
            </div>
            <p className="text-zinc-500 text-base font-medium leading-relaxed max-w-[340px] mx-auto italic">
              Experience the future of Indian Classical digitization with precision neural mapping.
            </p>
          </div>
        </section>

        {/* Primary Action Button */}
        <div className="px-2">
          <Link
            to="/scan"
            className="group relative flex items-center justify-between bg-white border border-zinc-100 text-black p-7 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_50px_100px_-25px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter uppercase italic block leading-none">Initialize</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block">Neural Scanner</span>
              </div>
            </div>

            <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Technical Architecture View - Light Theme */}
        <section className="px-2">
          <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-zinc-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />

            <div className="relative z-10 space-y-12">
              <div className="flex justify-between items-end border-b border-zinc-50 pb-8">
                <div>
                  <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-2">Protocol</h2>
                  <p className="text-2xl font-black text-black tracking-tighter uppercase italic">System Architecture</p>
                </div>
                <div className="px-4 py-2 bg-zinc-50 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Live Engine</span>
                </div>
              </div>

              <div className="grid gap-12">
                {[
                  { icon: Activity, step: "01", title: "Visual Scan", desc: "Process high-resolution swaralipi manuscripts." },
                  { icon: Globe, step: "02", title: "Neural Map", desc: "YOLOv8 Engine identifies musical geometry." },
                  { icon: Shield, step: "03", title: "Verify", desc: "Interactive accuracy verification protocols." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover/item:bg-black group-hover/item:text-white transition-all">
                      <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 border-b border-zinc-50 pb-6 group-last/item:border-0 group-last/item:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">Phase {item.step}</span>
                      </div>
                      <h3 className="text-lg font-black text-black tracking-tight uppercase italic">{item.title}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mt-2 font-medium max-w-[240px]">
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
        <div className="grid grid-cols-2 gap-5 px-2 pb-12">
          <Link
            to="/tutorial"
            className="group flex flex-col items-center text-center p-8 bg-white border border-zinc-100 rounded-[2.5rem] hover:border-black transition-all hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="bg-zinc-50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <BookOpen className="w-6 h-6" strokeWidth={1.2} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 group-hover:text-black transition-colors mb-2">Reference</span>
            <span className="text-sm font-black text-black italic uppercase tracking-tighter">Theory Lab</span>
          </Link>

          <Link
            to="/history"
            className="group flex flex-col items-center text-center p-8 bg-white border border-zinc-100 rounded-[2.5rem] hover:border-black transition-all hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="bg-zinc-50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <Clock className="w-6 h-6" strokeWidth={1.2} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 group-hover:text-black transition-colors mb-2">Archive</span>
            <span className="text-sm font-black text-black italic uppercase tracking-tighter">Recent Scans</span>
          </Link>
        </div>

        {/* Professional Footer */}
        <footer className="text-center pt-8 pb-12 opacity-40">
          <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.6em] mb-4">
            AI-POWERED HERITAGE PROTOCOL
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-zinc-200" />
            <div className="w-1 h-1 rounded-full bg-zinc-400" />
            <div className="w-12 h-[1px] bg-zinc-200" />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
