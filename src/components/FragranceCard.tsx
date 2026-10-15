import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { Fragrance } from '../data/fragrances';

interface FragranceCardProps {
  fragrance: Fragrance;
  onSelect: (fragrance: Fragrance) => void;
  onAddToVault: (fragrance: Fragrance) => void;
}

export const FragranceCard: React.FC<FragranceCardProps> = ({
  fragrance,
  onSelect,
  onAddToVault
}) => {
  return (
    <article className="group relative flex flex-col bg-[#141314] border border-[#85817C]/20 hover:border-[#C6AD85]/60 transition-all duration-700 overflow-hidden">
      
      {/* Visual Image Container with dark gradient backdrop */}
      <div 
        onClick={() => onSelect(fragrance)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#1C1B1C] to-[#0B0B0C] cursor-pointer"
      >
        <img
          src={fragrance.image}
          alt={`Bottle of ${fragrance.name}`}
          className="w-full h-full object-cover object-center transition-transform duration-800 ease-out group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />

        {/* Measured Scrim for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-[#0B0B0C]/20 to-transparent pointer-events-none" />

        {/* Quiet Olfactive Family Marker (Unboxed metadata) */}
        <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.25em] text-[#C6AD85] bg-[#0B0B0C]/70 px-2 py-1 border border-[#85817C]/20 backdrop-blur-sm">
          {fragrance.family}
        </div>

        {/* Year of Release */}
        <div className="absolute top-3 right-3 text-[10px] tracking-[0.2em] text-[#85817C] font-mono">
          N° {fragrance.year}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#0B0B0C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(fragrance);
            }}
            className="px-4 py-2 bg-[#1B1A1A] hover:bg-[#2A2A2B] text-[#F1ECE4] border border-[#C6AD85]/50 text-xs tracking-[0.15em] uppercase font-sans flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C6AD85]" />
            <span>Notes Pyramid</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* French Title */}
          <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#85817C]">
            {fragrance.frenchTitle}
          </p>

          {/* Fragrance Name in EB Garamond */}
          <h3 
            onClick={() => onSelect(fragrance)}
            className="font-serif text-xl sm:text-2xl text-[#F1ECE4] group-hover:text-[#C6AD85] transition-colors mt-1 cursor-pointer"
          >
            {fragrance.name}
          </h3>

          {/* Poetic Subtitle */}
          <p className="font-sans text-xs text-[#85817C] mt-1.5 line-clamp-2 leading-relaxed">
            {fragrance.subtitle}
          </p>
        </div>

        {/* Notes Line */}
        <div className="pt-3 border-t border-[#85817C]/15 flex items-center gap-2 text-[11px] text-[#CBC6C0] font-sans truncate">
          <span className="text-[#85817C] uppercase tracking-wider shrink-0 text-[10px]">Notes:</span>
          <span className="truncate">{fragrance.topNotes[0]} · {fragrance.heartNotes[0]} · {fragrance.baseNotes[0]}</span>
        </div>

        {/* Footer: Price & Add to Vault Action */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="font-mono tabular-nums text-base font-normal text-[#F1ECE4]">
              ${fragrance.price}
            </span>
            <span className="text-[11px] font-sans text-[#85817C] ml-1.5 uppercase tracking-wider">
              / 100ml
            </span>
          </div>

          <button
            onClick={() => onAddToVault(fragrance)}
            className="px-3.5 py-2 bg-[#1B1A1A] hover:bg-[#C6AD85] text-[#F1ECE4] hover:text-[#0B0B0C] border border-[#85817C]/30 hover:border-[#C6AD85] text-[11px] tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            aria-label={`Add ${fragrance.name} to vault`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Acquire</span>
          </button>
        </div>
      </div>
    </article>
  );
};
