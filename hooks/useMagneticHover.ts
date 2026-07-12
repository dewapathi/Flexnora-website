'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function useMagneticHover({
  range = 70,
  max = 8,
  contentMax = 11,
}: {
  range?: number;
  max?: number;
  contentMax?: number;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const contentX = useMotionValue(0);
  const contentY = useMotionValue(0);

  const spring = { stiffness: 200, damping: 15, mass: 0.4 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const contentSpringX = useSpring(contentX, spring);
  const contentSpringY = useSpring(contentY, spring);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine) and (hover: hover)').matches && !reduceMotion);
  }, [reduceMotion]);

  function onMouseMove(e: React.MouseEvent) {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(relX, relY);
    if (dist < range) {
      const pull = Math.min(dist, range) / range;
      const angle = Math.atan2(relY, relX);
      x.set(Math.cos(angle) * pull * max);
      y.set(Math.sin(angle) * pull * max);
      contentX.set(Math.cos(angle) * pull * contentMax);
      contentY.set(Math.sin(angle) * pull * contentMax);
    }
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    contentX.set(0);
    contentY.set(0);
  }

  return {
    ref,
    enabled,
    style: { x: springX, y: springY },
    contentStyle: { x: contentSpringX, y: contentSpringY },
    handlers: { onMouseMove, onMouseLeave },
  };
}
