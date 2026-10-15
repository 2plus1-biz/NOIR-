import React, { useState } from 'react';
import { Sparkles, Check, Flame, Shield, ArrowRight } from 'lucide-react';
import { Fragrance } from '../data/fragrances';

interface BespokeAtelierProps {
  onCommission: (bespokeFragrance: Fragrance) => void;
}

interface AccordOption {
  id: string;
  name: string;
  sub: string;
  character: string;
}

const BASE_ACCORDS: AccordOption[] = [
  { id: 'b-amber', name: 'Petrified Volcanic Amber', sub: 'Fossilized resin & charcoal', character: 'Heavy Balsamic Warmth' },
  { id: 'b-oud', name: 'Wild Trat Agarwood (Oud)', sub: '15-year aged copper hydro-distillate', character: 'Dark Animalic Wood' },
  { id: 'b-birch', name: 'Charred Cade & Birch Tar', sub: 'Smoked peat & roasted embers', character: 'Dry Smoky Resins' },
  { id: 'b-vetiver', name: 'Bourbon Vetiver & Black Earth', sub: 'Single-terroir root fraction', character: 'Earthy Damp Mineral' }
];

const HEART_ACCORDS: AccordOption[] = [
  { id: 'h-rose', name: 'Damascus Rose Absolute', sub: 'Withered petals & dark altar wine', character: 'Gothic Crimson Floral' },
  { id: 'h-iris', name: 'Smoked Iris Pallida Butter', sub: '6-year cured Florentine orris', character: 'Powdery Suede & Cold Slate' },
  { id: 'h-frankincense', name: 'Green Somalian Hojari Tears', sub: 'Wild tapped mountain resin', character: 'Sacred Meditative Smoke' },
  { id: 'h-tobacco', name: 'Cured Virginia Tobacco Leaf', sub: 'Dark honey & dried prunes', character: 'Rich Leather Amber' }
];

const TOP_ACCORDS: AccordOption[] = [
  { id: 't-bergamot', name: 'Cold-Pressed Bitter Bergamot', sub: 'Calabrian hand-scraped peel', character: 'Sharp Luminous Green' },
  { id: 't-saffron', name: 'Persian Crimson Saffron', sub: 'Khorasan supercritical CO2 extract', character: 'Bittersweet Metallic Radiance' },
  { id: 't-juniper', name: 'Alpine Juniper & Black Pepper', sub: 'Frost-bitten crushed berries', character: 'Pungent Balsamic Frost' }
];

export const BespokeAtelier: React.FC<BespokeAtelierProps> = ({ onCommission }) => {
  const [selectedBase, setSelectedBase] = useState<string>(BASE_ACCORDS[0].id);
  const [selectedHeart, setSelectedHeart] = useState<string>(HEART_ACCORDS[0].id);
  const [selectedTop, setSelectedTop] = useState<string>(TOP_ACCORDS[0].id);
  const [concentration, setConcentration] = useState<'32%' | '38%' | '42%'>('38%');
  const [customName, setCustomName] = useState<string>('Élixir Noir');
  const [monogram, setMonogram] = useState<string>('N.E.');
  const [isSealedWax, setIsSealedWax] = useState<boolean>(true);
  const [isCommissioned, setIsCommissioned] = useState<boolean>(false);

  const baseObj = BASE_ACCORDS.find(b => b.id === selectedBase)!;
  const heartObj = HEART_ACCORDS.find(h => h.id === selectedHeart)!;
  const topObj = TOP_ACCORDS.find(t => t.id === selectedTop)!;

  const basePrice = concentration === '32%' ? 480 : concentration === '38%' ? 540 : 620;
  const waxPrice = isSealedWax ? 30 : 0;
  const totalPrice = basePrice + waxPrice;

  const handleCommission = () => {
    const bespokeItem: Fragrance = {
      id: `bespoke-${Date.now()}`,
      name: customName || 'Bespoke Formulation',
      frenchTitle: `Atelier Privé · Monogram [${monogram || 'N.E.'}]`,
      subtitle: `${baseObj.name} + ${heartObj.name} + ${topObj.name}`,
      volume: '100ml / 3.4 FL. OZ.',
      concentration: `Extrait de Parfum (${concentration} Concentration)`,
      price: totalPrice,
      family: 'Volcanic Amber',
      image: '/src/assets/images/flacon_oud_celeste_1792079332223.jpg',
      year: '2026',
      description: `Client bespoke formulation hand-blended in our private Grasse atelier. Engraved monogram: "${monogram}". Sealed with black beeswax.`,
      olfactiveConcept: `Formulated exclusively for the client. Anchor: ${baseObj.character}. Heart: ${heartObj.character}. Illumination: ${topObj.character}.`,
      topNotes: [topObj.name],
      heartNotes: [heartObj.name],
      baseNotes: [baseObj.name],
      detailedNotes: [],
      sillage: 'Bespoke Signature Intensity',
      longevity: '24+ Hours on Skin',
      soundscapeId: 'track-3'
    };

    onCommission(bespokeItem);
    setIsCommissioned(true);
    setTimeout(() => setIsCommissioned(false), 2400);
  };

  return (
    <section className="w-full bg-[#0B0B0C] text-[#E5E2E3] py-12 md:py-20 border-b border-[#85817C]/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
        
        {/* Header Block */}
        <div className="border-b border-[#85817C]/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6AD85]">
              Privé Master Atelier · Grasse
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F1ECE4]">
              Private Olfactive Formulation
            </h1>
            <p className="font-sans text-sm text-[#85817C] leading-relaxed pt-1">
              Commission an unrepeatable flacon blended drop-by-drop. Select your botanical foundations, adjust oil saturation, and personalize the hand-engraved basalt cap.
            </p>
          </div>

          <div className="p-4 bg-[#141314] border border-[#C6AD85]/20 text-right shrink-0">
            <span className="text-[11px] font-mono text-[#85817C] block uppercase tracking-wider">
              Bespoke Maceration
            </span>
            <span className="font-serif text-xl text-[#F1ECE4]">
              Numbered Edition of One
            </span>
          </div>
        </div>

        {/* 2-Column Formulation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Form Controls (Strictly following Component Spec) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Base Accord Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-sans uppercase tracking-[0.2em] text-[#C6AD85] flex items-center gap-2">
                  <span>01. Subterranean Base Foundation</span>
                </label>
                <span className="text-[11px] text-[#85817C] font-mono">50% Volume Weight</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASE_ACCORDS.map((accord) => {
                  const isSelected = selectedBase === accord.id;
                  return (
                    <div
                      key={accord.id}
                      onClick={() => setSelectedBase(accord.id)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C6AD85] bg-[#1B1A1A] text-[#F1ECE4] shadow-[0_0_20px_rgba(198,173,133,0.1)]'
                          : 'border-[#85817C]/20 bg-[#141314] text-[#85817C] hover:border-[#85817C]/50 hover:text-[#CBC6C0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-[#F1ECE4]">{accord.name}</span>
                        {/* Square Checkbox Indicator (Spec requirement) */}
                        <div className="w-4 h-4 border border-[#85817C] flex items-center justify-center shrink-0 ml-2">
                          {isSelected && <div className="w-2 h-2 bg-[#C6AD85]" />}
                        </div>
                      </div>
                      <p className="text-xs text-[#85817C] mt-1">{accord.sub}</p>
                      <span className="inline-block mt-2 text-[10px] text-[#C6AD85] uppercase tracking-wider font-mono">
                        {accord.character}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Heart Accord Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-sans uppercase tracking-[0.2em] text-[#C6AD85] flex items-center gap-2">
                  <span>02. Visceral Heart Essence</span>
                </label>
                <span className="text-[11px] text-[#85817C] font-mono">35% Volume Weight</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HEART_ACCORDS.map((accord) => {
                  const isSelected = selectedHeart === accord.id;
                  return (
                    <div
                      key={accord.id}
                      onClick={() => setSelectedHeart(accord.id)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C6AD85] bg-[#1B1A1A] text-[#F1ECE4] shadow-[0_0_20px_rgba(198,173,133,0.1)]'
                          : 'border-[#85817C]/20 bg-[#141314] text-[#85817C] hover:border-[#85817C]/50 hover:text-[#CBC6C0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-[#F1ECE4]">{accord.name}</span>
                        <div className="w-4 h-4 border border-[#85817C] flex items-center justify-center shrink-0 ml-2">
                          {isSelected && <div className="w-2 h-2 bg-[#C6AD85]" />}
                        </div>
                      </div>
                      <p className="text-xs text-[#85817C] mt-1">{accord.sub}</p>
                      <span className="inline-block mt-2 text-[10px] text-[#C6AD85] uppercase tracking-wider font-mono">
                        {accord.character}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Top Accord Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-sans uppercase tracking-[0.2em] text-[#C6AD85] flex items-center gap-2">
                  <span>03. Luminous Top Illumination</span>
                </label>
                <span className="text-[11px] text-[#85817C] font-mono">15% Volume Weight</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TOP_ACCORDS.map((accord) => {
                  const isSelected = selectedTop === accord.id;
                  return (
                    <div
                      key={accord.id}
                      onClick={() => setSelectedTop(accord.id)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C6AD85] bg-[#1B1A1A] text-[#F1ECE4] shadow-[0_0_20px_rgba(198,173,133,0.1)]'
                          : 'border-[#85817C]/20 bg-[#141314] text-[#85817C] hover:border-[#85817C]/50 hover:text-[#CBC6C0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm text-[#F1ECE4]">{accord.name}</span>
                        <div className="w-4 h-4 border border-[#85817C] flex items-center justify-center shrink-0 ml-1">
                          {isSelected && <div className="w-2 h-2 bg-[#C6AD85]" />}
                        </div>
                      </div>
                      <span className="inline-block mt-2 text-[9px] text-[#C6AD85] uppercase tracking-wider font-mono">
                        {accord.character}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Formulation Name & Engraving (Strictly following Text Input Spec) */}
            <div className="p-6 bg-[#141314] border border-[#85817C]/20 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6AD85] block">
                04. Nomenclature & Monogram Personalization
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Text Input 1: Custom Elixir Title */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C]">
                    Formula Codename
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Nocturne No. IX"
                    className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#F1ECE4] font-serif text-lg py-2 focus:outline-none placeholder:text-[#85817C]/50 transition-colors"
                  />
                </div>

                {/* Text Input 2: Basalt Monogram Cap */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.18em] text-[#85817C]">
                    Monogram Engraved on Basalt Cap (2-4 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="e.g. N.E."
                    className="w-full bg-transparent border-0 border-b border-[#85817C] focus:border-[#C6AD85] text-[#C6AD85] font-serif text-lg py-2 focus:outline-none uppercase tracking-[0.25em] transition-colors"
                  />
                </div>

              </div>

              {/* Square Checkbox: Wax Seal Packaging (Spec requirement) */}
              <div 
                onClick={() => setIsSealedWax(!isSealedWax)}
                className="flex items-center gap-3 pt-2 cursor-pointer select-none"
              >
                <div className="w-4 h-4 border border-[#85817C] flex items-center justify-center shrink-0">
                  {isSealedWax && <div className="w-2 h-2 bg-[#C6AD85]" />}
                </div>
                <span className="text-xs text-[#CBC6C0] font-sans">
                  Seal the flacon neck with hand-poured black French sealing wax (+ $30 USD)
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Flacon Preview & Commission Terminal */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            <div className="bg-[#141314] border border-[#C6AD85]/30 p-7 space-y-6 shadow-2xl">
              
              <div className="relative aspect-[4/3] bg-gradient-to-b from-[#1C1B1C] to-[#0B0B0C] border border-[#85817C]/20 overflow-hidden">
                <img
                  src="/src/assets/images/flacon_oud_celeste_1792079332223.jpg"
                  alt="Bespoke flacon render"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Live Plaque Overlay Simulation */}
                <div className="absolute inset-x-8 bottom-8 p-3 bg-[#0B0B0C]/85 backdrop-blur-md border border-[#C6AD85]/60 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6AD85]">
                    Atelier Nocturne · Bespoke
                  </p>
                  <p className="font-serif text-lg text-[#F1ECE4] mt-0.5">
                    {customName || 'Bespoke Formulation'}
                  </p>
                  <p className="text-xs font-mono tracking-[0.25em] text-[#C6AD85] mt-1">
                    CAP MONOGRAM: [{monogram || 'N.E.'}]
                  </p>
                </div>
              </div>

              {/* Composition Breakdown */}
              <div className="space-y-3 pt-2 border-t border-[#85817C]/20 text-xs font-sans">
                <div className="flex justify-between text-[#85817C]">
                  <span>Subterranean Base:</span>
                  <span className="text-[#F1ECE4] text-right font-medium">{baseObj.name}</span>
                </div>
                <div className="flex justify-between text-[#85817C]">
                  <span>Heart Core:</span>
                  <span className="text-[#F1ECE4] text-right font-medium">{heartObj.name}</span>
                </div>
                <div className="flex justify-between text-[#85817C]">
                  <span>Top Illumination:</span>
                  <span className="text-[#F1ECE4] text-right font-medium">{topObj.name}</span>
                </div>
                <div className="flex justify-between text-[#85817C]">
                  <span>Black Wax Seal:</span>
                  <span className="text-[#C6AD85] font-medium">{isSealedWax ? 'Included' : 'None'}</span>
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-4 border-t border-[#85817C]/20 flex items-baseline justify-between">
                <div>
                  <span className="font-mono tabular-nums text-3xl text-[#F1ECE4]">
                    ${totalPrice}
                  </span>
                  <span className="text-xs font-sans text-[#85817C] ml-2 tracking-widest uppercase">
                    USD
                  </span>
                </div>
                <span className="text-[11px] text-[#C6AD85] uppercase tracking-wider font-mono">
                  100ml Pure Extrait
                </span>
              </div>

              <button
                onClick={handleCommission}
                className="w-full py-4 bg-[#C6AD85] hover:bg-[#D8C4A5] text-[#0B0B0C] font-sans font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C6AD85]/20 focus-visible:outline-none"
              >
                {isCommissioned ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Commissioned to Vault</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Commission Private Flacon</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#85817C] uppercase tracking-wider">
                Macerated for 45 days before white-glove dispatch
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
