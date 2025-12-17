import React from 'react';
import { Quote, Globe, Activity } from 'lucide-react';
import { HERO_CONTENT, AUTHOR_BIO, AUTHOR_BIO_FULL } from '../constants';

const AboutSection: React.FC = () => {
  

  return (
    <section id="about" className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12">
          {/* About Book */}
          <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6 neon-heading">
            <Activity className="text-mtn-yellow neon-yellow-text" />
            <span className="ml-2">About The Book</span>
          </h2>
          <div className="prose prose-invert prose-lg text-slate-400 mb-8">
          <div className="prose prose-invert prose-lg text-slate-400 mb-8">
            <p>
              From a startup in post-apartheid South Africa to the first African company to reach 300 million subscribers, MTN’s journey mirrors the transformation of a continent.
            </p>
            <p>
              Told in a narrative voice that blends the rigour of history with the sweep of literary storytelling, <span className="text-white font-medium">300 Million Connections</span> traces how a single idea that Africans could build their own global technology network became one of the greatest business revolutions of the 21st century.
            </p>
            <ul className="space-y-4 mt-6 pl-4 border-l border-white/10">
              {['300Million Connections is the definitive story of how Africa rewired its destiny through innovation, courage, and connectivity.','How Africa’s fintech revolution was born from a need to transact without banks.','The quiet building of ambitious digital infrastructure by engineers and dreamers.'].map((t,i)=> (
                <li key={i} className="flex gap-4 items-start">
                  <span className="neon-yellow-text font-bold text-2xl leading-none mt-1">•</span>
                  <span className="text-slate-300">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote associated with the excerpt */}
          <div className="mb-12 text-center">
            <Quote className="mx-auto text-mtn-yellow/20 w-16 h-16 hidden md:block" />
            <p className="text-mtn-yellow italic text-2xl md:text-3xl font-serif leading-relaxed mt-4">
              A future not of ideology or law, but of connection.
            </p>
            <div className="mt-6 flex flex-col items-center">
               <div className="w-12 h-1 bg-mtn-yellow mb-4"></div>
            </div>
          </div>

          {/* About Author (stacked below) */}
          <div id="author" className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden group neon-outline max-w-4xl mx-auto mt-24 md:mt-28">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mtn-yellow/10 rounded-full blur-3xl group-hover:bg-mtn-yellow/20 transition-all"></div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center neon-heading">About The Author</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="p-2 rounded-full author-ring">
                <div className="w-72 h-72 md:w-84 md:h-84 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden transform transition-all hover:scale-105">
                  <img src="/Auther.png" alt="Author portrait" loading="lazy" decoding="async" className="w-full h-full object-cover object-center rounded-full" />
                </div>
              </div>

              <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-semibold text-white">Dr. Charles Wirsuiy</h3>
                <p className="mt-2 text-sm neon-yellow-text font-medium tracking-wide">Writer · Researcher · Storyteller</p>
                {AUTHOR_BIO.split('\n\n').map((para, idx) => (
                  <p key={idx} className={idx === 0 ? 'mt-6 text-lg' : 'text-lg'}>{para}</p>
                ))}
                <button
                  className="mt-4 px-6 py-2 bg-mtn-yellow text-black font-bold rounded shadow hover:bg-yellow-400 transition"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-author'))}
                >
                  Read More
                </button>
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
      
    </section>
  );
};

export default AboutSection;