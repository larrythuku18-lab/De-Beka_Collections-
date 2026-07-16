import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORY_LABELS } from '../data/products.js';

export default function Navbar() {
  const { theme, toggleTheme, wishlist, setWishlistOpen, setActiveFilter, searchQuery, setSearchQuery } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openDropdown() {
    clearTimeout(dropdownTimeout.current);
    setShopDropdownOpen(true);
  }

  function closeDropdownDelayed() {
    dropdownTimeout.current = setTimeout(() => setShopDropdownOpen(false), 150);
  }

  function goToCategory(filter) {
    setActiveFilter(filter);
    setShopDropdownOpen(false);
    setMobileOpen(false);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className={`container nav-bar nav-bar--centered ${scrolled ? 'nav-bar--shrunk' : ''}`}>
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <div className="nav-search nav-search--mobile">
            <input
              type="search"
              placeholder="Search pieces…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <a href="#vibe-hero" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#line-vibes" onClick={() => setMobileOpen(false)}>Our Vibe</a>
          <div className="nav-dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdownDelayed}>
            <a href="#shop" onClick={(e) => { e.preventDefault(); goToCategory('all'); }}>Shop</a>
            {shopDropdownOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <button key={key} data-line={key} onClick={() => goToCategory(key)}>{label}</button>
                ))}
              </motion.div>
            )}
          </div>
          <a href="#new-arrivals" onClick={() => setMobileOpen(false)}>New In</a>
          <a href="#build-your-look" onClick={() => setMobileOpen(false)}>Build Your Look</a>
          <a href="#elite" onClick={() => setMobileOpen(false)}>De'Beka Elite</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        </nav>

        <a href="#vibe-hero" className="logo logo--centered">
          <img className="logo-mark" src="images/logo-emblem.jpg" alt="De'Beka Collections" width="36" height="36" />
          <span className="logo-text">De'Beka <em>Collections</em></span>
        </a>

        <div className="nav-utility">
          <div className="nav-search">
            <input
              type="search"
              placeholder="Search pieces…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <button className="nav-icon-btn" onClick={() => setWishlistOpen(true)} aria-label="Open wishlist">
            ♥
            {wishlist.length > 0 && <span className="nav-icon-badge">{wishlist.length}</span>}
          </button>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode" title="Toggle dark/light mode">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="nav-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            &#9776;
          </button>
        </div>
      </div>
    </header>
  );
}
