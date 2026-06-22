// Real catalog only — no invented products. Tags below are curatorial
// groupings of the same items, not separate stock.
export const PRODUCTS = [
  {
    id: 'floral-summer-dress',
    name: 'Floral Summer Dress',
    price: 'KES 2,000 – 3,500',
    desc: 'Lightweight floral print dress, perfect for warm days and casual outings.',
    image: 'images/women/dress-floral.jpg',
    category: 'women',
    slot: 'dress',
    tags: [],
  },
  {
    id: 'ankara-print-dress',
    name: 'Ankara Print Dress',
    price: 'KES 2,500 – 4,000',
    desc: 'Bold African print dress, tailored for a flattering fit — great for parties and church.',
    image: 'images/women/dress-ankara.jpg',
    category: 'women',
    slot: 'dress',
    tags: ['new', 'limited'],
  },
  {
    id: 'chiffon-blouse',
    name: 'Chiffon Blouse',
    price: 'KES 1,200 – 2,000',
    desc: 'Soft chiffon blouse, smart-casual, pairs well with trousers or skirts.',
    image: 'images/women/blouse-chiffon.jpg',
    category: 'women',
    slot: 'top',
    tags: ['trending'],
  },
  {
    id: 'pencil-skirt',
    name: 'Pencil Skirt',
    price: 'KES 1,500 – 2,800',
    desc: 'Office-ready pencil skirt, available in navy, black and maroon.',
    image: 'images/women/skirt-pencil.jpg',
    category: 'women',
    slot: 'bottom',
    tags: [],
  },
  {
    id: 'checked-casual-shirt',
    name: 'Checked Casual Shirt',
    price: 'KES 1,500 – 2,500',
    desc: 'Comfortable cotton checked shirt for men, smart-casual fit.',
    image: 'images/men/shirt-checked.jpg',
    category: 'men',
    slot: 'top',
    tags: ['trending'],
  },
  {
    id: 'slim-fit-denim-jeans',
    name: 'Slim Fit Denim Jeans',
    price: 'KES 2,000 – 3,500',
    desc: 'Durable denim jeans, unisex fit, available in multiple washes.',
    image: 'images/men/jeans-denim.jpg',
    category: 'men',
    slot: 'bottom',
    tags: ['new'],
  },
  {
    id: 'bomber-jacket',
    name: 'Bomber Jacket',
    price: 'KES 3,000 – 5,000',
    desc: 'Stylish unisex bomber jacket, great for cool evenings.',
    image: 'images/men/jacket-bomber.jpg',
    category: 'men',
    slot: 'outerwear',
    tags: ['new', 'premium'],
  },
  {
    id: 'plain-cotton-tshirt',
    name: 'Plain Cotton T-Shirt',
    price: 'KES 800 – 1,500',
    desc: 'Soft, breathable cotton t-shirt, available in assorted colors.',
    image: 'images/men/tshirt-plain.jpg',
    category: 'men',
    slot: 'top',
    tags: [],
  },
  {
    id: 'girls-party-dress',
    name: "Girls' Party Dress",
    price: 'KES 1,200 – 2,200',
    desc: 'Adorable party dress for girls aged 2–10, available in various colors.',
    image: 'images/kids/dress-kids.jpg',
    category: 'kids',
    slot: 'dress',
    tags: ['new', 'premium'],
  },
  {
    id: 'boys-shirt-shorts-set',
    name: "Boys' Shirt & Shorts Set",
    price: 'KES 1,000 – 1,800',
    desc: 'Matching shirt and shorts set for boys, comfortable for play and outings.',
    image: 'images/kids/set-boys.jpg',
    category: 'kids',
    slot: 'set',
    tags: ['trending'],
  },
  {
    id: 'baby-romper',
    name: 'Baby Romper',
    price: 'KES 700 – 1,200',
    desc: 'Soft cotton romper for babies, easy to wear, sizes 0–18 months.',
    image: 'images/kids/romper-baby.jpg',
    category: 'kids',
    slot: 'set',
    tags: [],
  },
  {
    id: 'kids-casual-set',
    name: "Kids' Casual Set",
    price: 'KES 900 – 1,600',
    desc: 'Everyday casual wear set for kids, durable and comfortable.',
    image: 'images/kids/school-set.jpg',
    category: 'kids',
    slot: 'set',
    tags: ['premium'],
  },
];

export const CATEGORY_LABELS = {
  women: 'Women',
  men: 'Men & Unisex',
  kids: 'Kids',
};

export const SLOT_LABELS = {
  top: 'Tops',
  bottom: 'Bottoms',
  outerwear: 'Outerwear',
  dress: 'Dresses',
  set: 'Sets',
};

export function byTag(tag) {
  return PRODUCTS.filter((p) => p.tags.includes(tag));
}

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function relatedTo(product, count = 3) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

export const WHATSAPP_NUMBER = '254728871796';

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
