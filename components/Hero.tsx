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
    <section className="relative min-h-screen flex flex-col items-center pt-0 pb-20 overflow-hidden bg-[#020617]">

      {/* Slideshow/Banner at the very top, no overlay */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative rounded-none overflow-hidden border-b border-white/10 shadow-2xl">
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
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-6 flex gap-2 z-10">
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

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 relative z-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* LEFT COLUMN: 3D Book */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-1">
            <div className="relative w-80 h-[500px] md:w-96 md:h-[600px] flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
              {/* Spotlight effect behind book */}
              <div className="absolute inset-0 bg-gradient-to-tr from-mtn-yellow/20 to-transparent blur-2xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
              <Book3D />
            </div>
          </div>

          {/* RIGHT COLUMN: Content & CTA */}
          <div className="flex flex-col gap-8 order-2 lg:order-2 text-left">
            {/* Actions - Tilted CTA Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              {/* Preorder - Tilted Yellow Button */}
              <button
                onClick={(e) => { e.preventDefault(); window.open("/api/payfast/checkout?amount=199&item_name=300%20Million%20Connections", '_blank'); }}
                className="relative overflow-hidden transform skew-x-[-12deg] shadow-2xl"
                aria-label="Pre-Order Now"
              >
                <div className="bg-mtn-yellow px-10 py-4 text-black font-bold text-lg flex items-center gap-3 hover:brightness-95 transition-all duration-200">
                  <span className="skew-x-[12deg]">PRE-ORDER NOW</span>
                  <ChevronRight className="w-5 h-5 skew-x-[12deg]" />
                </div>
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