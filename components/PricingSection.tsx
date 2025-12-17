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

      // success — write the PayFast form HTML into the opened tab
      newWindow.document.open();
      newWindow.document.write(html);
      newWindow.document.close();
    } catch (err) {
      if (newWindow) {
        const qs = new URLSearchParams({ amount: tier.price.replace(/[^0-9.]/g, ''), item_name: tier.title }).toString();
        newWindow.location = `/test-payfast.html?${qs}`;
      }
      console.error('PayFast checkout error', err);
    }
  };

  // This button triggers the real checkout flow (posts to /api/payfast/checkout and opens returned PayFast form)
  const handleRealPreorder = async (amount: string, item_name: string) => {
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      alert('Popup blocked. Please allow popups for this site or try again.');
      return;
    }

    try {
      const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE.replace(/\/$/, '') : '';
      const apiUrl = apiBase ? `${apiBase}/api/payfast/checkout` : '/api/payfast/checkout';
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, item_name })
      });

      const html = await resp.text();

      if (!resp.ok || !html) {
        // Fallback to local test page if backend fails
        const qs = new URLSearchParams({ amount, item_name }).toString();
        newWindow.location = `/test-payfast.html?${qs}`;
        return;
      }

      newWindow.document.open();
      newWindow.document.write(html);
      newWindow.document.close();
    } catch (err) {
      console.error('Real preorder failed', err);
      const qs = new URLSearchParams({ amount, item_name }).toString();
      newWindow.location = `/test-payfast.html?${qs}`;
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

        <div className="mt-8 text-center">
          <button
            onClick={() => handleRealPreorder('545.00', 'Print First Edition')}
            className="inline-block bg-mtn-yellow text-black px-6 py-3 rounded-lg font-bold"
            title="Opens PayFast sandbox (requires sandbox credentials or public URL)"
          >
            REAL PRE-ORDER (Sandbox)
          </button>
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
      ${isCollector ? 'bg-gradient-to-b from-slate-800 to-black border-tech-purple transform hover:-translate-y-2 shadow-2xl' : 'bg-slate-950/50 border-white/10 hover:border-white/30 hover:bg-slate-900'}
    `}>
      {tier.badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isCollector ? 'bg-tech-purple text-white' : 'bg-mtn-yellow text-black'}`}>
          {tier.badge}
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
          <div className="mb-4 text-sm text-slate-400">Buy a copy (R545) — enter shipping & quantity</div>
          <form ref={formRef} onSubmit={async (e) => {
            e.preventDefault();
            const formEl = formRef.current;
            // client-side validation
            const elems = Array.from((formEl as HTMLFormElement).elements) as any[];
            let cont = true;
            for (let i = 0; i < elems.length; i++) {
              const el = elems[i];
              if (!el.className || el.className.indexOf('shipping') === -1) continue;
              if (el.name === 'line2') continue;
              if (!cont) continue;
              if (el.name === 'country') {
                if (el.selectedIndex === 0) { cont = false; alert('Select a country'); }
              } else {
                if (0 === String(el.value).length || /^\s*$/.test(String(el.value))) { cont = false; alert('Complete all the mandatory address fields'); }
              }
            }
            if (!cont) return;

            setLoading(true);
            const newWindow = window.open('', '_blank');
            if (!newWindow) { alert('Popup blocked. Please allow popups for this site or try again.'); setLoading(false); return; }

            try {
              const payload = { amount: '545', item_name: tier.title, custom_quantity: String(quantity), shipping: { line1, line2, city, region, country, code } };
              const resp = await fetch('/api/payfast/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
              const html = await resp.text();
              if (!resp.ok || !html) {
                const qs = new URLSearchParams({ amount: (545 * quantity).toFixed(2), item_name: tier.title }).toString();
                newWindow.location = `/test-payfast.html?${qs}`;
                setLoading(false);
                return;
              }
              newWindow.document.open(); newWindow.document.write(html); newWindow.document.close();
            } catch (err) {
              console.error(err); newWindow.close(); alert('Could not open PayFast. Please try again.');
            }

            setLoading(false);
          }} className="space-y-4">
            <div className="flex items-center gap-3">
              <label htmlFor="pf-qty" className="text-sm">Quantity:</label>
              <input id="pf-qty" className="w-20 px-3 py-2 text-center bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || '1')))} />
            </div>

            <div className="text-sm font-bold">Shipping Address</div>
            <div className="grid grid-cols-1 gap-2">
              <input className="shipping w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" name="line1" placeholder="Line 1 *" value={line1} onChange={(e) => setLine1(e.target.value)} />
              <input className="shipping w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" name="line2" placeholder="Line 2" value={line2} onChange={(e) => setLine2(e.target.value)} />
              <input className="shipping w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" name="city" placeholder="City *" value={city} onChange={(e) => setCity(e.target.value)} />
              <input className="shipping w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" name="region" placeholder="Province *" value={region} onChange={(e) => setRegion(e.target.value)} />
              <select className="shipping w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">- Select -</option>
                <option value="South Africa">South Africa</option>
                <option value="Botswana">Botswana</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
              <input className="shipping w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-400 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-mtn-yellow" name="code" placeholder="Postal Code *" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>

            <div className="pt-3">
              <button type="submit" disabled={loading} className="w-full py-3 bg-mtn-yellow text-black rounded-lg font-bold">{loading ? 'Processing…' : 'Pay Now'}</button>
            </div>
          </form>
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