import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-slate-500 py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand/Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">300 Million Connections</h4>
            <p className="text-sm leading-relaxed">
              An independent work of historical research and nonfiction. 
              Not commissioned by or affiliated with MTN Group or its subsidiaries.
            </p>
          </div>

          {/* Assurance */}
          <div className="space-y-4">
             <h4 className="text-white font-bold uppercase tracking-wider">Assurance</h4>
             <p className="text-sm leading-relaxed">
               Preorders processed immediately. Full refunds available before shipping if publication date changes.
             </p>
             <div className="flex items-center gap-2 text-mtn-yellow text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Secure Checkout
             </div>
          </div>

          {/* Press */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">Media Enquiries</h4>
            <p className="text-sm leading-relaxed">
              For interviews and review copies (available Dec 2025):
            </p>
            <a href="mailto:media@godlivesinsandton.store" className="flex items-center gap-2 text-white hover:text-mtn-yellow transition-colors">
              <Mail className="w-4 h-4" /> media@godlivesinsandton.store
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