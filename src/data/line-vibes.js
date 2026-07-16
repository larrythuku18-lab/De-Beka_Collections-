// Shared LineVibe definitions used by both the VibeHero (auto-rotating intro)
// and the LineVibeSection (detailed card grid). Each component adds its own
// extra fields (gradient, shadow for VibeHero; no extras for the section).

export const LINE_VIBES = [
  {
    key: 'women',
    name: 'Women',
    subtitle: 'Art Nouveau',
    tagline: 'Elegant · Ornate · Fluid · Jewel-Toned',
    description:
      "Inspired by the flowing curves and intricate ornamentation of Art Nouveau, our Women's line celebrates ornate beauty with jewel-toned accents and gold-leaf detailing. Think stained-glass mosaics, organic botanical motifs, and timeless elegance that whispers before it speaks.",
    mood: 'An intricate Art Nouveau mosaic — deep jewel-toned colors, gold leaf tesserae, and vibrant organic patterns.',
    moodShort: 'An intricate Art Nouveau mosaic — jewel-toned colors, gold leaf tesserae, and vibrant organic patterns.',
    palette: ['#8a1a5e', '#c9a24b', '#6b2fa0', '#d4a0c0'],
    icon: '🌸',
  },
  {
    key: 'men',
    name: 'Men & Unisex',
    subtitle: 'Geometric Luxury',
    tagline: 'Bold · Structured · Modern · Grounded',
    description:
      'A sophisticated fusion of bold geometric architecture and organic natural harmony. Byzantine-inspired angular patterns in deep navy and brushed gold intertwine with earthy sage greens and warm terracotta — structured enough for the modern man, harmonious enough for everyone.',
    mood: 'A bold geometric mosaic — polished slate, hammered copper, and matte marble — intertwined with flowing foliage.',
    moodShort: 'A bold geometric mosaic — polished slate, hammered copper, and matte marble — with flowing foliage.',
    palette: ['#1a3a5c', '#c9a24b', '#c46a4a', '#8a7f6e'],
    icon: '◆',
  },
  {
    key: 'kids',
    name: 'Kids',
    subtitle: 'Playful Gaudí',
    tagline: 'Playful · Whimsical · Colorful · Joyful',
    description:
      "Inspired by Gaudí's whimsical, rainbow-bright mosaics, our Kids' line is a joyful celebration of color and imagination. Vibrant pastels, playful animal motifs, and cheerful patterns come together in soft, comfortable fabrics — because childhood should be as colorful as a dream.",
    mood: 'A playful mosaic wall mural featuring a friendly cartoon lion cub — bright pastel tiles, rainbow ceramic shards, and gleaming glass.',
    moodShort: 'A playful mosaic mural — bright pastel tiles, rainbow ceramic shards, and gleaming glass.',
    palette: ['#d45a1a', '#2ca6e8', '#e8c42c', '#e86a2c'],
    icon: '🦁',
  },
];
