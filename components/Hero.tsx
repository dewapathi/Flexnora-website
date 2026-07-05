'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let W = 0, H = 0;
    let aid: number | null = null;
    const C = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(6,182,212,'];

    function resize() {
      W = cv!.width = cv!.offsetWidth;
      H = cv!.height = cv!.offsetHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const N = Math.min(55, Math.floor(W * H / 18000));
    type Pt = { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number };
    const pts: Pt[] = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        c: C[Math.floor(Math.random() * C.length)],
        a: Math.random() * 0.5 + 0.1,
      });
    }

    let mx = W / 2, my = H / 2;
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMouse, { passive: true });

    function draw() {
      cx!.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) { p.vx += (dx / d) * 0.01; p.vy += (dy / d) * 0.01; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        cx!.beginPath();
        cx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx!.fillStyle = p.c + p.a + ')';
        cx!.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx2 = p.x - q.x, dy2 = p.y - q.y, d2 = dx2 * dx2 + dy2 * dy2;
          if (d2 < 14400) {
            cx!.beginPath();
            cx!.moveTo(p.x, p.y);
            cx!.lineTo(q.x, q.y);
            cx!.strokeStyle = p.c + (0.15 * (1 - d2 / 14400)) + ')';
            cx!.lineWidth = 0.5;
            cx!.stroke();
          }
        }
      });
      aid = requestAnimationFrame(draw);
    }
    draw();

    const heroEl = cv.closest('.hero');
    let visObs: IntersectionObserver | null = null;
    if (heroEl) {
      visObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { if (!aid) draw(); }
        else { if (aid) { cancelAnimationFrame(aid); aid = null; } }
      }, { threshold: 0 });
      visObs.observe(heroEl);
    }

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouse);
      if (aid) cancelAnimationFrame(aid);
      visObs?.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Hero">
      <canvas id="hc" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="hg" aria-hidden="true"></div>
      <div className="container">
        <div className="hi">
          <div className="rv" style={{ marginBottom: '28px' }}>
            <div className="badge">
              <span className="dot"></span>Your Complete Technology Partner · Colombo, Sri Lanka
            </div>
          </div>
          <h1 className="ht rv d1">
            We Become Your<br /><span className="g">Technology Team.</span>
          </h1>
          <p className="hs rv d2">
            Focus on your business. We&apos;ll handle the technology. FLEXNORA is your outsourced IT
            department — building, maintaining, scaling, and securing your entire digital
            infrastructure.
          </p>
          <div className="ha rv d3">
            <a href="#cta-fin" className="btn btn-p btn-lg">
              <i className="fa-solid fa-calendar-check"></i> Book Free Consultation
            </a>
            <a href="#itp" className="btn btn-g btn-lg">
              See How It Works <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="hpr rv d4">
            <div className="hav">
              <img src="/images/ranuli.png" alt="Client" loading="lazy" />
              <img src="/images/aloka.png" alt="Client" loading="lazy" />
              <img src="/images/theekshani.png" alt="Client" loading="lazy" />
            </div>
            <p className="hpr-t"><strong>50+ projects</strong> delivered</p>
            <div className="hpr-s"></div>
            <p className="hpr-t"><strong>98%</strong> satisfaction</p>
            <div className="hpr-s"></div>
            <p className="hpr-t">
              <i className="fa-solid fa-star" style={{ color: '#fbbf24' }}></i>{' '}
              <strong>5.0</strong> rated
            </p>
          </div>
        </div>
      </div>
      <div className="hscroll" aria-hidden="true">
        SCROLL<span></span>
      </div>
    </section>
  );
}
