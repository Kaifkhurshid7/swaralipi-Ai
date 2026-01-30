import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto bg-white">
        {/* Header Section */}
        <header className="mb-10 text-center pt-8">
          <div className="mb-6">
            <h1 className="text-6xl font-black mb-3 tracking-tight text-black">
              SWARA<span className="text-black">LIPI</span>
            </h1>
            <div className="h-1 w-12 bg-black mx-auto rounded-full mb-6"></div>
          </div>
          
          <h2 className="text-xl font-bold mb-3 text-black">
            Indian Classical Music Recognition System
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            Intelligent AI-powered detection and numeric mapping for Swara notations in classical Indian music. Accurately identify and classify musical symbols from historical manuscripts and modern scores.
          </p>
        </header>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-10"></div>

        {/* How It Works Section */}
        <section className="mb-12">
          <h3 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">How It Works</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-black font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Upload or Capture</h4>
                <p className="text-gray-600 text-sm">Select an image containing Swara notations</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-black font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">AI Analysis</h4>
                <p className="text-gray-600 text-sm">Advanced detection identifies all Swaras in the image</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-black font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">View Results</h4>
                <p className="text-gray-600 text-sm">See bounding boxes and numeric classifications instantly</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-10"></div>

        {/* CTA Section */}
        <main className="flex flex-col space-y-3 mb-12">
          <Link 
            to="/scan" 
            className="btn-primary font-bold py-3 text-center rounded-2xl transition-all duration-300 hover:shadow-lg"
          >
            Start Scanning
          </Link>
          
          <Link 
            to="/tutorial" 
            className="btn-secondary font-bold py-3 text-center rounded-2xl transition-all duration-300 hover:shadow-lg"
          >
            Learn About Swaras
          </Link>

          <Link 
            to="/history" 
            className="text-black font-semibold text-center py-3 hover:bg-gray-100 rounded-2xl transition-all duration-300"
          >
            View Scan History
          </Link>
        </main>

        {/* Footer */}
        <footer className="mt-auto text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600 text-xs mb-3">
            © 2026 Swaralipi AI. Preserving Indian Classical Music Heritage.
          </p>
          <p className="text-gray-500 text-xs">
            Advanced AI-Powered Musical Notation Recognition System
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
