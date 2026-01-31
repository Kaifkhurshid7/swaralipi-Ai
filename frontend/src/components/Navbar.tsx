import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Handle PWA install prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallPromptVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallPromptVisible(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/scan', label: 'Scan', icon: '📷' },
    { path: '/tutorial', label: 'Learn', icon: '📚' },
    { path: '/history', label: 'History', icon: '📋' },
  ];

  return (
    <>
      {/* App-like Navbar */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-xl sticky top-0 z-40 safe-area-top shadow-sm h-14 sm:h-16 flex items-center">
        <div className="max-w-full w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between h-10 sm:h-12">
            {/* Logo - App Style */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group min-w-0 p-1 -m-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-2xl sm:rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div className="hidden sm:block min-w-0">
                <span className="font-black text-black text-xs sm:text-base lg:text-lg">
                  SWARA<span className="text-black font-bold">LIPI</span>
                </span>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Music Recognition</p>
              </div>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Install App Button (visible only on PWA capable devices) */}
              {isInstallPromptVisible && (
                <button
                  onClick={handleInstall}
                  className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-2 bg-black text-white border border-black rounded-lg hover:bg-gray-800 active:bg-gray-900 transition-all duration-300 text-xs font-semibold min-h-[40px]"
                  title="Install Swaralipi as an app"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Install App
                </button>
              )}

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-black transition-all duration-300 active:text-gray-800 p-2 -m-2 min-w-[44px] min-h-[44px]"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <span
                    className={`absolute h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 origin-center ${
                      isMenuOpen ? 'rotate-45 top-2.5 sm:top-3' : 'top-1'
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    } top-2.5 sm:top-3`}
                  />
                  <span
                    className={`absolute h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 origin-center ${
                      isMenuOpen ? '-rotate-45 top-2.5 sm:top-3' : 'top-4 sm:top-5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-30 overflow-y-auto -top-14 sm:-top-16 safe-area-bottom">
          <div className="pt-16 sm:pt-20 flex flex-col min-h-screen px-3 sm:px-6 lg:px-8">
            {/* Menu Content */}
            <div className="flex-1 flex flex-col justify-center py-4 sm:py-6">
              <div className="space-y-2 sm:space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block text-center py-3 sm:py-4 px-3 sm:px-6 rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] ${
                      isActive(link.path)
                        ? 'bg-black border border-black text-white shadow-lg'
                        : 'text-black hover:bg-gray-100 active:bg-gray-200 border border-gray-200 hover:border-black'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{link.icon}</span>
                    <span className="text-sm sm:text-base">{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-300 my-4 sm:my-6\"></div>

              {/* Additional Menu Items */}
              <div className="space-y-2 sm:space-y-3">
                {isInstallPromptVisible && (
                  <button
                    onClick={handleInstall}
                    className="w-full text-center py-3 sm:py-4 px-3 sm:px-6 rounded-2xl text-white font-semibold bg-black border border-black hover:bg-gray-800 active:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg min-h-[48px]"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Install App
                  </button>
                )}
                <a
                  href="#"
                  className="block text-center py-2 sm:py-3 px-3 sm:px-6 rounded-xl text-gray-600 text-xs sm:text-sm font-medium hover:text-black active:text-black transition-colors min-h-[40px] flex items-center justify-center"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block text-center py-2 sm:py-3 px-3 sm:px-6 rounded-xl text-gray-600 text-xs sm:text-sm font-medium hover:text-black active:text-black transition-colors min-h-[40px] flex items-center justify-center"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-center py-2 sm:py-3 px-3 sm:px-6 rounded-xl text-gray-600 text-xs sm:text-sm font-medium hover:text-black active:text-black transition-colors min-h-[40px] flex items-center justify-center"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Footer in Menu */}
            <div className="border-t border-gray-200 px-0 py-3 sm:py-4 text-center safe-area-bottom\">
              <p className="text-gray-600 text-xs mb-1">
                © 2026 Swaralipi AI
              </p>
              <p className="text-gray-500 text-xs">
                Version 1.0.0 • PWA Enabled
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 backdrop-blur-sm -top-14 sm:-top-16"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
