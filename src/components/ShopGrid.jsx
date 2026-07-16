import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';
import { PRODUCTS, CATEGORY_LABELS, findProduct } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

export default function ShopGrid() {
  const { activeFilter, setActiveFilter, searchQuery, recentlyViewed, openQuickView } = useApp();

  const query = searchQuery.trim().toLowerCase();
  const visible = PRODUCTS.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const recentProducts = recentlyViewed.map(findProduct).filter(Boolean);

  return (
    <section id="shop" className="shop">
      <div className="container">

        {recentProducts.length > 0 && (
          <div className="recently-viewed">
            <h3 className="section-title section-title--small">Recently Viewed</h3>
            <div className="recently-viewed-row">
              {recentProducts.map((product) => (
                <div key={product.id} className="mini-card" onClick={() => openQuickView(product)}>
                  <div className="mini-card-image" style={{ backgroundImage: `url('${product.image}')` }} />
                  <div className="mini-card-info">
                    <p>{product.name}</p>
                    <p className="price">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="shop-layout">
          <aside className="filter-rail">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-pills">
              <button className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Pieces</button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button key={key} className={`filter-pill ${activeFilter === key ? 'active' : ''}`} data-line={key} onClick={() => setActiveFilter(key)}>
                  {label}
                </button>
              ))}
            </div>
          </aside>

          <div className="product-grid">
            {visible.length === 0 ? (
              <p className="empty-state">No pieces match "{searchQuery}". Try a different search or category.</p>
            ) : (
              visible.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
