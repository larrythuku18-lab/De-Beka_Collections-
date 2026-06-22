import { motion } from 'framer-motion';
import { whatsappLink } from '../data/products.js';

export default function CustomerGallery() {
  return (
    <section className="customer-gallery">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Styled By You
        </motion.h2>
        <p className="section-sub">
          This wall is reserved for real customers wearing De'Beka pieces. Send Carolyne a photo of your look
          and we'll feature it here — no stock photos, just real style.
        </p>
        <div className="gallery-placeholder">
          <div className="gallery-empty-card">
            <span className="gallery-empty-icon">📷</span>
            <p>Your photo could be here</p>
            <a className="btn-quickview" href={whatsappLink("Hi! I'd like to share a photo of me wearing my De'Beka Collections piece.")} target="_blank" rel="noopener noreferrer">
              Send Your Photo &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
