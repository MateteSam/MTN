import React, { useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const AboutSection = React.lazy(() => import('./components/AboutSection'));
const ExcerptSection = React.lazy(() => import('./components/ExcerptSection'));
const BetweenAuthorPreview = React.lazy(() => import('./components/BetweenAuthorPreview'));
const PricingSection = React.lazy(() => import('./components/PricingSection'));
const Footer = React.lazy(() => import('./components/Footer'));
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
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <AboutSection />
        {/* Smart placement: image between Author and Exclusive Preview */}
        <BetweenAuthorPreview />
        <ExcerptSection onReadExcerpt={() => setView('excerpt')} />
        <PricingSection />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;