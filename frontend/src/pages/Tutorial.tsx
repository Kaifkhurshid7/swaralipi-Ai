import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const swaras = [
  {
    name: 'Sa',
    numeric: 1,
    full: 'Shadja',
    description: 'The root. The foundational swara equivalent to Do in Western Solfège.',
    meaning: 'Origin of the six other notes.',
    frequency: '261.63 Hz (C)',
    variants: ['Shuddha (Natural)'],
    symbol: 'S'
  },
  {
    name: 'Re',
    numeric: 2,
    full: 'Rishabha',
    description: 'The second swara. Influences the emotional gravity of a Raga.',
    meaning: 'Brightness or sharpness.',
    frequency: 'Komal: 277.18 Hz | Shuddha: 293.66 Hz',
    variants: ['Komal (Flat)', 'Shuddha (Natural)'],
    symbol: 'R'
  },
  {
    name: 'Ga',
    numeric: 3,
    full: 'Gandhara',
    description: 'The third swara. Often associated with sweetness and grace.',
    meaning: 'The fragrance of sound.',
    frequency: 'Komal: 311.13 Hz | Shuddha: 329.63 Hz',
    variants: ['Komal (Flat)', 'Shuddha (Natural)'],
    symbol: 'G'
  },
  {
    name: 'Ma',
    numeric: 4,
    full: 'Madhyama',
    description: 'The central note. Acts as a bridge between the lower and upper notes.',
    meaning: 'The Middle.',
    frequency: 'Shuddha: 349.23 Hz | Teevra: 370.00 Hz',
    variants: ['Shuddha (Natural)', 'Teevra (Sharp)'],
    symbol: 'M'
  },
  {
    name: 'Pa',
    numeric: 5,
    full: 'Panchama',
    description: 'The perfect fifth. Immutable and constant, providing stability.',
    meaning: 'The Fifth.',
    frequency: '392.00 Hz (G)',
    variants: ['Shuddha (Natural)'],
    symbol: 'P'
  },
  {
    name: 'Dha',
    numeric: 6,
    full: 'Dhaivata',
    description: 'The sixth swara. Adds divine and spiritual depth.',
    meaning: 'Divine Quality.',
    frequency: 'Komal: 415.30 Hz | Shuddha: 440.00 Hz',
    variants: ['Komal (Flat)', 'Shuddha (Natural)'],
    symbol: 'D'
  },
  {
    name: 'Ni',
    numeric: 7,
    full: 'Nishada',
    description: 'The leading tone. Often used to create tension before returning to Sa.',
    meaning: 'Subordinate or Final.',
    frequency: 'Komal: 466.16 Hz | Shuddha: 493.88 Hz',
    variants: ['Komal (Flat)', 'Shuddha (Natural)'],
    symbol: 'N'
  },
];

const Tutorial: React.FC = () => {
  const navigate = useNavigate();
  const [expandedSwara, setExpandedSwara] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-8 pb-40">
        {/* Page Header */}
        <header className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-black tracking-tighter italic uppercase">Learn</h2>
          <div className="w-10"></div>
        </header>

        {/* Intro Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter italic leading-tight mb-4">
            The Geometry <br />of Sound
          </h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed">
            Swaralipi AI maps traditional Indian classical notations into a digital numeric system.
            Understand the 7 fundamental Swaras that form the core of every Raga.
          </p>
        </section>

        {/* Interactive Mapping Grid */}
        <div className="space-y-4">
          {swaras.map((s) => (
            <div
              key={s.name}
              className={`group border-b border-gray-100 transition-all duration-500 ${expandedSwara === s.name ? 'pb-8' : 'pb-4'}`}
            >
              <button
                onClick={() => setExpandedSwara(expandedSwara === s.name ? null : s.name)}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <div className="flex items-center gap-6">
                  <span className="text-5xl font-black italic tracking-tighter text-gray-100 group-hover:text-black transition-colors">
                    0{s.numeric}
                  </span>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">{s.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{s.full}</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-100 transition-transform duration-500 ${expandedSwara === s.name ? 'rotate-180 bg-black text-white' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Vast Detail Expansion */}
              {expandedSwara === s.name && (
                <div className="mt-6 grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-top-4">
                  <div className="p-6 bg-gray-50 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Detailed Theory</p>
                    <p className="text-sm font-medium leading-relaxed text-gray-800">{s.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-2xl">
                      <p className="text-[9px] font-black uppercase tracking-tighter text-gray-400 mb-1">Frequency</p>
                      <p className="text-xs font-black italic">{s.frequency}</p>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-2xl">
                      <p className="text-[9px] font-black uppercase tracking-tighter text-gray-400 mb-1">Etymology</p>
                      <p className="text-xs font-black italic">{s.meaning}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">AI Recognized Variations</p>
                    <div className="flex flex-wrap gap-2">
                      {s.variants.map((v) => (
                        <span key={v} className="px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Vast Mapping Context */}
        <section className="mt-16 p-8 bg-black rounded-[2.5rem] text-white">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-50">Mapping Infrastructure</h4>
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <span className="text-2xl font-black italic italic">12</span>
              <p className="text-[11px] font-bold text-right max-w-[150px] leading-tight">Semi-tones in a standard octave recognized by our YOLOv8 model.</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <span className="text-2xl font-black italic italic">36</span>
              <p className="text-[11px] font-bold text-right max-w-[150px] leading-tight">Advanced micro-tonal variations mapped for specific Gharana styles.</p>
            </div>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed pt-2 italic">
              * The numeric mapping (1-7) follows the Shuddha scale as the baseline for digital recognition.
            </p>
          </div>
        </section>

        {/* Floating Action Button */}
        <div className="fixed bottom-10 left-0 right-0 px-8 flex justify-center pointer-events-none">
          <button
            onClick={() => navigate('/scan')}
            className="pointer-events-auto bg-black text-white w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Launch Recognition
          </button>
        </div>
      </main>
    </div>
  );
};

export default Tutorial;