import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { EXCERPT_TEXT, HERO_CONTENT } from '../constants';

interface ExcerptPageProps {
    onBack: () => void;
}

const ExcerptPage: React.FC<ExcerptPageProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#fdfbf7] text-slate-800 font-serif relative">
            {/* Paper Texture Overlay */}
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none z-0"></div>

            {/* Navigation Bar */}
            <nav className="fixed top-0 w-full z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 group text-slate-600 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-sans font-bold uppercase tracking-widest text-xs">Back to Home</span>
                    </button>

                    <div className="hidden md:flex items-center gap-2 opacity-50">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-sans font-medium text-xs tracking-widest uppercase truncate max-w-[200px]">300 Million Connections</span>
                    </div>

                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">

                {/* Header Block */}
                <header className="mb-16 text-center border-b border-slate-200 pb-12">
                    <div className="inline-block mb-6">
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-sans font-bold uppercase tracking-[0.3em]">{HERO_CONTENT.chapter}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                        {HERO_CONTENT.section}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 italic font-medium">
                        Excerpt from "{HERO_CONTENT.subheadline}"
                    </p>
                </header>

                {/* Text Body */}
                <article className="prose prose-lg md:prose-xl prose-slate mx-auto leading-loose first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-display first-letter:font-bold first-letter:text-black">
                    {EXCERPT_TEXT.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-8 text-slate-700">
                            {paragraph}
                        </p>
                    ))}
                </article>

                {/* Footer Block */}
                <div className="mt-24 pt-12 border-t border-slate-200 text-center space-y-8">
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                    <blockquote className="text-2xl font-display font-bold text-slate-900 leading-tight max-w-2xl mx-auto">
                        "A future not of ideology or law, but of connection."
                    </blockquote>

                    <div className="pt-8">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.open("/api/payfast/checkout?amount=199&item_name=300%20Million%20Connections", '_blank');
                            }}
                            className="px-12 py-5 bg-black text-white font-sans font-bold uppercase tracking-[0.2em] hover:bg-mtn-yellow hover:text-black transition-all shadow-xl hover:translate-y-[-2px]"
                        >
                            PRE-ORDER NOW
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ExcerptPage;
