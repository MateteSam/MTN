import React from 'react';
import { FileText } from 'lucide-react';
import { EXCERPT_TEXT } from '../constants';

const ExcerptSection: React.FC = () => {
  return (
    <section id="excerpt" className="py-24 bg-black relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#1e293b_10px,#1e293b_20px)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-mtn-yellow text-xs font-bold tracking-[0.3em] uppercase block mb-4">Exclusive Preview</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">License to Dream: Nigeria, 2001</h2>
          </div>

          <div className="glass-panel p-8 md:p-16 rounded-3xl border-t border-white/10 shadow-2xl relative neon-outline">
            <FileText className="absolute top-8 right-8 text-white/5 w-24 h-24 rotate-12" />
            
            <div className="prose prose-invert prose-lg max-w-none font-serif text-slate-300 leading-loose">
              {EXCERPT_TEXT.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-mtn-yellow first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Excerpt from Chapter 3 • © 2026 Dr. Charles Wirsuiy Snr.
              </p>
              <button className="text-mtn-yellow hover:text-white transition-colors font-bold text-sm flex items-center gap-2 group neon-outline" onMouseEnter={(e)=>{ (e.currentTarget.classList.add('animate-in')); }} onMouseLeave={(e)=>{ e.currentTarget.classList.remove('animate-in'); }}>
                READ FULL CHAPTER <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcerptSection;