'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight, Star } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

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

    const N = Math.min(55, Math.floor((W * H) / 18000));
    type Pt = { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number };
    const pts: Pt[] = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
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
            cx!.strokeStyle = p.c + 0.15 * (1 - d2 / 14400) + ')';
            cx!.lineWidth = 0.5;
            cx!.stroke();
          }
        }
      });
      aid = requestAnimationFrame(draw);
    }
    draw();

    const heroEl = cv.closest('section');
    let visObs: IntersectionObserver | null = null;
    if (heroEl) {
      visObs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) { if (!aid) draw(); }
          else if (aid) { cancelAnimationFrame(aid); aid = null; }
        },
        { threshold: 0 }
      );
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
    <section
      id="top"
      aria-label="Hero"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pt-20"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[30%] z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse,rgba(99,102,241,0.35) 0%,rgba(139,92,246,0.18) 40%,transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-[5%] top-[10%] z-0 h-[420px] w-[420px] animate-drift rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(6,182,212,0.22) 0%,transparent 70%)',
          animationDelay: '-5s',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[5%] left-[8%] z-0 h-[380px] w-[380px] animate-drift rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 70%)',
          animationDelay: '-10s',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px,transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-[960px] py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo/25 bg-indigo/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-lilac">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan" />
              Global Digital Solutions · Colombo, Sri Lanka
            </span>
          </motion.div>

          <h1 className="mb-7 break-words font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-1px] text-text sm:text-[3.5rem] sm:tracking-[-2px] md:text-[5rem] lg:text-[6.5rem] lg:leading-[1.0]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                We Build World-Class
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient"
              >
                Software Products.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-11 max-w-[620px] text-[clamp(1.05rem,1.5vw,1.2rem)] text-text-2"
          >
            FLEXNORA designs and engineers custom software, mobile apps, and AI-powered products for
            ambitious businesses across Australia, Europe, the US, and the Middle East — from first
            prototype to production scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-[70px] flex flex-wrap justify-center gap-3.5"
          >
            <MagneticButton>
              <a
                href="#cta-fin"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-[42px] py-[18px] text-[1.05rem] font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(29,78,216,0.5)] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_50px_rgba(99,102,241,0.5)]"
              >
                <CalendarCheck className="h-5 w-5" /> Book Free Consultation
              </a>
            </MagneticButton>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-2 px-[42px] py-[18px] text-[1.05rem] font-semibold text-text backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-3"
            >
              Explore Solutions <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-text-3"
          >
            <div className="flex items-center">
              {['/images/ranuli.png', '/images/aloka.png', '/images/theekshani.png'].map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="Client"
                  width={34}
                  height={34}
                  className={`h-[34px] w-[34px] rounded-full border-2 border-bg bg-bg-2 object-cover ${i > 0 ? '-ml-2.5' : ''}`}
                />
              ))}
            </div>
            <p className="text-text-2">
              <strong className="text-text">50+ projects</strong> delivered
            </p>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <p className="text-text-2">
              <strong className="text-text">98%</strong> satisfaction
            </p>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <p className="flex items-center gap-1 text-text-2">
              <Star className="h-3.5 w-3.5 fill-amber text-amber" /> <strong className="text-text">5.0</strong> rated
            </p>
          </motion.div>

          <div
            aria-hidden="true"
            className="mx-auto mt-16 flex w-fit animate-bob flex-col items-center gap-2 text-[0.75rem] font-medium tracking-wider text-text-3"
          >
            SCROLL
            <span className="block h-10 w-px bg-gradient-to-b from-indigo to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
