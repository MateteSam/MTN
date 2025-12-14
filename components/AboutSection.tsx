import React, { useState, useEffect } from 'react';
import { Quote, Globe, Activity, X } from 'lucide-react';
import { HERO_CONTENT, AUTHOR_BIO } from '../constants';

const AboutSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = () => setExpanded(true);
    window.addEventListener('open-author', handler as EventListener);
    return () => window.removeEventListener('open-author', handler as EventListener);
  }, []);

  return (
    <section id="about" className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12">
          {/* About Book */}
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3 mb-6">
            <Activity className="text-mtn-yellow" />
            About The Book
          </h2>
          <div className="prose prose-invert prose-lg text-slate-400 mb-8">
            <p>
              From a startup in post-apartheid South Africa to the first African company to reach 300 million subscribers, MTN’s journey mirrors the transformation of a continent.
            </p>
            <p>
              Told in a narrative voice that blends the rigour of history with the sweep of literary storytelling, <span className="text-white font-medium">300 Million Connections</span> traces how a single idea—that Africans could build their own global technology network—became one of the greatest business revolutions of the 21st century.
            </p>
            <ul className="space-y-4 mt-6 pl-4 border-l border-white/10">
              <li className="flex gap-4">
                <span className="text-mtn-yellow font-bold">•</span>
                <span>300Million Connections is the definitive story of how Africa rewired its destiny through innovation, courage, and connectivity.</span>
              </li>
              <li className="flex gap-4">
                 <span className="text-mtn-yellow font-bold">•</span>
                <span>How Africa’s fintech revolution was born from a need to transact without banks.</span>
              </li>
              <li className="flex gap-4">
                 <span className="text-mtn-yellow font-bold">•</span>
                <span>The quiet building of ambitious digital infrastructure by engineers and dreamers.</span>
              </li>
            </ul>
          </div>

          {/* Quote (MTN Group CEO) */}
          <div className="mb-12 text-center">
            <Quote className="mx-auto text-mtn-yellow/20 w-16 h-16 hidden md:block" />
            <h3 className="text-2xl md:text-4xl font-light text-white leading-relaxed italic">
              {HERO_CONTENT.quote}
            </h3>
            <div className="mt-6 flex flex-col items-center">
               <div className="w-12 h-1 bg-mtn-yellow mb-4"></div>
               <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">{HERO_CONTENT.quoteAuthor}</p>
            </div>
          </div>

          {/* About Author (stacked below) */}
          <div id="author" className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden group neon-outline max-w-4xl mx-auto mt-16">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mtn-yellow/10 rounded-full blur-3xl group-hover:bg-mtn-yellow/20 transition-all"></div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 text-center">About The Author</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="p-2 rounded-full bg-gradient-to-tr from-mtn-yellow/50 via-mtn-yellow/30 to-transparent shadow-xl">
                <div className="w-80 h-80 md:w-96 md:h-96 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden transform transition-all hover:scale-105">
                  <img src="/Auther.png" alt="Author portrait" loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
                </div>
              </div>

              <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-semibold text-white">Dr. Charles Wirsuiy</h3>
                <div className="inline-block px-4 py-2 bg-mtn-yellow/10 text-mtn-yellow rounded-full text-sm font-bold tracking-widest uppercase">Author</div>
                <p className="mt-6 text-lg">{AUTHOR_BIO.split('\n')[0]}</p>
                <p className="text-base text-slate-500 italic">Also author of "God Lives in Sandton" and "Microsoft at 50".</p>
                <div className="flex items-center gap-3 text-base text-slate-400 pt-4">
                  <Globe className="w-5 h-5" />
                  <span>Lives in South Africa</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Expanded author overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setExpanded(false)}></div>
          <div className="relative max-w-5xl w-full bg-white/95 dark:bg-slate-900 glass-panel rounded-xl p-6 md:p-10 transform transition-all duration-500 scale-100">
            <button aria-label="Close" onClick={() => setExpanded(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5">
              <X className="w-5 h-5" />
            </button>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="w-full h-[720px] md:h-[800px] overflow-hidden rounded-lg shadow-2xl">
                <img src="/Auther.png" alt="Author large" loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
              </div>
              <div className="prose max-w-none text-slate-800 dark:text-slate-100">
                <h3 className="text-3xl font-display font-bold mb-2">Dr. Charles Wirsuiy</h3>
                <p className="text-lg leading-relaxed">{AUTHOR_BIO.split('\n')[0]}</p>
                <p className="mt-4 text-sm italic text-slate-600">Also author of "God Lives in Sandton" and "Microsoft at 50".</p>
                <div className="mt-6 text-sm text-slate-600 flex items-center gap-2"><Globe className="w-4 h-4" /> Lives in South Africa</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;