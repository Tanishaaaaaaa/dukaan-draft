import { SampleProduct } from '../types.ts';

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'walnut-coasters',
    title: 'Kashmiri Walnut Wood Coasters',
    category: 'Handicraft & Home Decor',
    data: {
      productName: 'Handmade Kashmiri Walnut Wood Coaster Set (Set of 6)',
      price: '899',
      features: `Set of 6 square coasters (4x4 inches) with a matching handcrafted storage box.
Made from seasoned Kashmiri walnut wood carved by master artisans in Srinagar with traditional Chinar leaf motifs.
Natural organic beeswax finish. Water-resistant protective sealant on top.
Care: Wipe with a soft damp cloth, do not submerge in water or place in dishwasher.`,
      platform: 'both',
      language: 'English',
      tone: 'Premium',
    },
  },
  {
    id: 'yellow-mustard-oil',
    title: 'Cold-Pressed Yellow Mustard Oil',
    category: 'Farm Produce & Food',
    data: {
      productName: 'Organic Kachi Ghani Yellow Mustard Oil (1 Litre)',
      price: '349',
      features: `100% pure cold-pressed oil made from Rajasthan yellow mustard seeds.
Extracted in a traditional wooden kohlu at under 45°C to preserve natural nutrients and aroma.
Zero chemicals, zero adulteration, unrefined, and single-origin.
Packed in BPA-free UV-protected amber bottle. High smoke point suitable for everyday Indian cooking and tadka.`,
      platform: 'both',
      language: 'Hinglish',
      tone: 'Friendly',
    },
  },
];
