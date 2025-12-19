import React from 'react';
import { FileText } from 'lucide-react';
import { EXCERPT_TEXT, AUTHOR_BIO } from '../constants';

interface ExcerptSectionProps {
  onReadExcerpt?: () => void;
}

const ExcerptSection: React.FC<ExcerptSectionProps> = ({ onReadExcerpt }) => {
  return (
    <section id="excerpt" className="py-24 bg-black relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#1e293b_10px,#1e293b_20px)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="small-label block mb-4">Exclusive Preview</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#ffd54a] mb-6">Excerpt from: 300 Million Connections: MTN & the African Tech Revolution</h2>
          </div>

          <div className="glass-panel p-8 md:p-16 rounded-3xl border-t border-white/10 shadow-2xl relative neon-outline">
            <FileText className="absolute top-8 right-8 text-white/5 w-24 h-24 rotate-12" />
            
            {/* Book-style Chapter Heading */}
            <div className="text-center mb-12 pb-8 border-b border-white/10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-mtn-yellow mb-2 tracking-wide">
                Chapter 3
              </h3>
              <h4 className="text-xl md:text-2xl font-serif font-medium text-white tracking-wide">
                <span className="first-letter:text-6xl first-letter:font-extrabold first-letter:neon-yellow-text">A</span> Network Is Born
              </h4>
              <h5 className="text-lg md:text-xl font-serif text-slate-400 italic mt-1">
                The Founders
              </h5>
            </div>

            <div className="prose prose-invert prose-lg max-w-none font-serif text-slate-300 leading-loose">
              {EXCERPT_TEXT.split('\n\n').slice(0, 2).map((paragraph, i) => (
                <p key={i} className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-mtn-yellow first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Excerpt from Chapter 3 • © 2026 Dr. Charles Wirsuiy Snr.
              </p>
              <button className="excerpt-cta" onClick={onReadExcerpt}>
                READ FULL EXCERPT <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcerptSection;