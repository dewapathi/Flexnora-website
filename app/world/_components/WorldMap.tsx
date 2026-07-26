'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { regions } from '../_data/regions';

const WorldMapScene = dynamic(() => import('./WorldMapScene').then((m) => m.WorldMapScene), {
  ssr: false,
  loading: () => null,
});

// Soft, hand-drawn-feeling "landmass" blobs — a functional stand-in for the real illustrated map
// the user will supply later (Phase 2). Built entirely from SVG paths, no external art.
const LANDMASSES = [
  'M 5,35 Q 15,10 35,15 Q 50,20 45,35 Q 55,45 40,55 Q 25,60 15,50 Q 0,45 5,35 Z',
  'M 55,15 Q 70,5 88,15 Q 95,25 90,40 Q 80,50 65,45 Q 50,40 55,15 Z',
  'M 10,60 Q 25,55 40,65 Q 50,75 40,85 Q 25,92 12,85 Q 2,75 10,60 Z',
  'M 45,60 Q 60,55 78,65 Q 88,75 78,88 Q 62,95 48,85 Q 38,72 45,60 Z',
];

// 12 waypoints, each getting comfortable dwell time before the next takes over (the same lesson
// learned and fixed on the Portfolio corridor: too little scroll distance per stop feels broken,
// not fast). ~230px of scroll per node here (lighter than the Portfolio's ~400px, since each
// waypoint is just a label, not a full card) works out to roughly this section height.
const SECTION_HEIGHT_VH = 320;

export function WorldMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const use3DRef = useRef(false);
  const [use3D, setUse3D] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

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
    const result = isDesktop && !reduced && webglOK;
    use3DRef.current = result;
    setUse3D(result);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      scrollRef.current = v;
    });
    return unsubscribe;
  }, [scrollYProgress]);

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

  return (
    <>
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[1200px] px-6"
        style={use3D ? { height: `${SECTION_HEIGHT_VH}vh` } : undefined}
      >
        <div className={use3D ? 'sticky top-0 flex h-screen items-center' : ''}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border shadow-card">
            {use3D ? (
              <>
                {/* The scene's Canvas is transparent (`gl={{alpha:true}}`) so its glow blends
                    with whatever is behind it — without an explicit dark backdrop here, light
                    theme's white page background shows through instead of the intended
                    atmospheric night-sky look. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 40%, rgba(46,107,255,0.12), transparent 60%), linear-gradient(180deg, #0a0e1a 0%, #05070f 100%)',
                  }}
                />
                <WorldMapScene scrollRef={scrollRef} mouseRef={mouseRef} />
              </>
            ) : (
              <>
                {/* "Ocean" backdrop */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 40%, rgba(46,107,255,0.12), transparent 60%), linear-gradient(180deg, #0a0e1a 0%, #05070f 100%)',
                  }}
                />
                <div aria-hidden="true" className="bg-noise absolute inset-0 opacity-40" />

                {/* Landmasses */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  {LANDMASSES.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill="url(#landGradient)"
                      stroke="rgba(245,158,11,0.35)"
                      strokeWidth="0.3"
                    />
                  ))}
                  <defs>
                    <linearGradient id="landGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(245,158,11,0.16)" />
                      <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Region hotspots — real links, crawlable and keyboard-reachable with no JS required */}
                {regions.map((region) => (
                  <Link
                    key={region.slug}
                    href={region.route}
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                    style={{ left: `${region.hotspot.xPct}%`, top: `${region.hotspot.yPct}%` }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.25 }}
                      whileFocus={{ scale: 1.25 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-amber/40 bg-amber/15 text-amber shadow-[0_0_16px_rgba(245,158,11,0.35)] backdrop-blur-sm group-hover:border-amber group-hover:bg-amber/25"
                    >
                      <MapPin className="h-4 w-4" />
                    </motion.span>
                    <span className="whitespace-nowrap rounded-full bg-bg/80 px-2.5 py-1 text-xs font-semibold text-text opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      {region.label}
                    </span>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Native <details> — expands/collapses with zero JS, always in the DOM for crawlers,
          screen readers, and anyone who'd rather not hunt for waypoints along the flythrough. */}
      <div className="mx-auto max-w-[1200px] px-6 pt-8">
        <details className="group rounded-2xl border border-border bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-sm font-semibold text-text">
            View all destinations as a list
            <ChevronDown className="h-4 w-4 text-text-3 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="grid gap-1 border-t border-border px-6 py-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <li key={region.slug}>
                <Link
                  href={region.route}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
                >
                  {region.label}
                  <span className="mt-0.5 block text-xs text-text-3">{region.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </>
  );
}
