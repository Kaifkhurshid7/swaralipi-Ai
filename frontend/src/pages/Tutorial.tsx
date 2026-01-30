import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-secondary hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white">Learn Swaras</h2>
        <div className="w-8"></div>
      </header>

      <section className="mb-8">
        <p className="text-secondary leading-relaxed">
          Indian classical music uses seven basic swaras. Each swara in Swaralipi notation maps to a specific numeric value.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 mb-20">
        {swaras.map((s) => (
          <div key={s.name} className="flex items-center p-4 bg-surface border border-white/5 rounded-2xl group hover:border-primary/30 transition-all shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl text-primary text-2xl font-black mr-6 group-hover:bg-primary group-hover:text-background transition-colors">
              {s.name}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">{s.full}</h4>
              <p className="text-secondary text-sm">Mapped value: <span className="text-accent font-mono font-bold text-base">{s.numeric}</span></p>
            </div>
            <div className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
              0{s.numeric}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-auto pb-4">
        <button onClick={() => navigate('/scan')} className="btn-primary">Start Scanning</button>
      </footer>
    </div>
  );
};

export default Tutorial;
