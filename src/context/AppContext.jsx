import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AppContext = createContext(null);

function useLocalStorageList(key, max = 50) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const add = useCallback((id) => {
    setItems((prev) => [id, ...prev.filter((existing) => existing !== id)].slice(0, max));
  }, [max]);

  const toggle = useCallback((id) => {
    setItems((prev) => (prev.includes(id) ? prev.filter((existing) => existing !== id) : [id, ...prev]));
  }, []);

  return [items, { add, toggle, setItems }];
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('debeka-theme') || 'dark');
  const [recentlyViewed, recentlyViewedActions] = useLocalStorageList('debeka-recently-viewed', 4);
  const [wishlist, wishlistActions] = useLocalStorageList('debeka-wishlist', 50);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('debeka-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
    recentlyViewedActions.add(product.id);
  }, [recentlyViewedActions]);

  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  const value = {
    theme,
    toggleTheme,
    recentlyViewed,
    wishlist,
    toggleWishlist: wishlistActions.toggle,
    wishlistOpen,
    setWishlistOpen,
    quickViewProduct,
    openQuickView,
    closeQuickView,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
