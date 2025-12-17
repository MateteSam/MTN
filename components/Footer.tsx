import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer text-slate-500 py-16">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-3 gap-12 mb-16 items-center">
          
          {/* Brand */}
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="site logo" className="footer-logo" />
            <div>
              <h4 className="text-white font-bold">300 Million Connections</h4>
              <p className="text-sm text-slate-400">Documenting the making of modern Africa through the stories of its builders.</p>
            </div>
          </div>

          {/* Assurance */}
          <div className="space-y-4">
             <h4 className="text-white font-bold uppercase tracking-wider">Assurance</h4>
             <p className="text-sm leading-relaxed">
               Pre-orders processed immediately. Full refunds available before shipping if publication date changes.
             </p>
             <div className="flex items-center gap-2 text-mtn-yellow text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Secure Checkout
             </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <a href="mailto:orders@300millionconnections.store" className="flex items-center gap-2 text-white hover:text-mtn-yellow transition-colors">
              <Mail className="w-4 h-4" /> orders@300millionconnections.store
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Dr. Charles Wirsuiy Snr. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;