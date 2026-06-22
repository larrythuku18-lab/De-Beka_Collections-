import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';
import { relatedTo, whatsappLink } from '../data/products.js';

const SIZES = ['S', 'M', 'L', 'XL'];

export default function QuickView() {
  const { quickViewProduct, closeQuickView, openQuickView, wishlist, toggleWishlist } = useApp();
  const [selectedSize, setSelectedSize] = useState(null);

  function handleOpenRelated(product) {
    setSelectedSize(null);
    openQuickView(product);
  }

  if (!quickViewProduct) return null;
  const product = quickViewProduct;
  const related = relatedTo(product);
  const isWishlisted = wishlist.includes(product.id);
  const message = `Hi! I'm interested in the ${product.name} (${product.price})${selectedSize ? `, size ${selectedSize}` : ''}. Is it available?`;

  return (
    <AnimatePresence>
      <motion.div
        className="quickview-overlay open"
        onClick={(e) => { if (e.target === e.currentTarget) closeQuickView(); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="quickview-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <button className="quickview-close" onClick={closeQuickView} aria-label="Close">&times;</button>
          <div className="quickview-image" style={{ backgroundImage: `url('${product.image}')` }} />
          <div className="quickview-details">
            <div className="quickview-title-row">
              <h3>{product.name}</h3>
              <button
                className={`wishlist-btn wishlist-btn--inline ${isWishlisted ? 'is-active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
            <p className="price">{product.price}</p>
            <p className="desc">{product.desc}</p>

            <div className="size-select">
              <span className="label">Size</span>
              <div className="size-options">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={selectedSize === size ? 'selected' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="hint">Sizes vary by piece — confirm your exact fit with Carolyne before ordering.</p>
            </div>

            <a className="btn btn-whatsapp" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>

            {related.length > 0 && (
              <div className="related-items">
                <p className="label">You Might Also Like</p>
                <div className="related-items-row">
                  {related.map((item) => (
                    <div key={item.id} className="mini-card" onClick={() => handleOpenRelated(item)}>
                      <div className="mini-card-image" style={{ backgroundImage: `url('${item.image}')` }} />
                      <div className="mini-card-info">
                        <p>{item.name}</p>
                        <p className="price">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
