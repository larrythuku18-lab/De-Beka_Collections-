import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';

const TILES = [
  { filter: 'women', label: 'Women', image: 'images/women/dress-ankara.jpg' },
  { filter: 'men', label: "Men & Unisex", image: 'images/men/jacket-bomber.jpg' },
  { filter: 'kids', label: 'Kids', image: 'images/kids/dress-kids.jpg' },
];

export default function CategoryTiles() {
  const { setActiveFilter } = useApp();

  function goTo(filter) {
    setActiveFilter(filter);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="categories" className="categories">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Shop by Category
        </motion.h2>
        <div className="category-grid">
          {TILES.map((tile, i) => (
            <motion.button
              key={tile.filter}
              className="category-tile"
              onClick={() => goTo(tile.filter)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="category-tile-bg" style={{ backgroundImage: `url('${tile.image}')` }} />
              <span className="category-tile-label">{tile.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
