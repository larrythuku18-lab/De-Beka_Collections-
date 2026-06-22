import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          About De'Beka Collections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          De'Beka Collections is a clothing business run by Carolyne Wanyonyi, offering a wide range of stylish, comfortable and affordable wear for women, men and children. Every piece is chosen with care to give you quality you can trust at a price that's fair. Browse the collection below and message us on WhatsApp to place an order or ask about availability and sizes.
        </motion.p>
      </div>
    </section>
  );
}
