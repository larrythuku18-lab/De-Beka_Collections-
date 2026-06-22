document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Animated starfield in the hero banner
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const hero = canvas.parentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    tint: Math.random() < 0.25 ? '232, 77, 138' : '255, 255, 255'
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

// Category filter rail
const filterPills = document.querySelectorAll('.filter-pill');
const productCards = document.querySelectorAll('.product-card');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    productCards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

// Quick view panel
const quickviewOverlay = document.getElementById('quickviewOverlay');
const quickviewImage = document.getElementById('quickviewImage');
const quickviewName = document.getElementById('quickviewName');
const quickviewPrice = document.getElementById('quickviewPrice');
const quickviewDesc = document.getElementById('quickviewDesc');
const quickviewWhatsapp = document.getElementById('quickviewWhatsapp');
const quickviewClose = document.getElementById('quickviewClose');
const sizeButtons = document.querySelectorAll('.size-options button');

function openQuickview(card) {
  const { name, price, desc, image } = card.dataset;
  quickviewImage.style.backgroundImage = `url('${image}')`;
  quickviewName.textContent = name;
  quickviewPrice.textContent = price;
  quickviewDesc.textContent = desc;
  quickviewWhatsapp.href = `https://wa.me/254714413777?text=${encodeURIComponent(
    `Hi! I'm interested in the ${name} (${price}). Is it available?`
  )}`;
  sizeButtons.forEach(btn => btn.classList.remove('selected'));
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
