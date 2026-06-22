import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Starfield from './Starfield.jsx';

const TAGLINE_WORDS = ['Look', 'Good,', 'Feel', 'Good'];

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <Starfield />
      <div className="orb orb--pink" aria-hidden="true" />
      <div className="orb orb--blue" aria-hidden="true" />
      <motion.div className="container hero-content" style={{ y, opacity }}>
        <img className="logo-plaque" src="images/logo-full.jpg" alt="De'Beka Collections — Look Good, Feel Good" width="220" height="178" />

        <p className="hero-tagline" aria-label="Look Good, Feel Good">
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.2, duration: 0.6 }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          Luxury That Speaks Before You Do.
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Curated fashion designed for confidence — handpicked by Carolyne Wanyonyi.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <a href="#shop" className="btn">Shop Collection</a>
          <a href="#new-arrivals" className="btn btn-outline">Explore New Arrivals</a>
        </motion.div>
      </motion.div>
    </section>
  );
}
