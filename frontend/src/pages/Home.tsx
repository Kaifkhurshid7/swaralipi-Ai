import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Instant Detection',
      description: 'AI-powered detection identifies all Swaras in real-time',
      icon: '⚡'
    },
    {
      title: 'Numeric Mapping',
      description: 'Automatic mapping to numeric notation system',
      icon: '🔢'
    },
    {
      title: 'Scan History',
      description: 'Keep track of all your previous scans',
      icon: '📚'
    },
    {
      title: 'Learn Swaras',
      description: 'Understand Indian classical music notations',
      icon: '🎵'
    }
  ];

  return (
    <div className="container-mobile bg-gradient-to-b from-background to-surface">
      <Navbar />
      <div className="content-area bg-background">
        {/* Hero Section */}
        <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-3xl sm:rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-black mb-2">SWARA<span className="text-black">LIPI</span></h1>
            <p className="text-sm sm:text-base text-secondary font-medium">Indian Classical Music Recognition</p>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3">
          <Link 
            to="/scan" 
            className="btn-primary flex items-center justify-center gap-2 py-4 text-lg font-bold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            Start Scanning
          </Link>
        </div>

        {/* Features Grid */}
        <div className="px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 gap-3">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-3 hover:shadow-md transition-shadow">
                <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                <div className="min-w-0">
                  <h3 className="font-bold text-black text-sm">{feature.title}</h3>
                  <p className="text-secondary text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="px-4 sm:px-6 py-4 space-y-2">
          <Link 
            to="/tutorial" 
            className="btn-secondary py-3 text-base font-bold"
          >
            Learn About Swaras
          </Link>

          <Link 
            to="/history" 
            className="block w-full py-3 px-4 text-black font-semibold text-center text-base hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-300 border border-gray-300"
          >
            View Scan History
          </Link>
        </div>

        {/* Info Section */}
        <div className="px-4 sm:px-6 py-6 text-center text-secondary text-xs leading-relaxed">
          <p className="mb-3">
            Intelligent AI-powered detection and numeric mapping for Swara notations in classical Indian music.
          </p>
          <p className="text-[11px] text-gray-500">
            © 2026 Swaralipi AI • Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
