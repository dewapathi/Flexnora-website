'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor="interactive"]';
const BASE_SIZE = 14;
const HOVER_SIZE = 64;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const scale = useMotionValue(BASE_SIZE / HOVER_SIZE);
  const springScale = useSpring(scale, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('marketing-cursor-none');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      const isHovering = !!target.closest?.(INTERACTIVE_SELECTOR);
      setHovering(isHovering);
      scale.set(isHovering ? 1 : BASE_SIZE / HOVER_SIZE);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });

    return () => {
      document.documentElement.classList.remove('marketing-cursor-none');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[10000] rounded-full transition-colors duration-200 ${
        hovering
          ? 'border border-white/25 shadow-[0_0_18px_rgba(255,255,255,0.15)]'
          : 'mix-blend-difference bg-white'
      }`}
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        width: HOVER_SIZE,
        height: HOVER_SIZE,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
}
