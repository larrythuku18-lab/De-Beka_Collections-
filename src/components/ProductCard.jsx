import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORY_LABELS } from '../data/products.js';

export default function ProductCard({ product }) {
  const { openQuickView, wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);
  const [showBack, setShowBack] = useState(false);
  const hasBack = Boolean(product.imageBack);
  const displayImage = hasBack && showBack ? product.imageBack : product.image;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useTransform(rotateX, (v) => `${v}deg`);
  const springY = useTransform(rotateY, (v) => `${v}deg`);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className="product-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className={`wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>
      <div className="product-image" style={{ backgroundImage: `url('${displayImage}')` }}>
        {product.sold && <span className="sold-badge">Sold</span>}
        {hasBack && (
          <button
            className="flip-btn"
            onClick={(e) => { e.stopPropagation(); setShowBack((v) => !v); }}
            aria-label={showBack ? 'Show front' : 'Show back'}
          >
            {showBack ? '← Front' : 'Back →'}
          </button>
        )}
      </div>
      <div className="product-info">
        <p className="eyebrow">{CATEGORY_LABELS[product.category]}</p>
        <h3>{product.name}</h3>
        <p className="price">{product.price}</p>
        <p className="desc">{product.desc}</p>
        <button className="btn-quickview" onClick={() => openQuickView(product)}>Quick View &rarr;</button>
      </div>
    </motion.div>
  );
}
