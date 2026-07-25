'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const SectionAtmosphereScene = dynamic(
  () => import('./SectionAtmosphereScene').then((m) => m.SectionAtmosphereScene),
  { ssr: false, loading: () => null }
);

const ACCENTS = {
  blue: '#2e6bff',
  purple: '#a855f7',
  amber: '#f59e0b',
} as const;

/**
 * Ambient 3D backdrop reused behind most homepage sections — glowing wireframe shapes, a faint
 * starfield, and a few drifting "firefly" particles, matching the visual language already built
 * for the Hero globe, Portfolio corridor, and World map. Purely decorative (never intercepts
 * clicks) and gated the same way every other 3D feature in this codebase is: desktop + WebGL +
 * motion-ok only, nothing extra for mobile/reduced-motion/no-WebGL.
 *
 * Mounting one WebGL canvas per section (there are ~11 of these on the homepage) risks exceeding
 * the browser's concurrent-context limit if they all stayed mounted at once, so each instance only
 * renders its Canvas while its own wrapper is within `rootMargin` of the viewport, and unmounts
 * once scrolled well past — only a couple are ever alive at the same time regardless of page length.
 */
export function SectionAtmosphere({ accent = 'blue' }: { accent?: keyof typeof ACCENTS }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [use3D, setUse3D] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);

  useLayoutEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webglOK = false;
    try {
      const t = document.createElement('canvas');
      webglOK = !!(t.getContext('webgl2') || t.getContext('webgl'));
    } catch {
      webglOK = false;
    }
    setUse3D(isDesktop && !reduced && webglOK);
  }, []);

  useEffect(() => {
    if (!use3D || !wrapperRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), {
      rootMargin: '400px 0px',
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [use3D]);

  useEffect(() => {
    if (!use3D) return;
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };
    document.addEventListener('mousemove', onMouse, { passive: true });
    return () => document.removeEventListener('mousemove', onMouse);
  }, [use3D]);

  if (!use3D) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {nearViewport && <SectionAtmosphereScene accentColor={ACCENTS[accent]} mouseRef={mouseRef} />}
    </div>
  );
}
