import React from 'react';
import { X, Globe } from 'lucide-react';
import { AUTHOR_BIO_FULL } from '../constants';

interface Props {
  onBack: () => void;
}

const AuthorPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold">About the Author</h1>
          <button onClick={onBack} aria-label="Back to home" className="px-4 py-2 bg-mtn-yellow text-black rounded font-bold">Back</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-64 h-64 md:w-72 md:h-72 bg-slate-800 rounded-2xl overflow-hidden border-4 border-mtn-yellow/30 shadow-lg">
              <img src="/Auther.png" alt="Author portrait" className="w-full h-full object-cover object-center" />
            </div>
          </div>

          <div className="md:col-span-2 prose prose-invert max-w-none text-lg leading-relaxed">
            <h2 className="sr-only">Dr. Charles Wirsuiy</h2>
            {AUTHOR_BIO_FULL.split('\n\n').map((para, idx) => (
              <p key={idx} className="mb-6">{para}</p>
            ))}

            <p className="italic text-slate-400">Also author of "God Lives in Sandton" and "Microsoft at 50".</p>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <Globe className="w-4 h-4" />
              <span>Lives in South Africa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
