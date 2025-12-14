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
            <span className="text-mtn-yellow text-xs font-bold tracking-[0.3em] uppercase block mb-4">Exclusive Preview</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Excerpt from: 300 Million Connections: MTN & the African Tech Revolution</h2>
          </div>

          <div className="glass-panel p-8 md:p-16 rounded-3xl border-t border-white/10 shadow-2xl relative neon-outline">
            <FileText className="absolute top-8 right-8 text-white/5 w-24 h-24 rotate-12" />
            
            {/* About The Book - show on homepage instead of repeating excerpt */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-wide">
                About The Book
              </h3>
              <p className="max-w-3xl mx-auto text-slate-300 font-serif leading-relaxed">
                {AUTHOR_BIO.split('\n')[0]}
              </p>
            </div>

            <div className="prose prose-invert prose-lg max-w-none font-serif text-slate-300 leading-loose">
              <p className="mb-6">
                {AUTHOR_BIO.split('\n').slice(1).join(' ')}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                About the author • © 2026 Dr. Charles Wirsuiy Snr.
              </p>
              <button className="text-mtn-yellow hover:text-white transition-colors font-bold text-sm flex items-center gap-2 group neon-outline" onClick={onReadExcerpt}>
                READ FULL EXCERPT <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcerptSection;