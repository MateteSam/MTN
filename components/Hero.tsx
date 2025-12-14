import React, { useState, useEffect } from 'react';
import { ArrowRight, Wifi, ChevronRight } from 'lucide-react';
import Book3D from './Book3D';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
  onReadExcerpt?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReadExcerpt }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/mockup1.png', '/mockup2.png', '/banner.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#020617]">

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tech-purple/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mtn-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* LEFT COLUMN: 3D Book */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-1">
            <div className="relative w-80 h-[500px] md:w-96 md:h-[600px] flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
              {/* Spotlight effect behind book */}
              <div className="absolute inset-0 bg-gradient-to-tr from-mtn-yellow/20 to-transparent blur-2xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
              <Book3D />
            </div>
          </div>

          {/* RIGHT COLUMN: Content & Slideshow */}
          <div className="flex flex-col gap-8 order-2 lg:order-2 text-left">

            {/* Header / Chapter Info */}
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
              <div className="flex items-center gap-3 text-mtn-yellow font-mono text-xs tracking-widest uppercase">
                <span className="w-2 h-2 bg-mtn-yellow rounded-full animate-pulse"></span>
                <span>{HERO_CONTENT.chapter}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                {HERO_CONTENT.subheadline}
                <span className="block text-slate-500 text-2xl md:text-3xl mt-2 font-serif italic font-normal">
                  {HERO_CONTENT.section}
                </span>
              </h1>
            </div>

            {/* "Cute" Slideshow */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide
                      ? 'opacity-100 scale-100 translate-x-0'
                      : 'opacity-0 scale-110 translate-x-12'
                    }`}
                >
                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-6 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-mtn-yellow' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Text Excerpt (First 2 paragraphs) */}
            <div className="space-y-6 text-slate-300 leading-relaxed font-serif text-lg md:text-xl border-l-2 border-mtn-yellow/30 pl-6">
              <p>{HERO_CONTENT.text[0]}</p>
              <p>{HERO_CONTENT.text[1]}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button
                onClick={onReadExcerpt}
                className="group bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-mtn-yellow transition-colors flex items-center gap-2"
              >
                Read Full Excerpt
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest">
                <Wifi className="w-4 h-4" />
                <span>300 Million Connections</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;