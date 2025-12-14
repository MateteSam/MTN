import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExcerptSection from './components/ExcerptSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import ExcerptPage from './components/ExcerptPage';

function App() {
  const [view, setView] = useState<'home' | 'excerpt'>('home');

  if (view === 'excerpt') {
    return <ExcerptPage onBack={() => setView('home')} />;
  }

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-mtn-yellow selection:text-black">
      <Navbar />
      <Hero onReadExcerpt={() => setView('excerpt')} />
      <AboutSection />
      <ExcerptSection onReadExcerpt={() => setView('excerpt')} />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App;