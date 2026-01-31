import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallPromptVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

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
    { path: '/', label: 'Home' },
    { path: '/scan', label: 'Scanner' },
    { path: '/tutorial', label: 'Tutorial' },
    { path: '/history', label: 'History' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6">
        <div className="flex items-center justify-between w-full max-w-md mx-auto">

          {/* Minimalist Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
              <div className="w-3 h-3 border-2 border-white rounded-full" />
            </div>
            <span className="font-black tracking-tighter text-lg italic">
              S<span className="text-gray-300 not-italic">L</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {isInstallPromptVisible && (
              <button
                onClick={handleInstall}
                className="text-[10px] font-black uppercase tracking-widest border border-black px-3 py-1.5 rounded-full hover:bg-black hover:text-white transition-all"
              >
                Install
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <div className={`h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-5'}`} />
              <div className={`h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-5'}`} />
              <div className={`h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Clean Fullscreen Overlay Menu */}
      <div className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full max-w-md mx-auto px-8 pt-32 pb-12">

          <div className="space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-4xl font-black tracking-tighter hover:italic transition-all ${location.pathname === link.path ? 'text-black' : 'text-gray-200 hover:text-black'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-gray-100">
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Link to="/about" className="hover:text-black transition-colors">Project Info</Link>
              <Link to="/contact" className="hover:text-black transition-colors">Support</Link>
              <p className="mt-4 opacity-50 font-medium normal-case tracking-normal italic">
                Swaralipi AI • Version 1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;