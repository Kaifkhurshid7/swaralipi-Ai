import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="container-mobile">
      <Navbar />
      <div className="content-area bg-white w-full">
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-6 text-center">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-4xl sm:text-6xl font-black mb-2 sm:mb-3 tracking-tight text-black">
                SWARA<span className="text-black">LIPI</span>
              </h1>
              <div className="h-1 w-10 sm:w-12 bg-black mx-auto rounded-full mb-4 sm:mb-6"></div>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-black">
              Indian Classical Music Recognition System
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Intelligent AI-powered detection and numeric mapping for Swara notations in classical Indian music. Accurately identify and classify musical symbols from historical manuscripts and modern scores.
            </p>
          </header>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-4 sm:mx-6"></div>

          {/* How It Works Section */}
          <section className="px-4 sm:px-6 py-6 sm:py-8">
            <h3 className="text-xs sm:text-sm font-bold text-black mb-5 sm:mb-6 uppercase tracking-wider">How It Works</h3>
            
            <div className="space-y-4 sm:space-y-5">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  1
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-black mb-1 text-sm sm:text-base">Upload or Capture</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Select an image containing Swara notations</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  2
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-black mb-1 text-sm sm:text-base">AI Analysis</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Advanced detection identifies all Swaras in the image</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  3
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-black mb-1 text-sm sm:text-base">View Results</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">See bounding boxes and numeric classifications instantly</p>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-4 sm:mx-6"></div>

          {/* CTA Section */}
          <main className="flex flex-col space-y-2 sm:space-y-3 px-4 sm:px-6 py-6 sm:py-8">
            <Link 
              to="/scan" 
              className="btn-primary"
            >
              Start Scanning
            </Link>
            
            <Link 
              to="/tutorial" 
              className="btn-secondary"
            >
              Learn About Swaras
            </Link>

            <Link 
              to="/history" 
              className="btn-tertiary"
            >
              View Scan History
            </Link>
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-gray-200 px-4 sm:px-6 py-4 sm:py-6 text-center">
            <p className="text-gray-600 text-xs mb-2">
              © 2026 Swaralipi AI. Preserving Indian Classical Music Heritage.
            </p>
            <p className="text-gray-500 text-xs">
              Advanced AI-Powered Musical Notation Recognition System
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
