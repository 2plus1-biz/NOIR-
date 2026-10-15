import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FragranceCard } from './components/FragranceCard';
import { NotesPyramid } from './components/NotesPyramid';
import { BespokeAtelier } from './components/BespokeAtelier';
import { SensoryMoodPlayer } from './components/SensoryMoodPlayer';
import { VaultDrawer, VaultItem } from './components/VaultDrawer';
import { Footer } from './components/Footer';
import { FRAGRANCES, Fragrance } from './data/fragrances';
import { Filter, Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'collection' | 'pyramid' | 'atelier' | 'soundscapes'>('collection');
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance>(FRAGRANCES[0]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All Formulations');
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([
    {
      id: 'default-1',
      fragrance: FRAGRANCES[0],
      size: '100ml',
      unitPrice: FRAGRANCES[0].price,
      quantity: 1
    }
  ]);

  // Filtering fragrances
  const filterOptions = [
    'All Formulations',
    'Volcanic Amber',
    'Resinous Oud',
    'Mineral Rose'
  ];

  const filteredFragrances = selectedFilter === 'All Formulations'
    ? FRAGRANCES
    : FRAGRANCES.filter(f => f.family === selectedFilter);

  // Cart / Vault handlers
  const handleAddToVault = (fragrance: Fragrance, size: string = '100ml', unitPrice: number = fragrance.price, monogram?: string) => {
    setVaultItems(prev => {
      const existing = prev.find(item => item.fragrance.id === fragrance.id && item.size === size && item.monogram === monogram);
      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${fragrance.id}-${size}-${Date.now()}`,
          fragrance,
          size,
          unitPrice,
          quantity: 1,
          monogram
        }
      ];
    });
    setIsVaultOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setVaultItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as VaultItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setVaultItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearVault = () => {
    setVaultItems([]);
  };

  // Inspect notes pyramid handler
  const handleOpenPyramid = (fragrance: Fragrance) => {
    setSelectedFragrance(fragrance);
    setActiveTab('pyramid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soundscape track click jumper
  const handleSelectFragranceNameFromSound = (name: string) => {
    const found = FRAGRANCES.find(f => f.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      handleOpenPyramid(found);
    }
  };

  const totalVaultCount = vaultItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#E5E2E3] flex flex-col font-sans selection:bg-[#C6AD85] selection:text-[#0B0B0C]">
      
      {/* Strict Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vaultCount={totalVaultCount}
        openVault={() => setIsVaultOpen(true)}
      />

      <main className="flex-1">
        {/* TAB 1: COLLECTION (HOME) */}
        {activeTab === 'collection' && (
          <>
            {/* Monumental Chiaroscuro Hero */}
            <HeroSection
              heroFragrance={FRAGRANCES[0]}
              onExplore={() => {
                const el = document.getElementById('featured-collection');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPyramid={handleOpenPyramid}
              onOpenAtelier={() => setActiveTab('atelier')}
            />

            {/* Featured Collection Grid */}
            <section id="featured-collection" className="py-16 md:py-24 border-b border-[#85817C]/20 bg-[#0B0B0C]">
              <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-10">
                
                {/* Section Header & Olfactory Taxonomy Filter Chips */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#85817C]/20 pb-8">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C6AD85]">
                      Édition Numérotée · Artisanal Extraits
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#F1ECE4]">
                      The Monolith Flacon Series
                    </h2>
                    <p className="font-sans text-xs text-[#85817C] max-w-lg leading-relaxed">
                      Macerated in subterranean stone cellars for over 5,000 hours. Each formulation is hand-poured into razor-sharp obsidian glass flacons.
                    </p>
                  </div>

                  {/* Olfactory Taxonomy Filter Chips (Strictly adhering to Chips & Note Tags Spec) */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {filterOptions.map(option => {
                      const isSelected = selectedFilter === option;
                      return (
                        <button
                          key={option}
                          onClick={() => setSelectedFilter(option)}
                          className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'border border-[#C6AD85] text-[#F1ECE4] bg-[#C6AD85]/10 shadow-[0_0_15px_rgba(198,173,133,0.15)]'
                              : 'bg-transparent border border-[#85817C]/25 text-[#85817C] hover:border-[#85817C]/60 hover:text-[#CBC6C0]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-Column Product Grid (desktop 1200px+) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredFragrances.map(fragrance => (
                    <FragranceCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      onSelect={handleOpenPyramid}
                      onAddToVault={(f) => handleAddToVault(f, '100ml', f.price)}
                    />
                  ))}
                </div>

                {/* Editorial Craftsmanship Callout */}
                <div className="p-8 md:p-12 bg-[#141314] border border-[#C6AD85]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
                  <div className="lg:col-span-8 space-y-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C6AD85]">
                      Maison de Maceration
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F1ECE4]">
                      Every flacon is an unyielding architectural monolith.
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#CBC6C0] leading-relaxed max-w-2xl">
                      We reject commercial compromises: no synthetic fixatives, no mass manufacturing, and no rounded contours. Our bottles feature sharp 90-degree corners sculpted to feel like cold volcanic basalt.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <button
                      onClick={() => setActiveTab('atelier')}
                      className="px-6 py-3.5 bg-transparent border border-[#C6AD85] hover:bg-[#C6AD85] text-[#F1ECE4] hover:text-[#0B0B0C] text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      Enter Bespoke Atelier &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* In-Line Sensory Audio & Mood Player */}
            <SensoryMoodPlayer
              onSelectFragranceName={handleSelectFragranceNameFromSound}
            />
          </>
        )}

        {/* TAB 2: NOTES PYRAMID (DETAILED PDP EXPLORER) */}
        {activeTab === 'pyramid' && (
          <NotesPyramid
            fragrance={selectedFragrance}
            allFragrances={FRAGRANCES}
            onSelectFragrance={setSelectedFragrance}
            onAddToVault={handleAddToVault}
            onBackToCollection={() => setActiveTab('collection')}
          />
        )}

        {/* TAB 3: BESPOKE ATELIER (CUSTOM FORMULATION LAB) */}
        {activeTab === 'atelier' && (
          <BespokeAtelier
            onCommission={(bespoke) => handleAddToVault(bespoke, '100ml', bespoke.price, bespoke.frenchTitle)}
          />
        )}

        {/* TAB 4: SENSORY RESONANCE (DEDICATED FULL SOUNDSCAPE VIEW) */}
        {activeTab === 'soundscapes' && (
          <div className="py-12">
            <SensoryMoodPlayer
              onSelectFragranceName={handleSelectFragranceNameFromSound}
            />
            {/* Ambient Salon Notes */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mt-12">
              <div className="p-8 bg-[#141314] border border-[#85817C]/25 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-serif text-lg text-[#F1ECE4]">432 Hz Tuning</h4>
                  <p className="font-sans text-xs text-[#85817C] mt-1.5 leading-relaxed">
                    Acoustic frequencies mathematically aligned to the harmonic overtone series, promoting deep olfactive receptivity.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#F1ECE4]">Chiaroscuro Immersion</h4>
                  <p className="font-sans text-xs text-[#85817C] mt-1.5 leading-relaxed">
                    Dim external salon lighting to minimal candle power before evaluating high-concentration extraits.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#F1ECE4]">Cellar Provenance</h4>
                  <p className="font-sans text-xs text-[#85817C] mt-1.5 leading-relaxed">
                    Audio recordings sourced from the historic cellars and stone bastides of Haute-Provence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart / Private Flacon Vault Drawer */}
      <VaultDrawer
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        items={vaultItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearVault={handleClearVault}
      />

      {/* Restrained Editorial Footer */}
      <Footer />

    </div>
  );
}
