'use client';
import { useEffect, useRef } from 'react';

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
    <section className="st-s" id="stats" aria-label="Statistics">
      <div className="container">
        <div className="stg rv" ref={gridRef}>
          {stats.map((s, i) => (
            <div key={i} className="stc">
              <span className="stn" data-count={s.count} data-sfx={s.sfx}>0</span>
              <div className="stl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
