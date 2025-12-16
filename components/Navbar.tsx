import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('site-theme') : null;
      if (saved === 'light') return 'light';
    } catch (e) {}
    return 'dark';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('site-theme', theme);
    } catch (e) {}
  }, [theme]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Author', href: '#author' },
    { label: 'Excerpt', href: '#excerpt' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-slate-900/90 shadow-lg border-white/10' : 'bg-transparent border-transparent'}`}>
          
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="300 Million Connections" className="h-10 w-auto" />
            <div className="ml-2 leading-tight">
              <span className="block text-white font-display font-bold tracking-wider text-lg">WCCCS</span>
              <span className="block text-white text-sm">Publishing</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href === '#author' ? (
                <button
                  key={link.label}
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-author')); }}
                  className="text-sm font-medium text-slate-300 hover:text-mtn-yellow transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </button>
              ) : (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-sm font-medium text-slate-300 hover:text-mtn-yellow transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </a>
              )
            ))}
            <button
              onClick={(e) => { e.preventDefault(); window.open('/test-payfast.html?amount=545&item_name=Print%20First%20Edition', '_blank'); }}
              className="bg-mtn-yellow text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-transform hover:scale-105"
            >
              PRE-ORDER
            </button>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2 p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4">
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
             {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-lg font-medium text-slate-200 hover:text-mtn-yellow"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setIsOpen(false); window.open('/test-payfast.html?amount=545&item_name=Print%20First%20Edition', '_blank'); }}
              className="bg-mtn-yellow text-black px-5 py-3 rounded-xl font-bold text-center mt-2"
            >
              PRE-ORDER NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;