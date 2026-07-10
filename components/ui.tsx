'use client';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, dot = false }: { children: ReactNode; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo/25 bg-indigo/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-200">
      {dot && <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan" />}
      {children}
    </span>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="mb-3.5 text-xs font-bold uppercase tracking-[2px] text-indigo">{children}</p>;
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}

export function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-surface shadow-card backdrop-blur-2xl dark:border-white/8 ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.2,
  className = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const start = performance.now();
    const durMs = duration * 1000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / durMs, 1);
      setDisplay((p * value).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function SectionHeader({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: ReactNode;
  desc?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto mb-16 max-w-2xl text-center md:mb-[70px]">
      <Kicker>{kicker}</Kicker>
      <h2 className="mb-4 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text">
        {title}
      </h2>
      {desc && <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-text-2">{desc}</p>}
    </Reveal>
  );
}
