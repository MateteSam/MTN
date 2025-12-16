import React from 'react';
import { Check, Star } from 'lucide-react';
import { PRICING_TIERS } from '../constants';
import { PricingTier } from '../types';
import { startCheckout } from '../lib/checkout';

const PricingSection: React.FC = () => {
  const handlePreorder = async (tier: PricingTier) => {
    await startCheckout({ amount: tier.price, item_name: tier.title });
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
            <PricingCard key={tier.id} tier={tier} onPreorder={handlePreorder} />
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

const PricingCard: React.FC<{ tier: PricingTier; onPreorder: (tier: PricingTier) => void }> = ({ tier, onPreorder }) => {
  const isCollector = tier.id === 'collector';
  
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

      <button
        onClick={() => onPreorder(tier)}
        className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${btnColorMap[tier.color]}`}>
        {tier.cta} ➜
      </button>
    </div>
  );
};

export default PricingSection;