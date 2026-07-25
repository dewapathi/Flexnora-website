'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 40, mass: 0.3 });

  useEffect(() => {
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[1100] h-[2px] origin-left bg-gradient-to-r from-electric-blue via-royal-blue to-purple"
      style={{ scaleX }}
    />
  );
}
