import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setHidden(true);
      return;
    }
    const timer = setTimeout(() => setHidden(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            className="logo-mark logo-mark--loader"
            src="images/logo-emblem.jpg"
            alt=""
            width={84}
            height={84}
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          <motion.p
            className="loader-tagline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            LOOK GOOD. FEEL GOOD.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
