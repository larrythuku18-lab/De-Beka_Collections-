document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Page loader: brief logo reveal, then fade out
const pageLoader = document.getElementById('pageLoader');
function hideLoader() {
  pageLoader.classList.add('is-hidden');
}
if (reduceMotion) {
  hideLoader();
} else {
  window.addEventListener('load', () => setTimeout(hideLoader, 700));
  setTimeout(hideLoader, 2500); // safety net if load never fires promptly
}

// Animated starfield in the hero banner
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const hero = canvas.parentElement;
let stars = [];

function resizeCanvas() {
  canvas.width = hero.clientWidth;
  canvas.height = hero.clientHeight;
  const count = Math.floor((canvas.width * canvas.height) / 6000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.4 + 0.3,
    speed: Math.random() * 0.15 + 0.03,
    phase: Math.random() * Math.PI * 2,
    tint: Math.random() < 0.3 ? '232, 18, 126' : Math.random() < 0.5 ? '44, 79, 214' : '255, 255, 255'
  }));
}

function drawStars(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    const twinkle = 0.5 + 0.5 * Math.sin(time / 800 + star.phase);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${star.tint}, ${0.3 + twinkle * 0.7})`;
    ctx.fill();

    if (!reduceMotion) {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }
  }
}

function animate(time) {
  drawStars(time);
  requestAnimationFrame(animate);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(animate);

// Theme toggle (persisted in localStorage)
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('debeka-theme');
const initialTheme = storedTheme || 'dark';
document.documentElement.setAttribute('data-theme', initialTheme);
themeToggle.textContent = initialTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('debeka-theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// Scroll-triggered reveal animations
const revealEls = document.querySelectorAll('[data-reveal]');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// Category filter rail + category tiles
const filterPills = document.querySelectorAll('.filter-pill');
const productCards = document.querySelectorAll('.product-card');

function setFilter(filter) {
  filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === filter));
  productCards.forEach(card => {
    const matches = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !matches);
  });
}

filterPills.forEach(pill => {
  pill.addEventListener('click', () => setFilter(pill.dataset.filter));
});

document.querySelectorAll('[data-go-filter]').forEach(tile => {
  tile.addEventListener('click', () => {
    setFilter(tile.dataset.goFilter);
    document.getElementById('shop').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

// New Arrivals carousel
const carousel = document.getElementById('newArrivalsCarousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

carouselPrev.addEventListener('click', () => {
  carousel.scrollBy({ left: -260, behavior: reduceMotion ? 'auto' : 'smooth' });
});
carouselNext.addEventListener('click', () => {
  carousel.scrollBy({ left: 260, behavior: reduceMotion ? 'auto' : 'smooth' });
});

carousel.querySelectorAll('.carousel-card').forEach(card => {
  card.addEventListener('click', () => openQuickview(card));
});

// Build an in-memory catalog from the real product cards already on the page
const PRODUCTS = Array.from(productCards).map(card => ({ ...card.dataset }));

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function renderMiniCard(product) {
  const el = document.createElement('div');
  el.className = 'mini-card';
  el.innerHTML = `
    <div class="mini-card-image" style="background-image:url('${product.image}')"></div>
    <div class="mini-card-info">
      <p>${product.name}</p>
      <p class="price">${product.price}</p>
    </div>
  `;
  el.addEventListener('click', () => {
    const card = Array.from(productCards).find(c => c.dataset.id === product.id);
    if (card) openQuickview(card);
  });
  return el;
}

// Recently viewed (tracked in localStorage as we open quick views)
const RECENTLY_VIEWED_KEY = 'debeka-recently-viewed';

function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
  } catch {
    return [];
  }
}

function addRecentlyViewed(id) {
  let ids = getRecentlyViewed().filter(existingId => existingId !== id);
  ids.unshift(id);
  ids = ids.slice(0, 4);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(ids));
}

function renderRecentlyViewed() {
  const ids = getRecentlyViewed();
  const section = document.getElementById('recentlyViewed');
  const row = document.getElementById('recentlyViewedRow');
  const items = ids.map(findProduct).filter(Boolean);
  if (items.length === 0) {
    section.hidden = true;
    return;
  }
  row.innerHTML = '';
  items.forEach(product => row.appendChild(renderMiniCard(product)));
  section.hidden = false;
}

renderRecentlyViewed();

// Quick view panel
const quickviewOverlay = document.getElementById('quickviewOverlay');
const quickviewImage = document.getElementById('quickviewImage');
const quickviewName = document.getElementById('quickviewName');
const quickviewPrice = document.getElementById('quickviewPrice');
const quickviewDesc = document.getElementById('quickviewDesc');
const quickviewWhatsapp = document.getElementById('quickviewWhatsapp');
const quickviewClose = document.getElementById('quickviewClose');
const sizeButtons = document.querySelectorAll('.size-options button');
const relatedItems = document.getElementById('relatedItems');
const relatedItemsRow = document.getElementById('relatedItemsRow');

function openQuickview(card) {
  const { id, name, price, desc, image, category } = card.dataset;
  quickviewImage.style.backgroundImage = `url('${image}')`;
  quickviewName.textContent = name;
  quickviewPrice.textContent = price;
  quickviewDesc.textContent = desc;
  quickviewWhatsapp.href = `https://wa.me/254728871796?text=${encodeURIComponent(
    `Hi! I'm interested in the ${name} (${price}). Is it available?`
  )}`;
  sizeButtons.forEach(btn => btn.classList.remove('selected'));

  const related = PRODUCTS.filter(p => p.category === category && p.id !== id).slice(0, 3);
  if (related.length > 0) {
    relatedItemsRow.innerHTML = '';
    related.forEach(product => relatedItemsRow.appendChild(renderMiniCard(product)));
    relatedItems.hidden = false;
  } else {
    relatedItems.hidden = true;
  }

  if (id) {
    addRecentlyViewed(id);
    renderRecentlyViewed();
  }

  quickviewOverlay.classList.add('open');
}

productCards.forEach(card => {
  card.querySelector('[data-action="quickview"]').addEventListener('click', () => openQuickview(card));
});

sizeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

quickviewClose.addEventListener('click', () => quickviewOverlay.classList.remove('open'));
quickviewOverlay.addEventListener('click', e => {
  if (e.target === quickviewOverlay) quickviewOverlay.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') quickviewOverlay.classList.remove('open');
});

// Review CTA on the testimonials placeholder
document.getElementById('reviewWhatsapp').href =
  `https://wa.me/254728871796?text=${encodeURIComponent("Hi! I'd like to share a review of my De'Beka Collections purchase.")}`;
