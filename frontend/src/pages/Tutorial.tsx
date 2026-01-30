import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const swaras = [
  { name: 'Sa', numeric: 1, full: 'Shadja', color: '#14b8a6' },
  { name: 'Re', numeric: 2, full: 'Rishabha', color: '#0f766e' },
  { name: 'Ga', numeric: 3, full: 'Gandhara', color: '#134e4a' },
  { name: 'Ma', numeric: 4, full: 'Madhyama', color: '#2dd4bf' },
  { name: 'Pa', numeric: 5, full: 'Panchama', color: '#5eead4' },
  { name: 'Dha', numeric: 6, full: 'Dhaivata', color: '#99f6e4' },
  { name: 'Ni', numeric: 7, full: 'Nishada', color: '#ccfbf1' },
];

const Tutorial: React.FC = () => {
  const navigate = useNavigate();

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

        <section className="px-4 sm:px-6 py-4 sm:py-6">
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            Indian classical music uses seven basic swaras. Each swara in Swaralipi notation maps to a specific numeric value.
          </p>
        </section>

        <div className="px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {swaras.map((s) => (
              <div key={s.name} className="flex items-center p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl group hover:shadow-md transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-black rounded-xl text-white text-2xl sm:text-3xl font-black mr-4 sm:mr-6 flex-shrink-0 group-hover:shadow-md transition-shadow">
                  {s.name}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-black text-sm sm:text-base">{s.full}</h4>
                  <p className="text-secondary text-xs sm:text-sm">Mapped value: <span className="text-black font-mono font-bold">{s.numeric}</span></p>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-gray-200 group-hover:text-gray-300 transition-colors flex-shrink-0 ml-2">
                  0{s.numeric}
                </div>
              </div>
            ))}
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
