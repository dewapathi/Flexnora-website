'use client';
import { useEffect, useRef } from 'react';
import { Container } from './ui';

const stats = [
  { count: 50, sfx: '+', label: 'Projects Delivered' },
  { count: 98, sfx: '%', label: 'Client Satisfaction' },
  { count: 15, sfx: '+', label: 'Industry Awards' },
  { count: 5, sfx: 'yr', label: 'Years of Excellence' },
];

export default function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          grid.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
            const target = parseInt(el.dataset.count || '0', 10);
            const sfx = el.dataset.sfx || '';
            if (isNaN(target)) return;
            const dur = 1800;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              el.textContent = Math.floor(p * target) + (p === 1 ? sfx : '');
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
          co.unobserve(grid);
        });
      },
      { threshold: 0.5 }
    );

    co.observe(grid);
    return () => co.disconnect();
  }, []);

  return (
    <section aria-label="Statistics" className="py-20">
      <Container>
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-surface-3 shadow-card lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-bg-1 px-8 py-[50px] text-center transition-colors hover:bg-bg-2">
              <span
                data-count={s.count}
                data-sfx={s.sfx}
                className="mb-2.5 block bg-gradient-to-br from-text to-lilac bg-clip-text font-display text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-none tracking-[-2px] text-transparent"
              >
                0
              </span>
              <div className="text-sm font-medium text-text-3">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
