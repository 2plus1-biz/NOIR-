export interface FragranceNote {
  name: string;
  category: 'Top' | 'Heart' | 'Base';
  origin: string;
  extraction: string;
  description: string;
}

export interface Fragrance {
  id: string;
  name: string;
  frenchTitle: string;
  subtitle: string;
  volume: string;
  concentration: string;
  price: number;
  family: 'Resinous Oud' | 'Smoked Embers' | 'Mineral Rose' | 'Volcanic Amber' | 'Dark Woods';
  image: string;
  year: string;
  description: string;
  olfactiveConcept: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  detailedNotes: FragranceNote[];
  sillage: string;
  longevity: string;
  soundscapeId: string;
}

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'ambre-obsidienne',
    name: 'Ambre Obsidienne',
    frenchTitle: 'Extrait de Parfum Volcanique',
    subtitle: 'Golden resin crystallized against frozen basalt stone',
    volume: '100ml / 3.4 FL. OZ.',
    concentration: 'Extrait de Parfum (34% Oil Concentration)',
    price: 360,
    family: 'Volcanic Amber',
    image: '/src/assets/images/hero_nocturne_flacon_1792079331007.jpg',
    year: '2024',
    description: 'A visceral chiaroscuro study in petrified amber resin, charred cade wood, and warm golden labdanum resting upon cold volcanic glass.',
    olfactiveConcept: 'Inspired by raw volcanic fissures in the Auvergne plateau where subterranean heat meets ancient mineral crust. The scent opens with sharp dry bergamot peel before succumbing to a molten heart of benzoin and styrax.',
    topNotes: ['Calabrian Bergamot', 'Smoked Black Pepper', 'Cistus Leaf'],
    heartNotes: ['Siam Benzoin Tears', 'Smoked Birch Tar', 'Spanish Labdanum'],
    baseNotes: ['Petrified Amber Accord', 'Somalian Frankincense', 'Fossilized Charcoal', 'Castoreum Vegan'],
    detailedNotes: [
      {
        name: 'Siam Benzoin Tears',
        category: 'Heart',
        origin: 'Laos Highland Forests',
        extraction: 'Selective Hand-Incised Oleoresin Extraction',
        description: 'Warm, balsamic resin exuding a rich vanilla-cinnamon drydown with medicinal balsamic undertones.'
      },
      {
        name: 'Petrified Amber Accord',
        category: 'Base',
        origin: 'Baltic Sub-surface Bed',
        extraction: 'Dry Destructive Wood Pyrolysis & Resin Maceration',
        description: 'Deep, smoky, fossil-like mineral warmth that lingers on cashmere and skin for over 24 hours.'
      },
      {
        name: 'Calabrian Bergamot',
        category: 'Top',
        origin: 'Reggio Calabria, Italy',
        extraction: 'Cold Pressed Hand-Scraped Peel',
        description: 'Luminous, crisp citrus with an aristocratic green tea nuance that cuts through heavy resins.'
      }
    ],
    sillage: 'Monumental & Lingering',
    longevity: '18+ Hours on Skin',
    soundscapeId: 'track-1'
  },
  {
    id: 'noir-absolu-oud',
    name: 'Noir Absolu (Oud Céleste)',
    frenchTitle: 'Parfum de Haute Obscurité',
    subtitle: 'Centenarian wild agarwood bathed in velvet incense',
    volume: '100ml / 3.4 FL. OZ.',
    concentration: 'Extrait de Parfum (38% Oil Concentration)',
    price: 440,
    family: 'Resinous Oud',
    image: '/src/assets/images/flacon_oud_celeste_1792079332223.jpg',
    year: '2023',
    description: 'An uncompromising monolithic oud. Wild sustainably harvested Trat agarwood tempered by dark patchouli macerated for fifteen years.',
    olfactiveConcept: 'The architectural flacon holds an elixir of unyielding gravity. Pure chiaroscuro: an impenetrable black opening illuminated only by flashes of saffron pistil and crushed bitter almond.',
    topNotes: ['Persian Saffron Threads', 'Bitter Green Almond', 'Armenian Myrrh'],
    heartNotes: ['Wild Trat Agarwood (Oud)', 'Indonesian Patchouli Vintage 2008', 'Cypriol Root'],
    baseNotes: ['Smoked Atlas Cedar', 'Basalt Stone Accord', 'Dark Castoreum', 'Black Civet Accord'],
    detailedNotes: [
      {
        name: 'Wild Trat Agarwood',
        category: 'Heart',
        origin: 'Trat Province, Thailand',
        extraction: 'Hydro-distilled in Copper Stills',
        description: 'Animalic, deep wood smoke with nuances of dried dark fruit, leather saddles, and dark cocoa.'
      },
      {
        name: 'Persian Saffron Threads',
        category: 'Top',
        origin: 'Khorasan Highland Valleys',
        extraction: 'Supercritical CO2 Selective Extraction',
        description: 'Bittersweet metallic leatheriness, lending an aura of imperial radiance to the dark wood core.'
      },
      {
        name: 'Basalt Stone Accord',
        category: 'Base',
        origin: 'Auvergne Volcanic Quarry',
        extraction: 'In-house Tincture & Mineral Molecular Fraction',
        description: 'Cold, rain-soaked volcanic monolith texture providing architectural ballast to the sillage.'
      }
    ],
    sillage: 'Intimate yet Enveloping',
    longevity: '24+ Hours on Skin',
    soundscapeId: 'track-3'
  },
  {
    id: 'rose-des-cendres',
    name: 'Rose des Cendres',
    frenchTitle: 'Artisanal Parfum Noir',
    subtitle: 'Withering damask petals drowned in cold altar ash',
    volume: '100ml / 3.4 FL. OZ.',
    concentration: 'Extrait de Parfum (32% Oil Concentration)',
    price: 380,
    family: 'Mineral Rose',
    image: '/src/assets/images/flacon_rose_cendres_1792079332588.jpg',
    year: '2025',
    description: 'A Gothic anti-floral masterwork. Deep crimson Rosa Damascena dried in apothecary vaults, blended with cold chimney soot and smoked vetiver roots.',
    olfactiveConcept: 'Refusing the candied sweetness of conventional roses, this perfume captures the tragic beauty of petals caught in a dying hearth at twilight.',
    topNotes: ['Dried Damask Rosebud', 'Cold Black Pepper', 'Incense Smoke Mist'],
    heartNotes: ['Turkish Rose Otto Absolute', 'Cold Ash Accord', 'Smoked Birch Bark'],
    baseNotes: ['Bourbon Vetiver Roots', 'Black Leather Accord', 'Dry Ambergris (Ethical)', 'Oakmoss Absolute'],
    detailedNotes: [
      {
        name: 'Turkish Rose Otto Absolute',
        category: 'Heart',
        origin: 'Isparta Mountain Slopes',
        extraction: 'Traditional Steam Distillation in Open Boilers',
        description: 'Velvety, wine-like crimson floral intensity with dark green stems and earthen undertones.'
      },
      {
        name: 'Cold Ash Accord',
        category: 'Heart',
        origin: 'Atelier Hearth Residue',
        extraction: 'Molecular Tincture of Wood Ash & Mineral Salt',
        description: 'Chalky, melancholy mineral quality evoking a medieval cathedral extinguished after midnight mass.'
      },
      {
        name: 'Bourbon Vetiver Roots',
        category: 'Base',
        origin: 'Réunion Island volcanic soil',
        extraction: 'Slow 36-hour steam fraction',
        description: 'Earthy, peaty, roasted hazelnut facets anchoring the floral architecture.'
      }
    ],
    sillage: 'Whispering & Seductive',
    longevity: '16+ Hours on Skin',
    soundscapeId: 'track-2'
  },
  {
    id: 'lumen-au-rocher',
    name: 'Lumen au Rocher',
    frenchTitle: 'Extrait Minéral Lumineux',
    subtitle: 'Liquid sunlight trapped in porous volcanic tufa',
    volume: '100ml / 3.4 FL. OZ.',
    concentration: 'Extrait de Parfum (35% Oil Concentration)',
    price: 395,
    family: 'Volcanic Amber',
    image: '/src/assets/images/flacon_ambre_volcanique_1792079332381.jpg',
    year: '2024',
    description: 'An incandescent nectar of raw immortelle flower, roasted tonka bean absolute, and scorched sandalwood placed upon volcanic magma rock.',
    olfactiveConcept: 'The paradox of warmth emerging from frozen stone. Candlelight flickering against dark glass flacons in an unlit private salon.',
    topNotes: ['Corsican Immortelle Flower', 'Blood Orange Zest', 'Cardamom Pods'],
    heartNotes: ['Golden Honeycomb Absolute', 'Smoked Iris Concrete', 'Spanish Saffron'],
    baseNotes: ['New Caledonian Sandalwood', 'Scorched Tonka Bean', 'Amber Resin', 'Musk Mallow'],
    detailedNotes: [
      {
        name: 'Corsican Immortelle Flower',
        category: 'Top',
        origin: 'Maquis Scrubland, Corsica',
        extraction: 'Steam distillation of yellow sun-dried heads',
        description: 'Warm, syrupy curry-leaf sweetness with sunbaked herbal hay and salty ocean wind facets.'
      },
      {
        name: 'New Caledonian Sandalwood',
        category: 'Base',
        origin: 'Maré Sustainable Plantations',
        extraction: 'Centrifugal steam extraction of heartwood',
        description: 'Creamy, buttery lactonic depth without any synthetic sharp edges.'
      }
    ],
    sillage: 'Radiant & Hypnotic',
    longevity: '20+ Hours on Skin',
    soundscapeId: 'track-1'
  }
];

export interface SoundscapeTrack {
  id: string;
  title: string;
  romanNumeral: string;
  olfactiveMood: string;
  durationSeconds: number;
  fragranceLink: string;
  audioDescription: string;
  ambientType: 'embers' | 'rain' | 'subterranean';
}

export const SOUNDSCAPE_TRACKS: SoundscapeTrack[] = [
  {
    id: 'track-1',
    title: 'Embers & Cistus Labdanum',
    romanNumeral: 'I',
    olfactiveMood: 'Resin & Smoldering Hearth',
    durationSeconds: 248,
    fragranceLink: 'Ambre Obsidienne',
    audioDescription: 'Low warm vinyl crackle, gentle hearth embers, and subterranean acoustic drone tuned to 432 Hz.',
    ambientType: 'embers'
  },
  {
    id: 'track-2',
    title: 'Midnight Rain on Grasse Stone',
    romanNumeral: 'II',
    olfactiveMood: 'Cold Mineral Petrichor & Damp Earth',
    durationSeconds: 312,
    fragranceLink: 'Rose des Cendres',
    audioDescription: 'Subtle rainfall hitting wet stone flags, cold wind whisper, and distant low cello resonance.',
    ambientType: 'rain'
  },
  {
    id: 'track-3',
    title: 'Vault of Smoked Agarwood',
    romanNumeral: 'III',
    olfactiveMood: 'Monolithic Temple Stillness',
    durationSeconds: 285,
    fragranceLink: 'Noir Absolu (Oud Céleste)',
    audioDescription: 'Deep sub-bass acoustic hum, resonant Tibetan bronze bowl, and unhurried sacred breath.',
    ambientType: 'subterranean'
  }
];
