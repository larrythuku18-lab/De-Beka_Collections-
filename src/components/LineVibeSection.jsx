import { motion } from 'framer-motion';
import { LINE_VIBES } from '../data/line-vibes.js';
import { useApp } from '../context/AppContext.jsx';

export default function LineVibeSection() {
  const { setActiveFilter } = useApp();

  function goToShop(category) {
    setActiveFilter(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <section id="line-vibes" className="line-vibes">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Our Design Philosophy
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Every collection at De'Beka follows a distinct creative direction — a "LineVibe" — that shapes how we
          select, style, and present each piece. Here's what drives each line.
        </motion.p>

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
              <div className="line-vibe-bar" />

              {/* Decorative mosaic corner SVG */}
              {vibe.key === 'women' && (
                <svg className="line-vibe-mosaic line-vibe-mosaic--tl" width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                  <path d="M0 0 C30 10, 40 30, 50 50 C60 70, 70 90, 100 100" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
                  <path d="M0 0 C20 15, 25 35, 35 50 C45 65, 55 85, 80 100" stroke="currentColor" strokeWidth="0.4" opacity="0.10" />
                  <path d="M0 20 C15 25, 20 40, 30 50 C40 60, 50 75, 60 100" stroke="currentColor" strokeWidth="0.5" opacity="0.12" strokeDasharray="3 3" />
                  <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.08" />
                  <circle cx="38" cy="45" r="1.5" fill="currentColor" opacity="0.06" />
                  <circle cx="65" cy="75" r="2" fill="currentColor" opacity="0.08" />
                </svg>
              )}
              {vibe.key === 'women' && (
                <svg className="line-vibe-mosaic line-vibe-mosaic--br" width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <path d="M80 0 C60 20, 50 40, 40 60 C30 80, 20 90, 0 100" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
                  <path d="M80 20 C60 35, 55 50, 45 65 C35 80, 25 90, 10 100" stroke="currentColor" strokeWidth="0.3" opacity="0.08" strokeDasharray="2 4" />
                </svg>
              )}
              {vibe.key === 'men' && (
                <svg className="line-vibe-mosaic line-vibe-mosaic--tl" width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true">
                  <polygon points="0,0 30,15 15,40 0,0" fill="currentColor" opacity="0.06" />
                  <polygon points="30,15 60,0 75,25 45,40 30,15" fill="currentColor" opacity="0.04" />
                  <polygon points="15,40 45,25 60,50 30,65 15,40" fill="currentColor" opacity="0.05" />
                  <polygon points="45,40 75,25 90,50 60,65 45,40" fill="currentColor" opacity="0.03" />
                  <line x1="0" y1="0" x2="90" y2="90" stroke="currentColor" strokeWidth="0.4" opacity="0.07" />
                  <line x1="45" y1="0" x2="45" y2="90" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />
                  <line x1="0" y1="45" x2="90" y2="45" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />
                </svg>
              )}
              {vibe.key === 'kids' && (
                <svg className="line-vibe-mosaic line-vibe-mosaic--tl" width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                  <circle cx="8" cy="10" r="5" fill="currentColor" opacity="0.08" />
                  <circle cx="30" cy="5" r="4" fill="currentColor" opacity="0.06" />
                  <circle cx="20" cy="28" r="6" fill="currentColor" opacity="0.07" />
                  <circle cx="5" cy="35" r="3.5" fill="currentColor" opacity="0.05" />
                  <circle cx="45" cy="18" r="4.5" fill="currentColor" opacity="0.06" />
                  <circle cx="35" cy="42" r="5" fill="currentColor" opacity="0.07" />
                  <circle cx="55" cy="8" r="3" fill="currentColor" opacity="0.05" />
                  <rect x="12" y="15" width="6" height="6" rx="1" fill="currentColor" opacity="0.06" />
                  <rect x="38" y="30" width="5" height="5" rx="1" fill="currentColor" opacity="0.05" />
                  <rect x="6" y="22" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.04" />
                </svg>
              )}
              {vibe.key === 'kids' && (
                <svg className="line-vibe-mosaic line-vibe-mosaic--br" width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <circle cx="72" cy="70" r="6" fill="currentColor" opacity="0.08" />
                  <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.06" />
                  <circle cx="75" cy="50" r="3.5" fill="currentColor" opacity="0.05" />
                  <circle cx="55" cy="75" r="5" fill="currentColor" opacity="0.07" />
                  <rect x="64" y="42" width="5" height="5" rx="1" fill="currentColor" opacity="0.05" />
                </svg>
              )}

              <div className="line-vibe-icon">{vibe.icon}</div>
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
              <p className="line-vibe-desc">{vibe.description}</p>
              <blockquote className="line-vibe-mood">{vibe.mood}</blockquote>
              <button className="line-vibe-learn" onClick={() => goToShop(vibe.key)}>
                Learn More &rarr;
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
