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
