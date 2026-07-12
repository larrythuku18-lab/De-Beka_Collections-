import { useEffect, useMemo, useState } from 'react';
import { CATEGORY_LABELS, SLOT_LABELS, TAG_LABELS } from '../data/products.js';
import { validateToken, fetchCatalog, publishCatalog } from './github.js';
import { processPhoto } from './image.js';
import './admin.css';

const TOKEN_KEY = 'debeka_admin_token';

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const EMPTY_FORM = {
  id: null,
  name: '',
  price: 'Ask Carolyne',
  desc: '',
  category: 'women',
  slot: 'dress',
  tags: [],
  sold: false,
  front: null, // { base64, dataUrl } when a new photo is chosen
  back: null,
};

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [stage, setStage] = useState(token ? 'loading' : 'login');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState([]);
  const [pendingImages, setPendingImages] = useState({}); // repo path -> base64
  const [changeLog, setChangeLog] = useState([]);
  const [form, setForm] = useState(null); // null = closed, EMPTY_FORM-shaped = open
  const [formError, setFormError] = useState('');
  const [busyPhoto, setBusyPhoto] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const dirty = changeLog.length > 0;

  async function loadCatalog(activeToken) {
    setStage('loading');
    try {
      await validateToken(activeToken);
      const catalog = await fetchCatalog(activeToken);
      setProducts(catalog);
      setPendingImages({});
      setChangeLog([]);
      setStage('ready');
    } catch (err) {
      // Keep the stored token — the failure may be transient (offline). A
      // genuinely bad token just re-shows this screen; pasting a new one overwrites it.
      setLoginError(err.message);
      setStage('login');
    }
  }

  useEffect(() => {
    if (token) loadCatalog(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function logChange(entry) {
    setChangeLog((log) => [...log, entry]);
    setNotice('');
  }

  function handleLogin(e) {
    e.preventDefault();
    const value = e.target.elements.token.value.trim();
    if (!value) return;
    localStorage.setItem(TOKEN_KEY, value);
    setToken(value);
    setLoginError('');
    loadCatalog(value);
  }

  function handleLogout() {
    if (dirty && !window.confirm('You have unpublished changes that will be lost. Log out anyway?')) return;
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setProducts([]);
    setPendingImages({});
    setChangeLog([]);
    setStage('login');
  }

  function toggleSold(product) {
    const nowSold = !product.sold;
    setProducts((list) => list.map((p) => {
      if (p.id !== product.id) return p;
      const next = { ...p };
      if (nowSold) next.sold = true; else delete next.sold;
      return next;
    }));
    logChange(`${nowSold ? 'Mark sold' : 'Mark available'}: ${product.name}`);
  }

  function toggleNew(product) {
    const hasNew = product.tags.includes('new');
    setProducts((list) => list.map((p) => (
      p.id === product.id
        ? { ...p, tags: hasNew ? p.tags.filter((t) => t !== 'new') : [...p.tags, 'new'] }
        : p
    )));
    logChange(`${hasNew ? 'Remove from' : 'Add to'} New Arrivals: ${product.name}`);
  }

  function deleteProduct(product) {
    if (!window.confirm(`Delete "${product.name}" from the catalog? This removes it from the website on the next publish.`)) return;
    setProducts((list) => list.filter((p) => p.id !== product.id));
    logChange(`Delete: ${product.name}`);
  }

  function openAdd() {
    setFormError('');
    setForm({ ...EMPTY_FORM });
  }

  function openEdit(product) {
    setFormError('');
    setForm({
      ...EMPTY_FORM,
      ...product,
      tags: [...product.tags],
      sold: Boolean(product.sold),
      front: null,
      back: null,
    });
  }

  async function handlePhoto(e, side) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusyPhoto(true);
    setFormError('');
    try {
      const photo = await processPhoto(file);
      setForm((f) => ({ ...f, [side]: photo }));
    } catch (err) {
      setFormError(`Could not process the ${side} photo: ${err.message}`);
    } finally {
      setBusyPhoto(false);
    }
  }

  function uniqueSlug(name) {
    const base = slugify(name) || 'item';
    let slug = base;
    let n = 2;
    const taken = (s) => products.some((p) => p.id === s) || pendingImages[`public/images/uploads/${s}.jpg`];
    while (taken(slug)) slug = `${base}-${n++}`;
    return slug;
  }

  function saveForm(e) {
    e.preventDefault();
    const isNew = !form.id;
    if (!form.name.trim()) { setFormError('Please give the item a name.'); return; }
    if (isNew && !form.front) { setFormError('Please add a front photo.'); return; }

    const newImages = {};
    let id = form.id;
    let image;
    let imageBack;

    if (isNew) {
      id = uniqueSlug(form.name);
      image = `images/uploads/${id}.jpg`;
      newImages[`public/${image}`] = form.front.base64;
      if (form.back) {
        imageBack = `images/uploads/${id}-back.jpg`;
        newImages[`public/${imageBack}`] = form.back.base64;
      }
    } else {
      const existing = products.find((p) => p.id === form.id);
      image = existing.image;
      imageBack = existing.imageBack;
      // Replacement photos go to a fresh path so browsers don't show stale caches.
      const stamp = Date.now().toString(36);
      if (form.front) {
        image = `images/uploads/${form.id}-${stamp}.jpg`;
        newImages[`public/${image}`] = form.front.base64;
      }
      if (form.back) {
        imageBack = `images/uploads/${form.id}-${stamp}-back.jpg`;
        newImages[`public/${imageBack}`] = form.back.base64;
      }
    }

    const entry = {
      id,
      name: form.name.trim(),
      price: form.price.trim() || 'Ask Carolyne',
      desc: form.desc.trim(),
      image,
      ...(imageBack ? { imageBack } : {}),
      category: form.category,
      slot: form.slot,
      tags: form.tags,
      ...(form.sold ? { sold: true } : {}),
    };

    setProducts((list) => (isNew ? [entry, ...list] : list.map((p) => (p.id === form.id ? entry : p))));
    setPendingImages((imgs) => ({ ...imgs, ...newImages }));
    logChange(`${isNew ? 'Add' : 'Edit'}: ${entry.name}`);
    setForm(null);
  }

  async function handlePublish() {
    setPublishing(true);
    setNotice('');
    try {
      const images = Object.entries(pendingImages).map(([path, base64]) => ({ path, base64 }));
      const message = `Admin: ${changeLog.length} catalog change${changeLog.length === 1 ? '' : 's'}\n\n${changeLog.map((c) => `- ${c}`).join('\n')}`;
      await publishCatalog(token, { products, images, message });
      setPendingImages({});
      setChangeLog([]);
      setNotice('Published! The live site updates in about a minute once Vercel finishes rebuilding.');
    } catch (err) {
      setNotice(`Publish failed: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  }

  async function handleDiscard() {
    if (!window.confirm('Throw away all unpublished changes and reload the live catalog?')) return;
    await loadCatalog(token);
    setNotice('Changes discarded — showing the live catalog.');
  }

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => (
      (filter === 'all' || p.category === filter)
      && (!q || p.name.toLowerCase().includes(q) || (p.desc || '').toLowerCase().includes(q))
    ));
  }, [products, filter, search]);

  if (stage === 'login') {
    return (
      <div className="admin-app admin-login">
        <h1>De'Beka Admin</h1>
        <p className="admin-sub">Catalog manager for Carolyne. You need the shop's access key to continue.</p>
        <form onSubmit={handleLogin}>
          <input name="token" type="password" placeholder="Paste access key (GitHub token)" autoComplete="off" />
          <button type="submit" className="admin-btn admin-btn--primary">Unlock</button>
        </form>
        {loginError && <p className="admin-error">{loginError}</p>}
        <details className="admin-help">
          <summary>How to create the access key (for Larry)</summary>
          <ol>
            <li>Go to <strong>github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token</strong>.</li>
            <li>Repository access: <strong>Only select repositories</strong> → pick <strong>De-Beka_Collections-</strong>.</li>
            <li>Permissions → Repository permissions → <strong>Contents: Read and write</strong>. Nothing else.</li>
            <li>Set the longest expiry available, generate, and paste the token here on Carolyne's phone. It is saved on this device only.</li>
          </ol>
        </details>
        <a className="admin-back-link" href="#/" onClick={() => window.scrollTo(0, 0)}>← Back to the shop</a>
      </div>
    );
  }

  if (stage === 'loading') {
    return <div className="admin-app admin-login"><h1>De'Beka Admin</h1><p className="admin-sub">Loading catalog…</p></div>;
  }

  return (
    <div className="admin-app">
      <header className="admin-header">
        <div>
          <h1>De'Beka Admin</h1>
          <p className="admin-sub">{products.length} items in the catalog</p>
        </div>
        <div className="admin-header-actions">
          <a className="admin-btn" href="#/">View shop</a>
          <button className="admin-btn" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      {(dirty || notice) && (
        <div className={`admin-publish-bar ${dirty ? 'is-dirty' : ''}`}>
          {dirty ? (
            <>
              <span>{changeLog.length} unpublished change{changeLog.length === 1 ? '' : 's'}</span>
              <div className="admin-publish-actions">
                <button className="admin-btn" onClick={handleDiscard} disabled={publishing}>Discard</button>
                <button className="admin-btn admin-btn--primary" onClick={handlePublish} disabled={publishing}>
                  {publishing ? 'Publishing…' : 'Publish to website'}
                </button>
              </div>
            </>
          ) : (
            <span>{notice}</span>
          )}
        </div>
      )}
      {dirty && notice && <p className="admin-notice">{notice}</p>}

      <div className="admin-controls">
        <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ Add item</button>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Search items…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="admin-list">
        {visible.map((p) => (
          <li key={p.id} className={`admin-row ${p.sold ? 'is-sold' : ''}`}>
            <div
              className="admin-thumb"
              style={{ backgroundImage: `url('${pendingImages[`public/${p.image}`] ? `data:image/jpeg;base64,${pendingImages[`public/${p.image}`]}` : `/${p.image}`}')` }}
            />
            <div className="admin-row-info">
              <p className="admin-row-name">
                {p.name}
                {p.sold && <span className="admin-chip admin-chip--sold">Sold</span>}
                {p.tags.includes('new') && <span className="admin-chip admin-chip--new">New</span>}
              </p>
              <p className="admin-row-meta">{CATEGORY_LABELS[p.category]} · {SLOT_LABELS[p.slot]} · {p.price}</p>
            </div>
            <div className="admin-row-actions">
              <button className="admin-btn admin-btn--small" onClick={() => toggleSold(p)}>
                {p.sold ? 'Mark available' : 'Mark sold'}
              </button>
              <button className="admin-btn admin-btn--small" onClick={() => toggleNew(p)}>
                {p.tags.includes('new') ? 'Not new' : 'Mark new'}
              </button>
              <button className="admin-btn admin-btn--small" onClick={() => openEdit(p)}>Edit</button>
              <button className="admin-btn admin-btn--small admin-btn--danger" onClick={() => deleteProduct(p)}>Delete</button>
            </div>
          </li>
        ))}
        {visible.length === 0 && <li className="admin-empty">No items match.</li>}
      </ul>

      {form && (
        <div className="admin-form-overlay" onClick={(e) => { if (e.target === e.currentTarget) setForm(null); }}>
          <form className="admin-form" onSubmit={saveForm}>
            <h2>{form.id ? `Edit: ${form.name}` : 'Add a new item'}</h2>

            <label>
              Name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Red Cowl Spaghetti Maxi" />
            </label>

            <label>
              Price
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. KES 1,800 — or leave as Ask Carolyne" />
            </label>

            <label>
              Description
              <textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Honest description: colour, fabric, cut…" />
            </label>

            <div className="admin-form-row">
              <label>
                Category
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
              <label>
                Type
                <select value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })}>
                  {Object.entries(SLOT_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
            </div>

            <fieldset className="admin-tags">
              <legend>Show in</legend>
              {Object.entries(TAG_LABELS).map(([key, label]) => (
                <label key={key} className="admin-check">
                  <input
                    type="checkbox"
                    checked={form.tags.includes(key)}
                    onChange={(e) => setForm({
                      ...form,
                      tags: e.target.checked ? [...form.tags, key] : form.tags.filter((t) => t !== key),
                    })}
                  />
                  {label}
                </label>
              ))}
              <label className="admin-check">
                <input type="checkbox" checked={form.sold} onChange={(e) => setForm({ ...form, sold: e.target.checked })} />
                Sold
              </label>
            </fieldset>

            <div className="admin-form-row">
              <label>
                Front photo {form.id ? '(replace)' : ''}
                <input type="file" accept="image/*" onChange={(e) => handlePhoto(e, 'front')} />
                {form.front && <span className="admin-photo-preview" style={{ backgroundImage: `url('${form.front.dataUrl}')` }} />}
              </label>
              <label>
                Back photo {form.id ? '(replace)' : '(optional)'}
                <input type="file" accept="image/*" onChange={(e) => handlePhoto(e, 'back')} />
                {form.back && <span className="admin-photo-preview" style={{ backgroundImage: `url('${form.back.dataUrl}')` }} />}
              </label>
            </div>

            {formError && <p className="admin-error">{formError}</p>}

            <div className="admin-form-actions">
              <button type="button" className="admin-btn" onClick={() => setForm(null)}>Cancel</button>
              <button type="submit" className="admin-btn admin-btn--primary" disabled={busyPhoto}>
                {busyPhoto ? 'Processing photo…' : form.id ? 'Save changes' : 'Add to catalog'}
              </button>
            </div>
            <p className="admin-form-hint">Saving keeps the change on this page — press “Publish to website” when you're done with all your edits.</p>
          </form>
        </div>
      )}
    </div>
  );
}
