import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [dispatchEmail, setDispatchEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dispatchEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setDispatchEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="w-full bg-[#0B0B0C] border-t border-[#85817C]/20 text-[#85817C] pt-16 pb-12 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-16">
        
        {/* Top Tier: Brand Statement & Private Salon Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#F1ECE4] block">
              NOCTURNE ESSENCE
            </span>
            <p className="font-light text-sm text-[#CBC6C0] max-w-md leading-relaxed">
              Maison de haute parfumerie artisanale. Hand-distilling botanical resins, petrified woods, and dark damask florals under chiaroscuro discipline in Paris & Grasse.
            </p>
            <p className="text-xs text-[#85817C] font-mono tracking-wider">
              PARIS · GRASSE · AUVERGNE · TOKYO
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C6AD85]">
              Private Salons & Ateliers
            </p>
            <div className="text-xs space-y-1 text-[#CBC6C0] leading-relaxed">
              <p className="text-[#F1ECE4]">Salon Place Vendôme</p>
              <p>14 Place Vendôme, 75001 Paris</p>
              <p className="text-[#85817C] text-[11px]">By private appointment only</p>
            </div>
            <div className="text-xs space-y-1 text-[#CBC6C0] leading-relaxed pt-2">
              <p className="text-[#F1ECE4]">Laboratoire des Essences</p>
              <p>Route des Bastides, 06130 Grasse</p>
            </div>
          </div>

          {/* Private Gazette Subscription */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C6AD85]">
              The Olfactive Dispatch
            </p>
            <p className="text-xs text-[#CBC6C0] leading-relaxed">
              Receive confidential notices regarding vintage cellar unsealings and limited single-cask extractions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center border-b border-[#85817C] focus-within:border-[#C6AD85] transition-colors py-1">
                <input
                  type="email"
                  required
                  value={dispatchEmail}
                  onChange={(e) => setDispatchEmail(e.target.value)}
                  placeholder="Enter confidential email..."
                  className="w-full bg-transparent text-[#F1ECE4] font-serif text-sm py-1.5 focus:outline-none placeholder:text-[#85817C]/50"
                />
                <button
                  type="submit"
                  className="p-1.5 text-[#C6AD85] hover:text-[#D8C4A5] transition-colors cursor-pointer"
                  aria-label="Subscribe to dispatch"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#C6AD85]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Your address has been inscribed into our registry.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Tier: Legal & Provenance */}
        <div className="pt-8 border-t border-[#85817C]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider uppercase text-[#85817C]">
          <p>© {new Date().getFullYear()} Nocturne Essence Haute Parfumerie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Sustainably Wild-Harvested</span>
            <span>·</span>
            <span>Zero Synthetic Fixatives</span>
            <span>·</span>
            <span>Strict 90° Monoliths</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
