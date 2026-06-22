import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';
import { findProduct, whatsappLink } from '../data/products.js';

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, openQuickView } = useApp();
  const items = wishlist.map(findProduct).filter(Boolean);

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <motion.div
          className="drawer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) setWishlistOpen(false); }}
        >
          <motion.div
            className="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="drawer-head">
              <h3>Your Wishlist</h3>
              <button className="quickview-close" onClick={() => setWishlistOpen(false)} aria-label="Close">&times;</button>
            </div>
            {items.length === 0 ? (
              <p className="empty-state">Nothing saved yet. Tap the heart on any piece to add it here.</p>
            ) : (
              <div className="drawer-list">
                {items.map((product) => (
                  <div key={product.id} className="drawer-item">
                    <div className="drawer-item-image" style={{ backgroundImage: `url('${product.image}')` }} />
                    <div className="drawer-item-info">
                      <p className="drawer-item-name">{product.name}</p>
                      <p className="price">{product.price}</p>
                      <div className="drawer-item-actions">
                        <button onClick={() => { setWishlistOpen(false); openQuickView(product); }}>View</button>
                        <a href={whatsappLink(`Hi! I'd like to ask about the ${product.name} (${product.price}) from my wishlist.`)} target="_blank" rel="noopener noreferrer">
                          Enquire
                        </a>
                        <button onClick={() => toggleWishlist(product.id)} className="remove">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
