import React, { useRef, useState } from 'react';
import { ArrowRight, Wifi, ChevronRight } from 'lucide-react';
import Book3D from './Book3D';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
  onReadExcerpt?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReadExcerpt }) => {
  const bannerRef = useRef<HTMLImageElement | null>(null);
  const [bannerInfo, setBannerInfo] = useState<{ src?: string; w?: number; h?: number } | null>(null);

  const onBannerLoad = () => {
    const img = bannerRef.current;
    if (img) {
      setBannerInfo({ src: img.currentSrc || img.src, w: img.naturalWidth, h: img.naturalHeight });
      console.log('Banner loaded:', img.currentSrc || img.src, img.naturalWidth, 'x', img.naturalHeight);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-0 pb-20 overflow-hidden bg-[#020617]">

      {/* Banner at the very top, single image fitting perfectly */}
      <div className="w-full relative flex items-center justify-center rounded-none overflow-hidden border-b border-white/10 shadow-2xl bg-black">
        <picture>
          {/* Desktop: Force highest res PNG to eliminate any compression blur */}
          <source
            media="(min-width: 768px)"
            type="image/png"
            srcSet={`/banner@3x.png?v=5261a24`}
          />

          {/* Mobile: prefer the provided mobile image (AVIF/WebP for better size) */}
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet={`/mobile.avif?v=5261a24 1x, /mobile@2x.avif?v=5261a24 2x, /mobile@3x.avif?v=5261a24 3x`}
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet={`/mobile.webp?v=5261a24 1x, /mobile@2x.webp?v=5261a24 2x, /mobile@3x.webp?v=5261a24 3x`}
          />

          <img
            ref={bannerRef}
            onLoad={onBannerLoad}
            src="/banner@3x.png?v=5261a24"
            alt="300 Million Connections Banner"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={5760}
            height={2088}
            className="w-full h-auto object-contain"
          />

          {/* debug overlay removed for production */}
        </picture>
        {/* Subtle gradient fader to blend banner into hero and improve readability; stronger on small screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/80 sm:to-black/70 md:to-black/60"
        />
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 relative z-10 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          {/* LEFT COLUMN: 3D Book */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-1">
            <div className="relative w-72 h-[480px] md:w-96 md:h-[560px] flex items-center justify-center transform hover:scale-105 transition-transform duration-700 mr-[-12px] lg:mr-[-28px]">
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
                aria-label="Pre-order: scroll to pricing"
                className="btn-primary focus-visible:focus-ring inline-flex items-center gap-3 px-8 py-3 font-bold text-sm md:text-base"
              >
                <span>PRE-ORDER NOW</span>
                <ChevronRight className="w-5 h-5" />
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
