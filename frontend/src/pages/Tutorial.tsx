import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const swaras = [
  { 
    name: 'Sa', 
    numeric: 1, 
    full: 'Shadja', 
    color: '#14b8a6',
    description: 'The foundational swara, equivalent to Do in Western music',
    meaning: 'Derived from "Sha" (six), as it is the origin of six other notes',
    frequency: 'Base frequency - typically 261.63 Hz (C)',
    variations: ['Sa', 'S']
  },
  { 
    name: 'Re', 
    numeric: 2, 
    full: 'Rishabha', 
    color: '#0f766e',
    description: 'The second swara with two variants - Komal and Shuddha',
    meaning: 'Means "brightness" or "sharpness" in Sanskrit',
    frequency: 'Komal Re: ~277.18 Hz, Shuddha Re: ~293.66 Hz',
    variations: ['Re', 'R', 'Ri']
  },
  { 
    name: 'Ga', 
    numeric: 3, 
    full: 'Gandhara', 
    color: '#134e4a',
    description: 'The third swara, also has Komal and Shuddha variants',
    meaning: 'Associated with fragrance and sweetness',
    frequency: 'Komal Ga: ~311.13 Hz, Shuddha Ga: ~329.63 Hz',
    variations: ['Ga', 'G']
  },
  { 
    name: 'Ma', 
    numeric: 4, 
    full: 'Madhyama', 
    color: '#2dd4bf',
    description: 'The middle swara with important Teevra (sharp) variant',
    meaning: 'Means "middle" - the central note in the octave',
    frequency: 'Shuddha Ma: ~349.23 Hz, Teevra Ma: ~370.00 Hz',
    variations: ['Ma', 'M']
  },
  { 
    name: 'Pa', 
    numeric: 5, 
    full: 'Panchama', 
    color: '#5eead4',
    description: 'The perfect fifth - considered the most important after Sa',
    meaning: 'Means "fifth" in Sanskrit',
    frequency: '~392.00 Hz (G)',
    variations: ['Pa', 'P']
  },
  { 
    name: 'Dha', 
    numeric: 6, 
    full: 'Dhaivata', 
    color: '#99f6e4',
    description: 'The sixth swara with Komal and Shuddha variants',
    meaning: 'Associated with divine quality',
    frequency: 'Komal Dha: ~415.30 Hz, Shuddha Dha: ~440.00 Hz',
    variations: ['Dha', 'D']
  },
  { 
    name: 'Ni', 
    numeric: 7, 
    full: 'Nishada', 
    color: '#ccfbf1',
    description: 'The seventh swara with Komal and Shuddha variants',
    meaning: 'Associated with the lowest or subordinate note',
    frequency: 'Komal Ni: ~466.16 Hz, Shuddha Ni: ~493.88 Hz',
    variations: ['Ni', 'N']
  },
];

const Tutorial: React.FC = () => {
  const navigate = useNavigate();
  const [expandedSwara, setExpandedSwara] = useState<string | null>(null);

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
          <h2 className="text-lg sm:text-xl font-bold text-black">Learn Swaras</h2>
          <div className="w-6 sm:w-7"></div>
        </header>

        <section className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100">
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            Indian classical music uses seven fundamental swaras. Each swara has unique qualities, frequencies, and variations (Komal/Flat, Shuddha/Natural, Teevra/Sharp).
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm text-blue-900">
              <strong>Total Variations:</strong> 7 basic swaras × multiple variations = up to 36+ notations in advanced raga systems
            </p>
          </div>
        </section>

        <div className="px-4 sm:px-6 pb-24 pt-4">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {swaras.map((s) => (
              <div key={s.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
                {/* Header */}
                <button
                  onClick={() => setExpandedSwara(expandedSwara === s.name ? null : s.name)}
                  className="w-full flex items-center p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-black rounded-xl text-white text-2xl sm:text-3xl font-black mr-4 sm:mr-6 flex-shrink-0">
                    {s.name}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-bold text-black text-sm sm:text-base">{s.full}</h4>
                    <p className="text-secondary text-xs sm:text-sm">Numeric: <span className="text-black font-mono font-bold">{s.numeric}</span></p>
                  </div>
                  <div className="text-gray-400 flex-shrink-0 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedSwara === s.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedSwara === s.name && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100 bg-gray-50 space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wide">Description</p>
                      <p className="text-sm text-black leading-relaxed mt-1">{s.description}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wide">Meaning</p>
                      <p className="text-sm text-black leading-relaxed mt-1">{s.meaning}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wide">Frequency</p>
                      <p className="text-sm text-black font-mono mt-1">{s.frequency}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wide">Notations & Variations</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {s.variations.map((v) => (
                          <span key={v} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-black">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info for variants */}
                    {(s.numeric === 2 || s.numeric === 3 || s.numeric === 4 || s.numeric === 6 || s.numeric === 7) && (
                      <div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-wide">Variants Info</p>
                        <div className="text-xs text-black mt-2 space-y-1 p-2 bg-white border border-gray-200 rounded">
                          {s.numeric === 2 && <p>• <strong>Komal Re (♭):</strong> Flat variant, more somber tone</p>}
                          {s.numeric === 2 && <p>• <strong>Shuddha Re:</strong> Natural variant, bright tone</p>}
                          {s.numeric === 3 && <p>• <strong>Komal Ga (♭):</strong> Flat variant, soft quality</p>}
                          {s.numeric === 3 && <p>• <strong>Shuddha Ga:</strong> Natural variant</p>}
                          {s.numeric === 4 && <p>• <strong>Shuddha Ma:</strong> Natural perfect fourth</p>}
                          {s.numeric === 4 && <p>• <strong>Teevra Ma (♯):</strong> Sharp variant, raised fourth</p>}
                          {s.numeric === 6 && <p>• <strong>Komal Dha (♭):</strong> Flat variant</p>}
                          {s.numeric === 6 && <p>• <strong>Shuddha Dha:</strong> Natural variant</p>}
                          {s.numeric === 7 && <p>• <strong>Komal Ni (♭):</strong> Flat variant</p>}
                          {s.numeric === 7 && <p>• <strong>Shuddha Ni:</strong> Natural variant</p>}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-4 sm:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
            <h3 className="font-bold text-black text-sm sm:text-base mb-3">Complete 36 Notations Overview</h3>
            <div className="text-xs sm:text-sm text-gray-700 space-y-2">
              <p><strong>Base Swaras:</strong> Sa, Re, Ga, Ma, Pa, Dha, Ni (7 notes)</p>
              <p><strong>Variations:</strong> Each swara can have Komal (♭), Shuddha (Natural), and some have Teevra (♯) variants</p>
              <p><strong>Total Combinations:</strong> Sa (1) + Re (2) + Ga (2) + Ma (2) + Pa (1) + Dha (2) + Ni (2) = 12 basic + advanced raga-specific combinations up to 36</p>
              <p className="mt-2 text-xs text-teal-900 bg-white p-2 rounded">
                💡 Ragas use specific combinations of these swaras to create unique melodic frameworks
              </p>
            </div>
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-white border-t border-gray-200 safe-area-bottom">
          <button onClick={() => navigate('/scan')} className="btn-primary py-3 sm:py-4">Start Scanning</button>
        </footer>
      </div>
    </div>
  );
};

export default Tutorial;
