import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'collection' | 'pyramid' | 'atelier' | 'soundscapes';
  setActiveTab: (tab: 'collection' | 'pyramid' | 'atelier' | 'soundscapes') => void;
  vaultCount: number;
  openVault: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  vaultCount,
  openVault
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#85817C]/20 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single element Brand Wordmark (EB Garamond display face, strictly single element) */}
        <button
          onClick={() => setActiveTab('collection')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] uppercase text-[#F1ECE4] group-hover:text-[#C6AD85] transition-colors whitespace-nowrap shrink-0">
            NOCTURNE ESSENCE
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-xs font-medium tracking-[0.2em] uppercase text-[#85817C]">
          <button
            onClick={() => setActiveTab('collection')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b ${
              activeTab === 'collection'
                ? 'text-[#F1ECE4] border-[#C6AD85]'
                : 'text-[#85817C] border-transparent hover:text-[#F1ECE4] hover:border-[#85817C]/50'
            }`}
          >
            Collection
          </button>

          <button
            onClick={() => setActiveTab('pyramid')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b ${
              activeTab === 'pyramid'
                ? 'text-[#F1ECE4] border-[#C6AD85]'
                : 'text-[#85817C] border-transparent hover:text-[#F1ECE4] hover:border-[#85817C]/50'
            }`}
          >
            Notes Pyramid
          </button>

          <button
            onClick={() => setActiveTab('atelier')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b ${
              activeTab === 'atelier'
                ? 'text-[#F1ECE4] border-[#C6AD85]'
                : 'text-[#85817C] border-transparent hover:text-[#F1ECE4] hover:border-[#85817C]/50'
            }`}
          >
            Bespoke Atelier
          </button>

          <button
            onClick={() => setActiveTab('soundscapes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b ${
              activeTab === 'soundscapes'
                ? 'text-[#F1ECE4] border-[#C6AD85]'
                : 'text-[#85817C] border-transparent hover:text-[#F1ECE4] hover:border-[#85817C]/50'
            }`}
          >
            Resonance
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={openVault}
            className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-[#1B1A1A] hover:bg-[#201F20] border border-[#C6AD85]/35 hover:border-[#C6AD85] transition-all duration-300 text-[#F1ECE4] cursor-pointer focus-visible:outline-none"
            aria-label="View Flacon Vault"
          >
            <ShoppingBag className="w-4 h-4 text-[#C6AD85] group-hover:scale-105 transition-transform" />
            <span className="font-sans text-xs tracking-[0.18em] uppercase font-medium whitespace-nowrap">
              Vault ({vaultCount})
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile subnav bar for compact viewports */}
      <div className="md:hidden flex items-center justify-around px-4 py-2 bg-[#141314] border-t border-[#85817C]/15 text-[11px] tracking-[0.15em] uppercase text-[#85817C]">
        <button
          onClick={() => setActiveTab('collection')}
          className={`py-1 ${activeTab === 'collection' ? 'text-[#C6AD85] font-semibold' : ''}`}
        >
          Flacons
        </button>
        <button
          onClick={() => setActiveTab('pyramid')}
          className={`py-1 ${activeTab === 'pyramid' ? 'text-[#C6AD85] font-semibold' : ''}`}
        >
          Pyramid
        </button>
        <button
          onClick={() => setActiveTab('atelier')}
          className={`py-1 ${activeTab === 'atelier' ? 'text-[#C6AD85] font-semibold' : ''}`}
        >
          Atelier
        </button>
        <button
          onClick={() => setActiveTab('soundscapes')}
          className={`py-1 ${activeTab === 'soundscapes' ? 'text-[#C6AD85] font-semibold' : ''}`}
        >
          Resonance
        </button>
      </div>
    </header>
  );
};
