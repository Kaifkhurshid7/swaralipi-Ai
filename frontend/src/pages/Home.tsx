import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 tracking-tighter">
          SWARA<span className="text-primary">LIPI</span>
        </h1>
        <p className="text-secondary text-lg leading-relaxed">
          AI-Based recognition and numeric mapping for Indian classical music notation.
        </p>
      </header>
<main className="space-y-4">
        <Link to="/scan" className="btn-primary">
          Scan Swaralipi
        </Link>
        <Link to="/tutorial" className="btn-secondary">
          Learn Swaralipi
        </Link>
        <Link to="/history" className="text-secondary text-center block pt-4 hover:text-white transition-colors">
          View Scan History
        </Link>
      </main>

      <footer className="mt-auto pt-12 text-center text-secondary/40 text-sm">
        <p>© 2026 Swaralipi AI System</p>
      </footer>
    </div>
  );
};

export default Home;
