import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';
import { LINE_VIBES } from '../data/line-vibes.js';

// Hero-specific visual fields for each vibe
const VIBE_EXTRAS = {
  women: {
    gradient: ['#2a0a1e', '#8a1a5e', '#4a1032'],
    shadow: 'rgba(138, 26, 94, 0.35)',
  },
  men: {
    gradient: ['#0a1624', '#1a3a5c', '#0e2034'],
    shadow: 'rgba(26, 58, 92, 0.35)',
  },
  kids: {
    gradient: ['#1e0e06', '#d45a1a', '#2a1408'],
    shadow: 'rgba(212, 90, 26, 0.35)',
  },
};

const TAGLINE_WORDS = ['Look', 'Good,', 'Feel', 'Good'];

// All slides: brand intro first, then each LineVibe
const ALL_SLIDES = [
  {
    type: 'brand',
    key: 'brand',
    gradient: ['#0a0a0a', '#1c1424', '#2c1f38'],
    shadow: 'rgba(232, 18, 126, 0.35)',
  },
  ...LINE_VIBES.map((v) => ({
    type: 'vibe',
    key: v.key,
    ...v,
    ...VIBE_EXTRAS[v.key],
  })),
];

const AUTOPLAY_INTERVAL = 5000;
const PROGRESS_TICK = 50;

export default function VibeHero() {
  const { setActiveFilter } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const active = ALL_SLIDES[activeIndex];

  const goTo = useCallback((index) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ALL_SLIDES.length);
    setProgress(0);
  }, []);

  // Autoplay — disabled when reduced motion is preferred
  useEffect(() => {
    if (paused || reduceMotion) {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
      return;
    }

    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (PROGRESS_TICK / AUTOPLAY_INTERVAL) * 100;
        return next > 100 ? 100 : next;
      });
    }, PROGRESS_TICK);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [paused, goNext, reduceMotion]);

  function goToShop(category) {
    if (category) {
      setActiveFilter(category);
    }
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ─── Brand slide renderer ───
  function renderBrand() {
    return (
      <>
        <img
          className="logo-plaque vibe-hero-plaque"
          src="images/logo-full.jpg"
          alt="De'Beka Collections — Look Good, Feel Good"
          width="180"
          height="146"
        />

        <p className="vibe-hero-tagline" aria-label="Look Good, Feel Good">
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.1 + i * 0.18, duration: 0.5 }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <h1 className="vibe-hero-heading">Luxury That Speaks Before You Do.</h1>

        <p className="vibe-hero-sub">
          Curated fashion designed for confidence — handpicked by Carolyne Wanyonyi.
        </p>

        <div className="vibe-hero-brand-actions">
          <button className="vibe-hero-btn" onClick={() => goToShop()}>
            Shop Collection
          </button>
          <button className="vibe-hero-btn vibe-hero-btn--outline" onClick={() => goToShop('women')}>
            Explore Women
          </button>
        </div>
      </>
    );
  }

  // ─── Vibe slide renderer ───
  function renderVibe(vibe) {
    return (
      <>
        <motion.div
          className="vibe-hero-icon"
          initial={reduceMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          {vibe.icon}
        </motion.div>

        <p className="vibe-hero-eyebrow">{vibe.subtitle}</p>
        <h2 className="vibe-hero-title">{vibe.name}</h2>

        <div className="vibe-hero-tags">
          {vibe.tagline.split('·').map((tag) => (
            <span key={tag} className="vibe-hero-tag">{tag.trim()}</span>
          ))}
        </div>

        <div className="vibe-hero-swatches">
          {vibe.palette.map((color) => (
            <span key={color} className="vibe-hero-swatch" style={{ background: color }} title={color} />
          ))}
        </div>

        <p className="vibe-hero-mood">{vibe.moodShort}</p>

        <button className="vibe-hero-btn" onClick={() => goToShop(vibe.key)}>
          Shop {vibe.name} Collection &rarr;
        </button>
      </>
    );
  }

  const isBrand = active.type === 'brand';

  return (
    <section
      id="vibe-hero"
      className="vibe-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background layers */}
      <div className="vibe-hero-bg" aria-hidden="true">
        {ALL_SLIDES.map((slide) => (
          <div
            key={slide.key}
            className={`vibe-hero-bg-layer ${slide.key === active.key ? 'is-active' : ''}`}
            style={{
              background: `linear-gradient(160deg, ${slide.gradient[0]}, ${slide.gradient[1]}, ${slide.gradient[2]})`,
            }}
          />
        ))}
      </div>

      {/* Decorative orb */}
      {isBrand ? (
        <>
          <div className="vibe-hero-orb vibe-hero-orb--pink" aria-hidden="true" />
          <div className="vibe-hero-orb vibe-hero-orb--blue" aria-hidden="true" />
        </>
      ) : (
  <div
    className="vibe-hero-orb"
    style={{
      background: active.palette[0],
      boxShadow: `0 0 120px ${active.shadow}`,
    }}
  />
      )}

      {/* Mosaic pattern overlay */}
      {!isBrand && (
        <div
          className={`vibe-hero-pattern ${!isBrand ? 'is-active' : ''}`}
          data-line={active.key}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className={`vibe-hero-content ${isBrand ? 'vibe-hero-content--brand' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            className="vibe-hero-slide"
            initial={{ opacity: 0, y: reduceMotion ? 0 : isBrand ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : isBrand ? 0 : -20 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeInOut' }}
          >
            {isBrand ? renderBrand() : renderVibe(active)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls — only progress bar + dots; brand slide gets a subtle skip hint */}
      <div className="vibe-hero-footer">
        <div className="vibe-hero-progress">
          {ALL_SLIDES.map((slide) => (
            <div key={slide.key} className="vibe-hero-progress-track">
              <div
                className="vibe-hero-progress-fill"
                style={{
                  width:
                    ALL_SLIDES.indexOf(slide) < activeIndex
                      ? '100%'
                      : ALL_SLIDES.indexOf(slide) === activeIndex
                        ? `${progress}%`
                        : '0%',
                  background: isBrand ? 'var(--pink)' : slide.palette?.[0] || 'var(--pink)',
                }}
              />
            </div>
          ))}
        </div>

        <div className="vibe-hero-dots">
          {ALL_SLIDES.map((slide, i) => (
            <button
              key={slide.key}
              className={`vibe-hero-dot ${i === activeIndex ? 'is-active' : ''}`}
              style={
                i === activeIndex
                  ? { background: isBrand ? 'var(--pink)' : slide.palette?.[0] || 'var(--pink)' }
                  : {}
              }
              onClick={() => goTo(i)}
              aria-label={slide.type === 'brand' ? 'Go to brand intro' : `Go to ${slide.name}`}
            />
          ))}
        </div>

        <button
          className="vibe-hero-pause"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          title={paused ? 'Resume' : 'Pause'}
        >
          {paused ? '▶' : '❚❚'}
        </button>
      </div>
    </section>
  );
}
