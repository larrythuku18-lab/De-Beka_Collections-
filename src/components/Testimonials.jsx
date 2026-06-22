import { motion } from 'framer-motion';
import { whatsappLink } from '../data/products.js';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="testimonial-placeholder">
          <p>Be the first to share your experience. Message Carolyne on WhatsApp after your purchase and we'll feature your review here.</p>
          <a className="btn-quickview" href={whatsappLink("Hi! I'd like to share a review of my De'Beka Collections purchase.")} target="_blank" rel="noopener noreferrer">
            Share Your Experience &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
