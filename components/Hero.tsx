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

          {/* 3D Book */}
          <div className="relative">
            <Book3D />
            
            {/* Slideshow Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto">
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-auto object-contain transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
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