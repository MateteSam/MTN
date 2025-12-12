import React from 'react';
import { ArrowRight, Wifi } from 'lucide-react';
import Book3D from './Book3D';
import GlitchText from './GlitchText';
import { HERO_CONTENT } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      
      {/* Background: Earth & Network */}
      <div className="absolute inset-0 -z-30 bg-black">
        {/* Base Earth Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('/a book cover featuri.png')` }}
        ></div>
         
         {/* Animated Connecting Lights Overlay (SVG) */}
         <div className="absolute inset-0 opacity-40 mix-blend-screen">
            <svg className="w-full h-full" preserveAspectRatio="none">
               {/* Definitions for gradients */}
               <defs>
                 <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                   <stop offset="50%" stopColor="#06b6d4" />
                   <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
                 </linearGradient>
               </defs>
               
               {/* Moving Lines - Horizontal curves representing data flow */}
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
         </div>

         {/* Dark overlays for readability */}
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950"></div>
      </div>
      
      {/* Animated Mesh Grid (Simulated with CSS) */}
      <div className="absolute inset-0 opacity-20 -z-10" 
           style={{
             backgroundImage: 'linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)',
             backgroundSize: '60px 60px',
             transform: 'perspective(1000px) rotateX(20deg) scale(1.2)'
           }}>
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-purple/20 rounded-full blur-[100px] animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mtn-yellow/10 border border-mtn-yellow/20 text-mtn-yellow text-xs font-bold tracking-widest uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-mtn-yellow animate-ping"></span>
              Official Release 2026
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                300 <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-cyan">MILLION</span>
              </h1>
              <GlitchText 
                as="h2" 
                text="CONNECTIONS" 
                className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white block" 
              />
            </div>

            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed border-l-2 border-mtn-yellow pl-6">
              {HERO_CONTENT.subheadline}
            </p>

            <p className="text-slate-500 max-w-xl mx-auto lg:mx-0">
              {HERO_CONTENT.intro}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#pricing"
                className="group relative px-8 py-4 bg-mtn-yellow text-black font-bold text-lg rounded-none skew-x-[-12deg] hover:bg-yellow-300 transition-colors"
              >
                <div className="skew-x-[12deg] flex items-center gap-2">
                  PREORDER NOW <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              <a 
                href="#excerpt"
                className="px-8 py-4 text-white border border-white/20 hover:bg-white/5 transition-colors font-medium text-lg rounded-none skew-x-[-12deg]"
              >
                 <div className="skew-x-[12deg]">Read Excerpt</div>
              </a>
            </div>
            
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 opacity-60">
                <Wifi className="w-5 h-5 text-slate-500" />
                <span className="text-xs tracking-widest uppercase text-slate-500">Digital • Financial • Social</span>
            </div>
          </div>

          {/* Visual Content (3D Book) */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
             {/* "Back" giant text effect similar to video */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] font-display font-bold text-white/5 whitespace-nowrap select-none pointer-events-none z-[-1]">
               AFRICA
             </div>
             <Book3D />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;