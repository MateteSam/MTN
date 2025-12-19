import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExcerptSection from './components/ExcerptSection';
import BetweenAuthorPreview from './components/BetweenAuthorPreview';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import ExcerptPage from './components/ExcerptPage';
import AuthorPage from './components/AuthorPage';

function App() {
  const [view, setView] = useState<'home' | 'excerpt' | 'author'>('home');

  React.useEffect(() => {
    const handler = () => setView('author');
    window.addEventListener('open-author', handler as EventListener);
    return () => window.removeEventListener('open-author', handler as EventListener);
  }, []);

  if (view === 'excerpt') {
    return <ExcerptPage onBack={() => setView('home')} />;
  }

  if (view === 'author') {
    return <AuthorPage onBack={() => setView('home')} />;
  }

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-mtn-yellow selection:text-black pt-20 md:pt-24 lg:pt-28">
      <Navbar />
      <Hero onReadExcerpt={() => setView('excerpt')} />
      <AboutSection />
      {/* Smart placement: image between Author and Exclusive Preview */}
      <BetweenAuthorPreview />
      <ExcerptSection onReadExcerpt={() => setView('excerpt')} />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App;