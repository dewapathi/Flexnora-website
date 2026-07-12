'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight, Star } from 'lucide-react';
import { MagneticCTA } from './MagneticButton';
import { HeroVisualStack } from './HeroVisualStack';
import { GlassCard, StatCounter } from './ui';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let W = 0, H = 0;
    let aid: number | null = null;
    const C = ['rgba(46,107,255,', 'rgba(79,70,229,', 'rgba(168,85,247,'];

    function resize() {
      W = cv!.width = cv!.offsetWidth;
      H = cv!.height = cv!.offsetHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const N = Math.min(38, Math.floor((W * H) / 24000));
    type Pt = { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number };
    const pts: Pt[] = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c: C[Math.floor(Math.random() * C.length)],
        a: Math.random() * 0.3 + 0.08,
      });
    }

    let mx = W / 2, my = H / 2;
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMouse, { passive: true });

    function draw() {
      cx!.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) { p.vx += (dx / d) * 0.008; p.vy += (dy / d) * 0.008; }
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
          if (d2 < 12000) {
            cx!.beginPath();
            cx!.moveTo(p.x, p.y);
            cx!.lineTo(q.x, q.y);
            cx!.strokeStyle = p.c + 0.09 * (1 - d2 / 12000) + ')';
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
      className="relative flex min-h-screen scroll-mt-20 flex-col items-center justify-center overflow-hidden pt-32 pb-16"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 xl:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-electric-blue/25 bg-electric-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-lilac">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-electric-blue" />
              Global Digital Solutions &middot; Colombo, Sri Lanka
            </span>
          </motion.div>

          <h1 className="mb-7 break-words font-display text-[2.5rem] font-extrabold leading-[1.06] tracking-[-1px] text-text sm:text-[3.1rem] sm:tracking-[-2px] lg:text-[4rem] xl:text-[4.6rem]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                The technology partner
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient-premium"
              >
                ambitious companies keep.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-11 max-w-[540px] text-[clamp(1.02rem,1.3vw,1.15rem)] text-text-2"
          >
            FLEXNORA partners with founders and enterprise teams across Australia, the UK, North
            America, and the Middle East to design, engineer, and scale the software that carries
            their business forward — from first prototype to production infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-[60px] flex flex-wrap gap-3.5"
          >
            <MagneticCTA
              href="#cta-fin"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-electric-blue to-royal-blue px-[38px] py-[17px] text-[1.02rem] font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:scale-[1.08]"
            >
              <CalendarCheck className="h-5 w-5" /> Book Free Consultation
            </MagneticCTA>
            <MagneticCTA
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-2 px-[38px] py-[17px] text-[1.02rem] font-semibold text-text backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-3 hover:scale-[1.08]"
            >
              Explore Solutions <ArrowRight className="h-5 w-5" />
            </MagneticCTA>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-text-3"
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
              <strong className="text-text">20+ projects</strong> delivered
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
        </div>

        <div>
          <HeroVisualStack />
          {/* Simplified single panel below lg — no fan-stack, no parallax */}
          <GlassCard className="p-5 lg:hidden">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-text-3">Delivery Velocity</p>
                <p className="mt-1 font-display text-2xl font-bold text-text">
                  <StatCounter value={1.2} decimals={1} suffix="M" prefix="$" /> shipped
                </p>
              </div>
              <p className="text-sm font-semibold text-green">
                +<StatCounter value={342} suffix="%" />
              </p>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-electric-blue to-royal-blue" />
            </div>
            <p className="mt-2 text-xs text-text-3">99.98% uptime</p>
          </GlassCard>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative z-10 mx-auto mt-6 flex w-fit animate-bob flex-col items-center gap-2 text-[0.75rem] font-medium tracking-wider text-text-3"
      >
        SCROLL
        <span className="block h-10 w-px bg-gradient-to-b from-electric-blue to-transparent" />
      </div>
    </section>
  );
}
