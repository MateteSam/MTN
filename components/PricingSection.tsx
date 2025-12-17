import React, { useState, useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { PRICING_TIERS } from '../constants';
import { PricingTier } from '../types';

const PricingSection: React.FC = () => {
  const handlePreorder = async (tier: PricingTier) => {
    // Open new window immediately so popup blockers allow it (user gesture)
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      alert('Popup blocked. Please allow popups for this site or try again.');
      return;
    }

    // During local development, skip hitting PayFast and open the local test page
    // This uses Vite's DEV flag so it also covers non-local hostnames used for LAN testing.
    const isDev = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));
    if (isDev) {
      const qs = new URLSearchParams({ amount: tier.price.replace(/[^0-9.]/g, ''), item_name: tier.title }).toString();
      newWindow.location = `/test-payfast.html?${qs}`;
      return;
    }

    try {
      const resp = await fetch('/api/payfast/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: tier.price.replace(/[^0-9.]/g, ''), item_name: tier.title })
      });

      const html = await resp.text();

      if (!resp.ok) {
        // fallback to local test page for offline/local testing
        const qs = new URLSearchParams({ amount: tier.price.replace(/[^0-9.]/g, ''), item_name: tier.title }).toString();
        newWindow.location = `/test-payfast.html?${qs}`;
        return;
      }

      // If the server returned a redirect script, follow it directly in the opened tab
      const redirectMatch = html.match(/window\.location=['"]([^'"]+)['"]/);
      if (redirectMatch) {
        newWindow.location = redirectMatch[1];
      } else {
        // Otherwise write the returned HTML into the opened tab
        newWindow.document.open();
        newWindow.document.write(html);
        newWindow.document.close();
      }
    } catch (err) {
      if (newWindow) {
        const qs = new URLSearchParams({ amount: tier.price.replace(/[^0-9.]/g, ''), item_name: tier.title }).toString();
        newWindow.location = `/test-payfast.html?${qs}`;
      }
      console.error('PayFast checkout error', err);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-4xl md:text-6xl font-display font-bold text-white">Pre-Order Today</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             Secure your copy of the definitive narrative of Africa's digital rise. 
             All editions ship worldwide from Johannesburg.
           </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>


        <div className="mt-16 glass-panel rounded-xl p-8 max-w-3xl mx-auto text-center border-l-4 border-mtn-yellow">
          <h3 className="text-xl font-bold text-white mb-2">Corporate & Institutional Orders</h3>
          <p className="text-slate-400 mb-6">
            Bulk pre-orders for partners, universities, and libraries available at discounted rates (15-20% off).
          </p>
          <a href="mailto:corporate@godlivesinsandton.store" className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors font-medium">
            Contact for Corporate Quote
          </a>
        </div>
      </div>
    </section>
  );
};

const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => {
  const isCollector = tier.id === 'collector';
  const formRef = useRef<HTMLFormElement | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const colorMap = {
    yellow: 'border-mtn-yellow text-mtn-yellow shadow-mtn-yellow/20',
    purple: 'border-tech-purple text-tech-purple shadow-tech-purple/20',
    blue: 'border-tech-cyan text-tech-cyan shadow-tech-cyan/20',
    orange: 'border-orange-500 text-orange-500 shadow-orange-500/20'
  };

  const btnColorMap = {
     yellow: 'bg-mtn-yellow text-black hover:bg-yellow-300',
     purple: 'bg-tech-purple text-white hover:bg-purple-600',
     blue: 'bg-slate-800 text-white hover:bg-slate-700',
     orange: 'bg-slate-800 text-white hover:bg-slate-700'
  };

  return (
    <div className={`
      relative p-8 rounded-2xl border transition-all duration-300 flex flex-col
      ${isCollector ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-tech-purple/40 transform hover:-translate-y-2 shadow-2xl text-white' : 'bg-slate-950/50 border-white/10 hover:border-white/30 hover:bg-slate-900'}
    `}>
      {tier.badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isCollector ? 'neon-badge' : 'bg-mtn-yellow text-black'}`}>
          {tier.badge?.toUpperCase()}
        </div>
      )}

      {isCollector && (
        <div className="absolute top-4 right-4 text-tech-purple animate-pulse">
          <Star className="fill-current w-5 h-5" />
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 ${isCollector ? 'text-white' : 'text-slate-200'}`}>{tier.title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-white">{tier.price}</span>
          {tier.originalPrice && (
            <span className="text-sm text-slate-500 line-through decoration-slate-500/50">{tier.originalPrice}</span>
          )}
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-8 leading-relaxed">
        {tier.description}
      </p>

      <ul className="space-y-4 mb-8 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <Check className={`w-5 h-5 flex-shrink-0 ${isCollector ? 'text-tech-purple' : 'text-mtn-yellow'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {tier.id === 'print' ? (
        <div className="w-full">
          <div className="mb-4 text-sm text-slate-400">Buy a copy (R545)</div>
          <div className="pt-3">
            <a href="https://payf.st/jrpi0" target="_blank" rel="noopener noreferrer" className="w-full inline-block text-center py-3 bg-mtn-yellow text-black rounded-lg font-bold">Pay via PayFast</a>
          </div>
        </div>
      ) : tier.id === 'collector' ? (
        <div className="w-full">
          <div className="mb-4 text-sm text-slate-300">Collector’s Edition <span className="text-white font-bold">{tier.price}</span></div>
          <div className="pt-3">
            <a href="https://payf.st/4s8px" target="_blank" rel="noopener noreferrer" aria-label="Buy Collector's Edition for R995" className="w-full inline-block text-center py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-bold shadow-2xl hover:brightness-95 transition-all">
              {tier.cta} ➜
            </a>
          </div>
        </div>
      ) : tier.id === 'ebook' ? (
        <div className="w-full">
          <div className="mb-4 text-sm text-slate-400">eBook Edition (R199)</div>
          <div className="pt-3">
            <a href="https://payf.st/8ucgp" target="_blank" rel="noopener noreferrer" aria-label="Buy eBook Edition for R199" className="w-full inline-block text-center py-3 bg-slate-800 text-white rounded-lg font-bold">{tier.cta}</a>
          </div>
        </div>
      ) : tier.id === 'audio' ? (
        <div className="w-full">
          <div className="mb-4 text-sm text-slate-400">Audiobook Edition (R199)</div>
          <div className="pt-3">
            <a href="https://payf.st/upho3" target="_blank" rel="noopener noreferrer" aria-label="Buy Audiobook Edition for R199" className="w-full inline-block text-center py-3 bg-orange-500 text-white rounded-lg font-bold">{tier.cta}</a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => handlePreorder(tier)}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${btnColorMap[tier.color]}`}>
          {tier.cta} ➜
        </button>
      )}
    </div>
  );
};

export default PricingSection;