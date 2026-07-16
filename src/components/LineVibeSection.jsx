import { motion } from 'framer-motion';
import { LINE_VIBES } from '../data/line-vibes.js';
import { useApp } from '../context/AppContext.jsx';

function MosaicArt({ vibe }) {
  if (vibe.key === 'women') {
    return (
      <svg className="mosaic-art" viewBox="0 0 300 200" fill="none" aria-hidden="true">
        {/* Flowing stained-glass curves */}
        <path d="M0 0 C60 20, 80 60, 120 80 C160 100, 180 140, 220 160 C250 175, 280 190, 300 200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <path d="M0 0 C40 30, 60 70, 100 90 C140 110, 160 150, 200 170 C230 185, 260 195, 300 200" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeDasharray="6 4" />
        <path d="M300 0 C240 20, 220 60, 180 80 C140 100, 120 140, 80 160 C50 175, 20 190, 0 200" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        {/* Stained-glass facets */}
        <path d="M60 0 L80 40 L40 60 L20 20 Z" fill="currentColor" opacity="0.08" />
        <path d="M140 0 L170 50 L120 80 L90 30 Z" fill="currentColor" opacity="0.06" />
        <path d="M220 0 L250 40 L210 70 L180 30 Z" fill="currentColor" opacity="0.07" />
        <path d="M100 80 L130 120 L80 150 L50 110 Z" fill="currentColor" opacity="0.05" />
        <path d="M200 100 L230 140 L180 170 L150 130 Z" fill="currentColor" opacity="0.06" />
        {/* Gold leaf accents */}
        <circle cx="75" cy="35" r="3" fill="currentColor" opacity="0.12" />
        <circle cx="155" cy="55" r="2.5" fill="currentColor" opacity="0.10" />
        <circle cx="235" cy="30" r="3" fill="currentColor" opacity="0.12" />
        <circle cx="115" cy="110" r="2" fill="currentColor" opacity="0.08" />
        <circle cx="215" cy="130" r="2.5" fill="currentColor" opacity="0.10" />
        {/* Flowing vines */}
        <path d="M0 100 C30 80, 50 110, 80 95 C110 80, 130 105, 160 90 C190 75, 210 100, 240 85 C270 70, 290 95, 300 80" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />
        <path d="M0 120 C25 105, 45 130, 70 115 C95 100, 115 125, 140 110 C165 95, 185 120, 210 105 C235 90, 255 115, 280 100" stroke="currentColor" strokeWidth="0.8" opacity="0.10" fill="none" strokeDasharray="3 5" />
      </svg>
    );
  }
  if (vibe.key === 'men') {
    return (
      <svg className="mosaic-art" viewBox="0 0 300 200" fill="none" aria-hidden="true">
        {/* Diamond grid */}
        <polygon points="0,0 30,15 15,40 0,0" fill="currentColor" opacity="0.08" />
        <polygon points="30,15 60,0 75,25 45,40" fill="currentColor" opacity="0.06" />
        <polygon points="60,0 90,15 75,40 45,25" fill="currentColor" opacity="0.05" />
        <polygon points="90,15 120,0 135,25 105,40" fill="currentColor" opacity="0.07" />
        <polygon points="120,0 150,15 135,40 105,25" fill="currentColor" opacity="0.06" />
        <polygon points="150,15 180,0 195,25 165,40" fill="currentColor" opacity="0.05" />
        <polygon points="180,0 210,15 195,40 165,25" fill="currentColor" opacity="0.07" />
        <polygon points="210,15 240,0 255,25 225,40" fill="currentColor" opacity="0.06" />
        <polygon points="240,0 270,15 255,40 225,25" fill="currentColor" opacity="0.05" />
        <polygon points="270,15 300,0 300,25 270,40" fill="currentColor" opacity="0.06" />
        {/* Second row offset */}
        <polygon points="15,40 45,25 60,50 30,65" fill="currentColor" opacity="0.05" />
        <polygon points="45,25 75,40 60,65 30,50" fill="currentColor" opacity="0.06" />
        <polygon points="75,40 105,25 120,50 90,65" fill="currentColor" opacity="0.04" />
        <polygon points="105,25 135,40 120,65 90,50" fill="currentColor" opacity="0.05" />
        <polygon points="135,40 165,25 180,50 150,65" fill="currentColor" opacity="0.06" />
        <polygon points="165,25 195,40 180,65 150,50" fill="currentColor" opacity="0.05" />
        <polygon points="195,40 225,25 240,50 210,65" fill="currentColor" opacity="0.04" />
        <polygon points="225,25 255,40 240,65 210,50" fill="currentColor" opacity="0.05" />
        <polygon points="255,40 285,25 300,50 270,65" fill="currentColor" opacity="0.06" />
        {/* Byzantine cross lines */}
        <line x1="150" y1="0" x2="150" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
        <line x1="0" y1="100" x2="300" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
        <line x1="0" y1="0" x2="300" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />
        <line x1="300" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />
        {/* Lower row */}
        <polygon points="0,120 30,105 45,130 15,145" fill="currentColor" opacity="0.05" />
        <polygon points="30,105 60,120 45,145 15,130" fill="currentColor" opacity="0.06" />
        <polygon points="60,120 90,105 105,130 75,145" fill="currentColor" opacity="0.04" />
        <polygon points="120,120 150,105 165,130 135,145" fill="currentColor" opacity="0.05" />
        <polygon points="180,120 210,105 225,130 195,145" fill="currentColor" opacity="0.06" />
        <polygon points="240,120 270,105 285,130 255,145" fill="currentColor" opacity="0.04" />
        <polygon points="90,160 120,145 135,170 105,185" fill="currentColor" opacity="0.05" />
        <polygon points="150,160 180,145 195,170 165,185" fill="currentColor" opacity="0.06" />
        <polygon points="210,160 240,145 255,170 225,185" fill="currentColor" opacity="0.04" />
      </svg>
    );
  }
  if (vibe.key === 'kids') {
    return (
      <svg className="mosaic-art" viewBox="0 0 300 200" fill="none" aria-hidden="true">
        {/* Colorful scattered mosaic tiles */}
        <circle cx="30" cy="25" r="14" fill="currentColor" opacity="0.10" />
        <circle cx="80" cy="15" r="10" fill="currentColor" opacity="0.08" />
        <circle cx="130" cy="30" r="16" fill="currentColor" opacity="0.09" />
        <circle cx="190" cy="18" r="12" fill="currentColor" opacity="0.07" />
        <circle cx="250" cy="28" r="15" fill="currentColor" opacity="0.10" />
        <circle cx="55" cy="55" r="11" fill="currentColor" opacity="0.08" />
        <circle cx="110" cy="60" r="13" fill="currentColor" opacity="0.09" />
        <circle cx="170" cy="50" r="10" fill="currentColor" opacity="0.07" />
        <circle cx="230" cy="58" r="14" fill="currentColor" opacity="0.08" />
        <circle cx="280" cy="45" r="9" fill="currentColor" opacity="0.06" />
        <circle cx="20" cy="90" r="12" fill="currentColor" opacity="0.09" />
        <circle cx="75" cy="85" r="15" fill="currentColor" opacity="0.07" />
        <circle cx="145" cy="95" r="11" fill="currentColor" opacity="0.08" />
        <circle cx="210" cy="82" r="13" fill="currentColor" opacity="0.09" />
        <circle cx="270" cy="92" r="10" fill="currentColor" opacity="0.07" />
        <circle cx="45" cy="125" r="9" fill="currentColor" opacity="0.08" />
        <circle cx="100" cy="130" r="14" fill="currentColor" opacity="0.07" />
        <circle cx="160" cy="120" r="12" fill="currentColor" opacity="0.09" />
        <circle cx="220" cy="135" r="10" fill="currentColor" opacity="0.08" />
        <circle cx="50" cy="160" r="13" fill="currentColor" opacity="0.07" />
        <circle cx="120" cy="165" r="11" fill="currentColor" opacity="0.09" />
        <circle cx="180" cy="155" r="14" fill="currentColor" opacity="0.08" />
        <circle cx="250" cy="170" r="12" fill="currentColor" opacity="0.07" />
        {/* Rectangular tile accents */}
        <rect x="28" y="118" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.06" />
        <rect x="155" y="15" width="10" height="10" rx="2" fill="currentColor" opacity="0.05" />
        <rect x="225" y="130" width="7" height="7" rx="1" fill="currentColor" opacity="0.06" />
        <rect x="82" y="158" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.05" />
        {/* Gaudí-style organic blobs */}
        <path d="M0 190 Q15 180, 30 190 Q45 200, 60 190 Q75 180, 90 190 Q105 200, 120 190 Q135 180, 150 190 Q165 200, 180 190 Q195 180, 210 190 Q225 200, 240 190 Q255 180, 270 190 Q285 200, 300 190" stroke="currentColor" strokeWidth="1.5" opacity="0.08" fill="none" />
        <path d="M0 195 Q20 188, 40 195 Q60 202, 80 195 Q100 188, 120 195 Q140 202, 160 195 Q180 188, 200 195 Q220 202, 240 195 Q260 188, 280 195 Q300 202, 300 195" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none" strokeDasharray="4 3" />
      </svg>
    );
  }
  return null;
}

export default function LineVibeSection() {
  const { setActiveFilter } = useApp();

  function goToShop(category) {
    setActiveFilter(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="line-vibes" className="line-vibes">
      <div className="container">
        <h2 className="section-title">Our Design Philosophy</h2>

        <div className="line-vibe-grid">
          {LINE_VIBES.map((vibe, i) => (
            <motion.div
              key={vibe.key}
              className="line-vibe-card"
              data-line={vibe.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Mosaic artwork — fills the top half of the card */}
              <div className="line-vibe-canvas">
                <MosaicArt vibe={vibe} />
                <div className="line-vibe-canvas-overlay" />
              </div>

              {/* Minimal content */}
              <div className="line-vibe-info">
                <h3 className="line-vibe-name">{vibe.name}</h3>
                <p className="line-vibe-subtitle">{vibe.subtitle}</p>
                <div className="line-vibe-tags">
                  {vibe.tagline.split('·').map((tag) => (
                    <span key={tag} className="line-vibe-tag">{tag.trim()}</span>
                  ))}
                </div>
                <div className="line-vibe-swatches">
                  {vibe.palette.map((color) => (
                    <span key={color} className="line-vibe-swatch" style={{ background: color }} title={color} />
                  ))}
                </div>
                <button className="line-vibe-learn" onClick={() => goToShop(vibe.key)}>
                  Learn More &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
