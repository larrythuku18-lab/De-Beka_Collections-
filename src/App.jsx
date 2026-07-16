import { useEffect } from 'react';
import Lenis from 'lenis';
import PageLoader from './components/PageLoader.jsx';
import Navbar from './components/Navbar.jsx';
import VibeHero from './components/VibeHero.jsx';
import About from './components/About.jsx';
import LineVibeSection from './components/LineVibeSection.jsx';
import CategoryTiles from './components/CategoryTiles.jsx';
import EditorialRow from './components/EditorialRow.jsx';
import ShopGrid from './components/ShopGrid.jsx';
import BuildYourLook from './components/BuildYourLook.jsx';
import VipElite from './components/VipElite.jsx';
import CustomerGallery from './components/CustomerGallery.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import QuickView from './components/QuickView.jsx';
import WishlistDrawer from './components/WishlistDrawer.jsx';
import { byTag } from './data/products.js';

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <PageLoader />
      <Navbar />
      <VibeHero />
      <About />
      <LineVibeSection />
      <CategoryTiles />
      <EditorialRow id="new-arrivals" title="New Arrivals" products={byTag('new')} badge="New" />
      <EditorialRow id="trending-now" title="Trending Now" products={byTag('trending')} />
      <EditorialRow id="premium-essentials" title="Premium Essentials" products={byTag('premium')} badge="Premium" />
      <EditorialRow id="limited-collections" title="Limited Collections" products={byTag('limited')} badge="Limited" />
      <ShopGrid />
      <BuildYourLook />
      <VipElite />
      <CustomerGallery />
      <Testimonials />
      <Contact />
      <Footer />
      <QuickView />
      <WishlistDrawer />
    </>
  );
}
