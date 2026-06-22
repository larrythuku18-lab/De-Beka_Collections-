import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars = [];
    let frameId;

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
        tint: Math.random() < 0.3 ? '232, 18, 126' : Math.random() < 0.5 ? '44, 79, 214' : '255, 255, 255',
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
      frameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas id="starfield" ref={canvasRef} />;
}
