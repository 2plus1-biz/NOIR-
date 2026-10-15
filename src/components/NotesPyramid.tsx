import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Check, ShieldCheck, Droplets, Clock, Wind } from 'lucide-react';
import { Fragrance, FragranceNote } from '../data/fragrances';

interface NotesPyramidProps {
  fragrance: Fragrance;
  allFragrances: Fragrance[];
  onSelectFragrance: (f: Fragrance) => void;
  onAddToVault: (fragrance: Fragrance, size: string, price: number) => void;
  onBackToCollection: () => void;
}

export const NotesPyramid: React.FC<NotesPyramidProps> = ({
  fragrance,
  allFragrances,
  onSelectFragrance,
  onAddToVault,
  onBackToCollection
}) => {
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | '250ml'>('100ml');
  const [activeNoteName, setActiveNoteName] = useState<string>(fragrance.detailedNotes[0]?.name || fragrance.topNotes[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Size calculations
  const priceMultiplier = selectedSize === '50ml' ? 0.65 : selectedSize === '100ml' ? 1.0 : 2.1;
  const currentPrice = Math.round(fragrance.price * priceMultiplier);

  // Active note detail lookup
  const currentNoteDetail: FragranceNote = fragrance.detailedNotes.find(
    (n) => n.name.toLowerCase() === activeNoteName.toLowerCase()
  ) || {
    name: activeNoteName,
    category: fragrance.topNotes.includes(activeNoteName) ? 'Top' : fragrance.heartNotes.includes(activeNoteName) ? 'Heart' : 'Base',
    origin: 'Artisanal Single-Terroir Extraction',
    extraction: 'Supercritical CO2 Distillation',
    description: 'An integral raw element composed at high concentration to dictate the olfactive sillage and emotional resonance.'
  };

  const handleAdd = () => {
    onAddToVault(fragrance, selectedSize, currentPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <section className="w-full bg-[#0B0B0C] text-[#E5E2E3] py-10 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-[#85817C]/20 pb-5">
          <button
            onClick={onBackToCollection}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#85817C] hover:text-[#C6AD85] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Vault Collection</span>
          </button>

          {/* Fragrance Selector Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-[#85817C] hidden sm:inline">
              Formulation:
            </span>
            <select
              value={fragrance.id}
              onChange={(e) => {
                const found = allFragrances.find((f) => f.id === e.target.value);
                if (found) onSelectFragrance(found);
              }}
              className="bg-[#1B1A1A] border border-[#85817C]/30 text-[#F1ECE4] px-3 py-1.5 text-xs font-serif tracking-wider focus:outline-none focus:border-[#C6AD85] cursor-pointer"
            >
              {allFragrances.map((f) => (
                <option key={f.id} value={f.id} className="bg-[#141314] text-[#F1ECE4]">
                  {f.name} — ${f.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main PDP Grid: Left Gallery + Tripartite Notes Pyramid | Right Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (7 cols): Flacon Image & Tripartite Pyramid Diagram */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Flacon Visual Hero */}
            <div className="relative aspect-[16/10] bg-[#141314] border border-[#C6AD85]/20 overflow-hidden shadow-2xl group">
              <img
                src={fragrance.image}
                alt={fragrance.name}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-[#0B0B0C]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C6AD85] font-sans">
                    {fragrance.frenchTitle}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#F1ECE4] mt-1">
                    {fragrance.name}
                  </h1>
                </div>
                <div className="text-right">
                  <span className="font-mono tabular-nums text-lg text-[#F1ECE4]">
                    ${currentPrice} USD
                  </span>
                  <p className="text-[11px] text-[#85817C] uppercase tracking-wider">
                    {selectedSize} / {fragrance.concentration.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* DEDICATED TRIPARTITE NOTES PYRAMID COMPONENT (from design spec!) */}
            <div className="p-8 bg-[#141314] border border-[#C6AD85]/20 shadow-xl space-y-8">
              <div className="border-b border-[#C6AD85]/15 pb-4">
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C6AD85]">
                  Olfactive Architecture
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F1ECE4] mt-1">
                  The Notes Pyramid
                </h2>
                <p className="font-sans text-xs text-[#85817C] mt-2 leading-relaxed">
                  Separated by gossamer 1px lines, these raw botanical tinctures and aged resinous fractions unravel sequentially across skin contact. Click any note to inspect provenance.
                </p>
              </div>

              {/* The Tripartite Layers */}
              <div className="space-y-6">
                
                {/* 1. TOP NOTES (First 15 minutes of volatility) */}
                <div className="space-y-3 pb-6 border-b border-[rgba(198,173,133,0.12)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-[#F1ECE4] tracking-wide flex items-center gap-2">
                      <Wind className="w-4 h-4 text-[#C6AD85]" />
                      <span>Top Notes · Luminous Volatility</span>
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#85817C] font-mono">
                      0 – 20 Mins
                    </span>
                  </div>

                  {/* Taxonomy Badges / Note Chips */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {fragrance.topNotes.map((note) => {
                      const isSelected = activeNoteName.toLowerCase() === note.toLowerCase();
                      return (
                        <button
                          key={note}
                          onClick={() => setActiveNoteName(note)}
                          className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'border border-[#C6AD85] text-[#F1ECE4] bg-[#C6AD85]/10 shadow-[0_0_15px_rgba(198,173,133,0.15)]'
                              : 'bg-transparent border border-[#85817C]/25 text-[#85817C] hover:border-[#85817C]/60 hover:text-[#CBC6C0]'
                          }`}
                        >
                          {note}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. HEART NOTES (2 to 6 hours core identity) */}
                <div className="space-y-3 pb-6 border-b border-[rgba(198,173,133,0.12)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-[#F1ECE4] tracking-wide flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-[#C6AD85]" />
                      <span>Heart Notes · Visceral Core</span>
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#85817C] font-mono">
                      20 Mins – 6 Hours
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {fragrance.heartNotes.map((note) => {
                      const isSelected = activeNoteName.toLowerCase() === note.toLowerCase();
                      return (
                        <button
                          key={note}
                          onClick={() => setActiveNoteName(note)}
                          className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'border border-[#C6AD85] text-[#F1ECE4] bg-[#C6AD85]/10 shadow-[0_0_15px_rgba(198,173,133,0.15)]'
                              : 'bg-transparent border border-[#85817C]/25 text-[#85817C] hover:border-[#85817C]/60 hover:text-[#CBC6C0]'
                          }`}
                        >
                          {note}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. BASE NOTES (Deep 12-24 hour resinous foundation) */}
                <div className="space-y-3 pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-[#F1ECE4] tracking-wide flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C6AD85]" />
                      <span>Base Notes · Ancient Resonance</span>
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#85817C] font-mono">
                      6 – 24+ Hours
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {fragrance.baseNotes.map((note) => {
                      const isSelected = activeNoteName.toLowerCase() === note.toLowerCase();
                      return (
                        <button
                          key={note}
                          onClick={() => setActiveNoteName(note)}
                          className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'border border-[#C6AD85] text-[#F1ECE4] bg-[#C6AD85]/10 shadow-[0_0_15px_rgba(198,173,133,0.15)]'
                              : 'bg-transparent border border-[#85817C]/25 text-[#85817C] hover:border-[#85817C]/60 hover:text-[#CBC6C0]'
                          }`}
                        >
                          {note}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* ACTIVE NOTE INSPECTOR CARD */}
              <div className="mt-6 p-5 bg-[#1B1A1A] border border-[#C6AD85]/30">
                <div className="flex items-center justify-between border-b border-[#85817C]/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6AD85] bg-[#0B0B0C] px-2 py-0.5 border border-[#85817C]/20">
                      {currentNoteDetail.category} Note
                    </span>
                    <span className="font-serif text-base text-[#F1ECE4]">
                      {currentNoteDetail.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#85817C]">
                    Origin: {currentNoteDetail.origin}
                  </span>
                </div>

                <div className="pt-3 text-xs text-[#CBC6C0] font-sans leading-relaxed space-y-2">
                  <p>{currentNoteDetail.description}</p>
                  <p className="text-[11px] text-[#85817C]">
                    <span className="text-[#C6AD85] uppercase tracking-wider">Method: </span>
                    {currentNoteDetail.extraction}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (5 cols): Contiguous Purchase Module (PDP Rule) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            <div className="bg-[#141314] border border-[#85817C]/25 p-8 space-y-6">
              
              {/* Product Header */}
              <div className="border-b border-[#85817C]/20 pb-6 space-y-2">
                <div className="text-xs uppercase tracking-[0.2em] text-[#C6AD85]">
                  Extrait de Parfum · Pure Essence
                </div>
                <h2 className="font-serif text-3xl text-[#F1ECE4]">
                  {fragrance.name}
                </h2>
                <p className="text-xs text-[#85817C] italic font-serif">
                  "{fragrance.subtitle}"
                </p>
              </div>

              {/* Price & Availability */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-mono tabular-nums text-3xl text-[#F1ECE4]">
                    ${currentPrice}
                  </span>
                  <span className="text-xs font-sans text-[#85817C] ml-2 tracking-widest uppercase">
                    USD
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#C6AD85]">
                  <span className="w-1.5 h-1.5 bg-[#C6AD85]" />
                  <span className="tracking-[0.15em] uppercase text-[11px]">Cellar Matured In Stock</span>
                </div>
              </div>

              {/* Flacon Volume Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-sans uppercase tracking-[0.2em] text-[#85817C] block">
                  Select Flacon Architecture & Volume:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['50ml', '100ml', '250ml'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 text-xs uppercase tracking-[0.15em] font-sans border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#C6AD85] bg-[#C6AD85]/10 text-[#F1ECE4]'
                          : 'border-[#85817C]/20 bg-[#1B1A1A] text-[#85817C] hover:border-[#85817C]/60 hover:text-[#CBC6C0]'
                      }`}
                    >
                      <span className="block font-medium">{size}</span>
                      <span className="block text-[10px] text-[#85817C] font-mono mt-0.5">
                        ${Math.round(fragrance.price * (size === '50ml' ? 0.65 : size === '100ml' ? 1.0 : 2.1))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formula Metrics */}
              <div className="space-y-2 py-4 border-y border-[#85817C]/20 text-xs font-sans text-[#85817C]">
                <div className="flex justify-between py-1">
                  <span>Concentration</span>
                  <span className="text-[#F1ECE4] font-medium">{fragrance.concentration}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sillage Trail</span>
                  <span className="text-[#F1ECE4] font-medium">{fragrance.sillage}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Skin Longevity</span>
                  <span className="text-[#F1ECE4] font-medium">{fragrance.longevity}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Apothecary Origin</span>
                  <span className="text-[#F1ECE4] font-medium">Grasse, France</span>
                </div>
              </div>

              {/* Contiguous Primary Buy CTA */}
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-[#C6AD85] hover:bg-[#D8C4A5] text-[#0B0B0C] font-sans font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C6AD85]/20 focus-visible:outline-none"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Private Vault</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Acquire Flacon (${currentPrice} USD)</span>
                  </>
                )}
              </button>

              {/* Bespoke Assurance */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#85817C] tracking-wider uppercase font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6AD85]" />
                <span>Individually numbered & sealed with black wax</span>
              </div>

            </div>

            {/* Olfactive Concept Editorial Narrative */}
            <div className="p-6 bg-[#141314] border border-[#85817C]/15 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6AD85] block">
                The Formulation Journal
              </span>
              <p className="font-sans text-xs text-[#CBC6C0] leading-relaxed">
                {fragrance.olfactiveConcept}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
