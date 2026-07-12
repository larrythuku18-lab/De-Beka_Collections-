// Real catalog only — no invented products. Tags are curatorial groupings
// of the same items, not separate stock.
//
// The product data itself lives in products.json so the admin page
// (/#/admin) can read and update it via the GitHub API. Don't hand-edit
// the JSON while an admin publish is in flight.
import PRODUCTS_DATA from './products.json';

export const PRODUCTS = PRODUCTS_DATA;

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

export const TAG_LABELS = {
  new: 'New Arrival',
  trending: 'Trending',
  premium: 'Premium',
  limited: 'Limited',
};

export function byTag(tag) {
  return PRODUCTS.filter((p) => p.tags.includes(tag));
}

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function relatedTo(product, count = 3) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id && !p.sold).slice(0, count);
}

export const WHATSAPP_NUMBER = '254728871796';

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
