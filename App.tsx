import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExcerptSection from './components/ExcerptSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-mtn-yellow selection:text-black">
      <Navbar />
      <Hero />
      <AboutSection />
      <ExcerptSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App;