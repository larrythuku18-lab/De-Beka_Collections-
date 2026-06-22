import { motion } from 'framer-motion';
import { whatsappLink } from '../data/products.js';

const BENEFITS = [
  'Early access to new arrivals before they hit the website',
  'Personal discounts when you message Carolyne directly',
  'A birthday surprise if you share your birth month at signup',
  'Personal styling recommendations over WhatsApp',
  'First look at limited and members-only pieces',
];

export default function VipElite() {
  return (
    <section id="elite" className="vip-elite">
      <div className="container">
        <motion.div
          className="vip-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="vip-eyebrow">De'Beka Elite</p>
          <h2>Join the inner circle</h2>
          <p className="vip-sub">
            De'Beka Elite is a VIP WhatsApp list run personally by Carolyne — no app, no points to track,
            just first access and a direct line to her.
          </p>
          <ul className="vip-benefits">
            {BENEFITS.map((benefit) => (
              <li key={benefit}><span className="vip-bullet">★</span>{benefit}</li>
            ))}
          </ul>
          <a
            className="btn btn-gold"
            href={whatsappLink("Hi! I'd like to join De'Beka Elite for early access and VIP updates.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join De'Beka Elite on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
