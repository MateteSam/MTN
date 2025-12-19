import React from 'react';
import { ArrowRight, Wifi, ChevronRight } from 'lucide-react';
import Book3D from './Book3D';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
  onReadExcerpt?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReadExcerpt }) => {

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-0 pb-20 overflow-hidden bg-[#020617]">

      {/* Banner at the very top, single image fitting perfectly */}
      <div className="w-full flex items-center justify-center rounded-none overflow-hidden border-b border-white/10 shadow-2xl bg-black">
        <img
          src="/banner.png"
          alt="300 Million Connections Banner"
          className="w-full h-auto max-h-[50vh] md:max-h-[70vh] object-contain"
        />
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 relative z-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: 3D Book */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-1">
            <div className="relative w-80 h-[500px] md:w-96 md:h-[600px] flex items-center justify-center transform hover:scale-105 transition-transform duration-700 mr-[-20px] lg:mr-[-40px]">
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
                onClick={(e) => { e.preventDefault(); const pricing = document.getElementById('pricing'); if (pricing) { pricing.scrollIntoView({ behavior: 'smooth' }); } }}
                className="relative overflow-hidden  shadow-2xl bg-[#ffd54a] text-black border-2 border-[#ffd54a] hover:bg-black hover:text-[#ffd54a] transition-colors"
                aria-label="Pre-Order Now"
              >
                <div className="px-10 py-4 text-black font-bold text-lg flex items-center gap-3">
                  <span >PRE-ORDER NOW</span>
                  <ChevronRight className="w-5 h-5 " />
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
