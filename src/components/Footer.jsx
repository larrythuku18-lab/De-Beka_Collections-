import { whatsappLink } from '../data/products.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img className="logo-mark" src="images/logo-emblem.jpg" alt="De'Beka Collections" width="40" height="40" />
          <p className="footer-tagline">Look Good, Feel Good.</p>
        </div>

        <div className="footer-nav">
          <h4>Explore</h4>
          <a href="#shop">Shop</a>
          <a href="#new-arrivals">New In</a>
          <a href="#build-your-look">Build Your Look</a>
          <a href="#elite">De'Beka Elite</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-signup">
          <h4>Stay In The Loop</h4>
          <p>No spam — just a WhatsApp message when new pieces drop.</p>
          <a className="btn-quickview" href={whatsappLink("Hi! Please add me to your updates list for new arrivals.")} target="_blank" rel="noopener noreferrer">
            Get Updates on WhatsApp &rarr;
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} De'Beka Collections — Carolyne Wanyonyi. All rights reserved.</p>
        <a className="footer-admin-link" href="#/admin">Shop admin</a>
      </div>
    </footer>
  );
}
