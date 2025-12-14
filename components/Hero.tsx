import React, { useState, useEffect } from 'react';
import { ArrowRight, Wifi } from 'lucide-react';
import Book3D from './Book3D';
import GlitchText from './GlitchText';
import { HERO_CONTENT } from '../constants';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/mockup1.png', '/mockup2.png', '/banner.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-purple bg-opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Animated Connecting Lights Overlay (SVG) - commented out for build */}
      {/* <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
            </linearGradient>
          </defs>
          
          <path 
            d="M0,200 Q400,100 800,300 T1600,200" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="2"
            strokeDasharray="20, 30"
            className="animate-dash"
          />
          <path 
            d="M0,600 Q600,400 1200,700 T2000,600" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="1"
            strokeDasharray="50, 50"
            className="animate-dash-fast opacity-50"
          />
          <path 
            d="M-200,800 Q300,500 900,900 T1800,800" 
            fill="none" 
            stroke="#7c3aed" 
            strokeWidth="2"
            strokeDasharray="10, 40"
            className="animate-dash opacity-60"
            style={{ animationDuration: '15s' }}
          />
        </svg>
      </div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12">
          
          {/* Release Date Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mtn-yellow bg-opacity-10 border border-mtn-yellow border-opacity-20 text-mtn-yellow text-xs font-bold tracking-widest uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-mtn-yellow animate-ping"></span>
            Official Book Release February 2026
          </div>

          {/* Creative Layout: 3D Book + Floating Slideshow Elements */}
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Central 3D Book with generous space */}
            <div className="flex justify-center mb-16">
              <div className="relative w-96 h-96 flex items-center justify-center">
                <Book3D />
              </div>
            </div>
            
            {/* Floating Slideshow Images - Creative Positioning */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Left - Mockup1 */}
              <div className="absolute top-8 left-8 w-32 h-32 transform -rotate-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
                <img
                  src="/mockup1.png"
                  alt="Book Mockup 1"
                  className={`w-full h-full object-contain transition-all duration-1000 ${
                    currentSlide === 0 ? 'scale-110 opacity-100' : 'scale-100 opacity-60'
                  }`}
                />
              </div>
              
              {/* Top Right - Mockup2 */}
              <div className="absolute top-12 right-12 w-40 h-40 transform rotate-15 opacity-70 hover:opacity-100 transition-opacity duration-500">
                <img
                  src="/mockup2.png"
                  alt="Book Mockup 2"
                  className={`w-full h-full object-contain transition-all duration-1000 ${
                    currentSlide === 1 ? 'scale-110 opacity-100' : 'scale-100 opacity-50'
                  }`}
                />
              </div>
              
              {/* Bottom Left - Banner */}
              <div className="absolute bottom-16 left-16 w-36 h-36 transform -rotate-8 opacity-75 hover:opacity-100 transition-opacity duration-500">
                <img
                  src="/banner.png"
                  alt="Book Banner"
                  className={`w-full h-full object-contain transition-all duration-1000 ${
                    currentSlide === 2 ? 'scale-110 opacity-100' : 'scale-100 opacity-55'
                  }`}
                />
              </div>
              
              {/* Bottom Right - Secondary Mockup1 */}
              <div className="absolute bottom-8 right-8 w-28 h-28 transform rotate-22 opacity-65 hover:opacity-100 transition-opacity duration-500">
                <img
                  src="/mockup1.png"
                  alt="Book Mockup 1 Secondary"
                  className={`w-full h-full object-contain transition-all duration-1000 ${
                    currentSlide === 0 ? 'scale-105 opacity-90' : 'scale-100 opacity-40'
                  }`}
                />
              </div>
              
              {/* Middle Right - Floating Mockup2 */}
              <div className="absolute top-1/2 right-24 transform -translate-y-1/2 rotate-45 w-24 h-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
                <img
                  src="/mockup2.png"
                  alt="Book Mockup 2 Floating"
                  className={`w-full h-full object-contain transition-all duration-1000 ${
                    currentSlide === 1 ? 'scale-105 opacity-85' : 'scale-100 opacity-35'
                  }`}
                />
              </div>
              
              {/* Middle Left - Floating Banner */}
              <div className="absolute top-1/2 left-24 transform -translate-y-1/2 -rotate-30 w-30 h-30 opacity-55 hover:opacity-100 transition-opacity duration-500">
                <img
                  src="/banner.png"
                  alt="Book Banner Floating"
                  className={`w-full h-full object-contain transition-all duration-1000 ${
                    currentSlide === 2 ? 'scale-105 opacity-80' : 'scale-100 opacity-30'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Preorder CTA - Star of the Show */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              300 <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-cyan">MILLION</span> CONNECTIONS
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-8">
                {HERO_CONTENT.intro}
              </p>
              
              <button
                onClick={(e) => { e.preventDefault(); window.open("/api/payfast/checkout?amount=199&item_name=300%20Million%20Connections", '_blank'); }}
                className="group relative px-12 py-6 bg-mtn-yellow text-black font-bold text-2xl rounded-none skew-x-[-12deg] hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-mtn-yellow hover:shadow-opacity-50 hover:scale-105 transform"
              >
                <div className="skew-x-[12deg] flex items-center gap-3">
                  🚀 PREORDER NOW <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
              
              <p className="text-mtn-yellow font-semibold text-lg mt-4 animate-pulse">
                Limited Time Offer - Be Among the First!
              </p>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <a 
              href="#excerpt"
              className="px-8 py-4 text-white border border-white border-opacity-20 hover:bg-white hover:bg-opacity-hover:bg-white hover:bg-opacity-5 transition-colors font-medium text-lg rounded-none skew-x-[-12deg]"
            >
               <div className="skew-x-[12deg]">Read Excerpt</div>
            </a>
            <div className="flex items-center gap-4 opacity-60">
                <Wifi className="w-5 h-5 text-slate-500" />
                <span className="text-xs tracking-widest uppercase text-slate-500">Digital • Financial • Social</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;