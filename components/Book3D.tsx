import React, { useState, useRef } from 'react';

const Book3D: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const VideoCover: React.FC = () => {
    return (
      <>
        {!videoFailed ? (
          <video
            ref={videoRef}
            src="/3D.mp4"
            poster="/book cover.png"
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <img src="/book cover.png" alt="300 Million Connections Book Cover" className="w-full h-full object-cover" />
        )}
      </>
    );
  };

  return (
    <div 
      className="relative w-64 h-96 md:w-80 md:h-[500px] z-10 transition-all duration-1000 ease-in-out"
      style={{ perspective: '2000px' }}
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
          Book Wrapper 
          - Handles the overall position and floating animation.
          - We use inline styles for transform to ensure reliable 3D rotation without relying on Tailwind plugins.
      */}
      <div 
        className={`relative w-full h-full preserve-3d transition-all duration-700 ease-in-out cursor-pointer ${!isOpen ? 'animate-float' : ''}`}
        style={{ 
          transform: isOpen 
            ? 'scale(1.03) rotateY(0deg) translateX(0)' 
            : isHovered 
              ? 'rotateY(-12deg) rotateX(5deg) translateX(0)' 
              : 'rotateY(0deg) rotateX(0deg) translateX(0)'
        }}
      >

        {/* =========================================================
            FRONT COVER GROUP (The "Door" that swings open)
            ========================================================= */}
        <div 
          className="absolute inset-0 z-30 transition-transform duration-1000 ease-in-out origin-left preserve-3d"
          style={{ transform: isOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)' }}
        >
          {/* FRONT FACE (The Cover Image) */}
          <div 
            className="absolute inset-0 bg-[#0a1120] rounded-r-sm shadow-2xl flex flex-col overflow-hidden border-r border-white/10 backface-hidden"
            style={{ transform: 'translateZ(1px)' }}
          >
             {/* Try to use a front-cover video at /3D.mp4; fall back to the static cover image if unavailable */}
             {/** Video element intentionally muted/autoplay/loop to act as a cover texture */}
             <VideoCover />
             {/* Sheen/Texture Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent w-8"></div>
          </div>

          {/* BACK FACE (The Left Inner Page) */}
          <div 
            className="absolute inset-0 bg-[#fdfbf7] rounded-l-sm shadow-md flex flex-col justify-center px-8 py-12 text-slate-800 backface-hidden"
            style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
          >
             {/* Paper Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>
             
             {/* Inner Shadow (Spine side) */}
             <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>

             {/* Content */}
             <div className="relative z-10 font-serif">
                <div className="w-12 h-1 bg-mtn-yellow mb-6"></div>
                <p className="text-xl md:text-2xl leading-relaxed font-medium text-slate-900 italic">
                  "300Million Connections is the definitive story of how Africa rewired its destiny through innovation, courage, and connectivity."
                </p>
                <div className="mt-8 flex items-center gap-2 opacity-50">
                  <span className="h-px w-8 bg-slate-400"></span>
                  <span className="text-xs font-sans tracking-widest uppercase text-slate-500">Introduction</span>
                </div>
             </div>
          </div>
        </div>

        {/* Click affordance: subtle pulse glow behind book when closed */}
        {!isOpen && (
          <div className="absolute inset-[-12%] flex items-center justify-center pointer-events-none z-0">
            <div className="w-full h-full rounded-2xl opacity-40 animate-pulse-slow" style={{ boxShadow: '0 30px 80px rgba(124,58,237,0.12), 0 10px 40px rgba(6,182,212,0.06)' }}></div>
          </div>
        )}


        {/* =========================================================
            STATIC GROUP (The "Body" of the book)
            ========================================================= */}
        
        {/* RIGHT INNER PAGE (Base) */}
        <div className="absolute inset-0 bg-[#fdfbf7] rounded-r-sm z-10 flex flex-col justify-center items-center text-center px-6 py-12 border-l border-slate-300">
             {/* Paper Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

             {/* Inner Shadow (Spine side) */}
             <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-20"></div>

             <div className="relative z-30 flex flex-col items-center gap-6 transform translate-x-2">
                <div className="bg-mtn-yellow/20 p-4 rounded-full mb-2">
                  <span className="text-3xl filter drop-shadow-md">🚀</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-mtn-yellow to-orange-600 tracking-tighter drop-shadow-sm leading-[1.1]">
                  PRE-ORDER<br/>TODAY!
                </h3>
                
                <p className="text-slate-500 text-sm font-medium max-w-[200px] leading-relaxed">
                  Be the first to read the untold story of Africa's digital revolution.
                </p>
                
                <a 
                  href="#pricing" 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="mt-4 px-8 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-mtn-yellow hover:text-black transition-all shadow-lg hover:shadow-mtn-yellow/50 hover:-translate-y-1"
                >
                  Pre-Order here
                </a>
             </div>
        </div>

        {/* SPINE (Visible when closed) */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-[40px] bg-[#0a1120] flex items-center justify-center z-0 shadow-inner border-l border-white/5"
          style={{ transform: 'rotateY(-90deg) translateX(-20px)' }}
        >
           <span className="text-mtn-yellow font-bold text-xs tracking-[0.2em] rotate-90 whitespace-nowrap opacity-90">300 MILLION CONNECTIONS</span>
        </div>

        {/* PAGES THICKNESS (Right side) */}
        <div 
          className="absolute top-1 bottom-1 right-0 w-[38px] bg-[#f8fafc] shadow-inner bg-[repeating-linear-gradient(90deg,#f1f5f9,#f1f5f9_1px,#e2e8f0_1px,#e2e8f0_2px)]"
          style={{ transform: 'rotateY(90deg) translateX(19px) translateZ(-1px)' }}
        ></div>
        
        {/* BACK COVER */}
        <div 
          className="absolute inset-0 bg-[#050810] rounded-l-sm shadow-xl z-[-1]"
          style={{ transform: 'translateZ(-20px)' }}
        ></div>

      </div>
      
      {/* Shadow/Glow underneath */}
      <div className={`
        absolute -bottom-12 left-10 right-10 h-12 bg-black/60 blur-xl rounded-[100%] transition-all duration-1000
        ${isOpen ? 'opacity-20 scale-x-150' : 'animate-pulse-slow opacity-100'}
      `}></div>

      {/* Tap Hint */}
      <div className={`
        absolute -bottom-20 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] uppercase transition-opacity duration-500
        ${isOpen ? 'opacity-0' : 'animate-pulse opacity-100'}
      `}>
        Click to Open
      </div>

    </div>
  );
};

export default Book3D;