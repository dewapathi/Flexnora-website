'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ACCENT_CLASSES = {
  indigo: 'bg-indigo/10 text-indigo',
  cyan: 'bg-cyan/10 text-cyan',
  violet: 'bg-violet/10 text-violet',
  green: 'bg-green/10 text-green',
  amber: 'bg-amber/10 text-amber',
} as const;

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  delta,
  trend = 'up',
  accent = 'indigo',
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  delta?: string;
  trend?: 'up' | 'down';
  accent?: 'indigo' | 'cyan' | 'violet' | 'green' | 'amber';
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const dur = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setDisplay(Math.floor(p * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <Card className="rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-start justify-between px-1">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1.5 font-display text-3xl font-bold text-foreground">
              {display}
              {suffix}
            </p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_CLASSES[accent]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {delta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-3 flex items-center gap-1 px-1 text-xs font-semibold ${
              trend === 'up' ? 'text-green' : 'text-red-500'
            }`}
          >
            {trend === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {delta}
          </motion.div>
        )}
      </Card>
    </div>
  );
}
