import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, SLOT_LABELS, whatsappLink } from '../data/products.js';

function lowEndPrice(priceRange) {
  const match = priceRange.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : null;
}

export default function BuildYourLook() {
  const [selections, setSelections] = useState({});

  const slots = useMemo(() => {
    const bySlot = {};
    PRODUCTS.forEach((p) => {
      if (!bySlot[p.slot]) bySlot[p.slot] = [];
      bySlot[p.slot].push(p);
    });
    return bySlot;
  }, []);

  const selectedProducts = Object.values(selections).filter(Boolean);
  const pricedProducts = selectedProducts.filter((p) => lowEndPrice(p.price) !== null);
  const unpricedCount = selectedProducts.length - pricedProducts.length;
  const total = pricedProducts.reduce((sum, p) => sum + lowEndPrice(p.price), 0);

  function selectForSlot(slot, productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    setSelections((prev) => ({ ...prev, [slot]: product || null }));
  }

  const message = selectedProducts.length
    ? `Hi! I'm building a look on the website:\n${selectedProducts.map((p) => `- ${p.name} (${p.price})`).join('\n')}\nCould you confirm availability and sizes?`
    : '';

  return (
    <section id="build-your-look" className="build-your-look">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Build Your Look
        </motion.h2>
        <p className="section-sub">
          Pick a piece from each category to put together an outfit. We don't sell shoes or accessories yet,
          so this covers what's actually in the collection today.
        </p>

        <div className="outfit-builder">
          <div className="outfit-slots">
            {Object.entries(SLOT_LABELS).map(([slot, label]) => (
              slots[slot] && (
                <div className="outfit-slot" key={slot}>
                  <label htmlFor={`slot-${slot}`}>{label}</label>
                  <select id={`slot-${slot}`} onChange={(e) => selectForSlot(slot, e.target.value)} defaultValue="">
                    <option value="">None</option>
                    {slots[slot].map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.price}</option>
                    ))}
                  </select>
                </div>
              )
            ))}
          </div>

          <div className="outfit-summary">
            <h3>Complete Your Look</h3>
            {selectedProducts.length === 0 ? (
              <p className="empty-state">Choose at least one piece to see your look come together.</p>
            ) : (
              <>
                <div className="outfit-preview">
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="outfit-preview-item" style={{ backgroundImage: `url('${p.image}')` }} title={p.name} />
                  ))}
                </div>
                <ul className="outfit-list">
                  {selectedProducts.map((p) => (
                    <li key={p.id}>{p.name} <span className="price">{p.price}</span></li>
                  ))}
                </ul>
                {pricedProducts.length > 0 ? (
                  <p className="outfit-total">
                    From KES {total.toLocaleString()}
                    {unpricedCount > 0 && ' + ask Carolyne for the rest'}
                  </p>
                ) : (
                  <p className="outfit-total">Ask Carolyne for pricing on this look</p>
                )}
                <a className="btn btn-whatsapp" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                  Enquire About This Look
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
