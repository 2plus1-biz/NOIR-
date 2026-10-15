import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Fragrance } from '../data/fragrances';

interface HeroSectionProps {
  heroFragrance: Fragrance;
  onExplore: () => void;
  onOpenPyramid: (fragrance: Fragrance) => void;
  onOpenAtelier: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroFragrance,
  onExplore,
  onOpenPyramid,
  onOpenAtelier
}) => {
  return (
    <section className="relative w-full pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[#85817C]/20 bg-[#0B0B0C] overflow-hidden">
      {/* Subtle ambient chiaroscuro radial glow */}
      <div 
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #C6AD85 0%, rgba(198, 173, 133, 0) 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Split Grid: Asymmetric 5-column descriptive block vs 7-column chiaroscuro visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial & Typography */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 z-10">
            
            {/* Unboxed Metadata Kicker (Anti-slop zero pill rule) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C6AD85]">
              <span>Haute Parfumerie</span>
              <span className="text-[#85817C]" aria-hidden="true">·</span>
              <span>Grasse & Auvergne</span>
              <span className="text-[#85817C]" aria-hidden="true">·</span>
              <span>Anno 2026</span>
            </div>

            {/* Monumental Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1ECE4] leading-[1.12] tracking-[0.04em] [text-wrap:balance]">
              Extracts of visceral shadow and luminous resin.
            </h1>

            {/* Editorial Description */}
            <p className="font-sans font-light text-base sm:text-lg text-[#CBC6C0] leading-relaxed max-w-xl">
              An unyielding study in dark perfumery. Hand-distilled botanical resins, ancient agarwood macerations, and cold mineral ashes captured within razor-cut monolithic flacons.
            </p>

            {/* Olfactive Notes Preview in clean unboxed typography */}
            <div className="pt-2 pb-2 border-y border-[#85817C]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.18em] uppercase text-[#85817C]">
              <span className="text-[#C6AD85]">Key Accords:</span>
              <span>Siam Benzoin</span>
              <span>·</span>
              <span>Petrified Amber</span>
              <span>·</span>
              <span>Charred Birch</span>
              <span>·</span>
              <span>Black Bergamot</span>
            </div>

            {/* Dual CTAs adhering to Component Spec */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              {/* Primary Action Button: Solid Champagne Gold with Obsidian text */}
              <button
                onClick={onExplore}
                className="px-8 py-4 bg-[#C6AD85] hover:bg-[#D8C4A5] text-[#0B0B0C] font-sans font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-[#C6AD85]/20 focus-visible:outline-none"
              >
                <span>Explore The Flacons</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Ghost Action Button: Transparent with 1px gold border and ivory text */}
              <button
                onClick={() => onOpenPyramid(heroFragrance)}
                className="px-8 py-4 bg-transparent hover:bg-[#C6AD85]/10 border border-[#C6AD85]/35 hover:border-[#C6AD85] text-[#F1ECE4] font-sans font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none"
              >
                <Compass className="w-4 h-4 text-[#C6AD85]" />
                <span>Inspect Notes Pyramid</span>
              </button>
            </div>
          </div>

          {/* Right Column: Chiaroscuro Product Showcase Container */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg group">
              
              {/* 1px Hairline Gold Border Outline with Ambient Shadow */}
              <div className="relative bg-[#141314] border border-[#C6AD85]/20 p-2 sm:p-3 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-[#C6AD85]/60 group-hover:shadow-[0_12px_48px_-12px_rgba(198,173,133,0.18)]">
                
                {/* Visual Asset Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#1C1B1C] to-[#0B0B0C]">
                  <img
                    src={heroFragrance.image}
                    alt={`${heroFragrance.name} flacon on black obsidian stone`}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Monolithic Title Inset */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs">
                    <div>
                      <p className="font-serif text-lg sm:text-xl text-[#F1ECE4] tracking-wide">
                        {heroFragrance.name}
                      </p>
                      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C6AD85]">
                        {heroFragrance.frenchTitle}
                      </p>
                    </div>
                    <p className="font-mono tabular-nums text-sm text-[#F1ECE4] tracking-wider">
                      ${heroFragrance.price} USD
                    </p>
                  </div>
                </div>

                {/* Subtle caption beneath card */}
                <div className="pt-3 pb-1 px-2 flex items-center justify-between text-[11px] font-sans text-[#85817C] uppercase tracking-[0.18em]">
                  <span>Formula No. 07 · Auvergne Series</span>
                  <span>Extrait Pure 34%</span>
                </div>
              </div>

              {/* Decorative Basalt coordinate badge strictly editorial */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#85817C] px-1 font-sans">
                <span className="tracking-[0.15em]">Flacon: Monolith Smoked Glass</span>
                <button
                  onClick={onOpenAtelier}
                  className="text-[#C6AD85] hover:text-[#D8C4A5] tracking-[0.15em] uppercase text-[11px] underline underline-offset-4 cursor-pointer"
                >
                  Commission Bespoke Cap &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI/Provenance Strip below the split */}
        <div className="mt-16 md:mt-24 pt-10 border-t border-[#85817C]/20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-[#F1ECE4] font-normal tracking-wide">
              34% – 40%
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#85817C] mt-1.5">
              Extrait Oil Concentration
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl sm:text-3xl text-[#F1ECE4] font-normal tracking-wide">
              15-Year
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#85817C] mt-1.5">
              Vintage Maceration
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl sm:text-3xl text-[#F1ECE4] font-normal tracking-wide">
              Single Terroir
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#85817C] mt-1.5">
              Grasse & Auvergne Basalt
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl sm:text-3xl text-[#F1ECE4] font-normal tracking-wide">
              Zero Synthetics
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#85817C] mt-1.5">
              Raw Botanical Distillates
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
