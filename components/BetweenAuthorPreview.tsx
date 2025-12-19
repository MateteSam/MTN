import React from 'react';

const BetweenAuthorPreview: React.FC = () => {
  return (
    <div className="container mx-auto px-6 my-12">
      <div className="glass-panel p-6 md:p-10 rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="w-full md:w-1/2">
          <img src="/between auther and exclusive preview.png" alt="Between Author and Exclusive Preview" loading="lazy" decoding="async" className="w-full h-auto rounded-xl object-cover shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Exclusive Snapshot</h3>
          <p className="text-slate-400">A visual glimpse complementing the author's narrative — positioned here to bridge the Author and Exclusive Preview sections and provide a visual break for readers.</p>
        </div>
      </div>
    </div>
  );
};

export default BetweenAuthorPreview;
