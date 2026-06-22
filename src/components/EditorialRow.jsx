import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';

export default function EditorialRow({ id, title, products, badge }) {
  const trackRef = useRef(null);
  const { openQuickView } = useApp();

  if (products.length === 0) return null;

  function scroll(dir) {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  }

  return (
    <section id={id} className="editorial-row">
      <div className="container">
        <div className="section-head">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => scroll(-1)} aria-label="Scroll left">&#8249;</button>
            <button className="carousel-btn" onClick={() => scroll(1)} aria-label="Scroll right">&#8250;</button>
          </div>
        </div>
        <div className="carousel" ref={trackRef}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="carousel-card"
              onClick={() => openQuickView(product)}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              {badge && <span className="badge-new">{badge}</span>}
              <div className="carousel-image" style={{ backgroundImage: `url('${product.image}')` }} />
              <div className="carousel-info">
                <p className="eyebrow">{product.category === 'men' ? 'Men & Unisex' : product.category[0].toUpperCase() + product.category.slice(1)}</p>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
