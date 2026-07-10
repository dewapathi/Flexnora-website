'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { GlassCard, StatCounter } from './ui';

const chartData = [
  { v: 18 }, { v: 22 }, { v: 20 }, { v: 27 }, { v: 25 }, { v: 32 }, { v: 30 }, { v: 38 }, { v: 44 }, { v: 41 }, { v: 49 },
];

function Panel({
  children,
  className = '',
  depth,
  sx,
  sy,
  floatDuration,
}: {
  children: React.ReactNode;
  className?: string;
  depth: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  floatDuration: number;
}) {
  const rotateX = useTransform(sy, [-0.5, 0.5], [depth * 6, depth * -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [depth * -6, depth * 6]);
  const tx = useTransform(sx, [-0.5, 0.5], [depth * -8, depth * 8]);
  const ty = useTransform(sy, [-0.5, 0.5], [depth * -8, depth * 8]);

  return (
    <motion.div
      style={{ rotateX, rotateY, x: tx, y: ty }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function HeroVisualStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    setParallaxEnabled(mq.matches);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!parallaxEnabled) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1000 }}
      className="relative mx-auto hidden aspect-square w-full max-w-[440px] lg:block"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-royal-blue) 0%, transparent 70%)' }}
      />

      {/* Back panel — system status */}
      <Panel depth={0.5} sx={sx} sy={sy} floatDuration={6} className="left-[6%] top-[10%] w-[72%]">
        <GlassCard className="p-5">
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-widest text-text-3">System Status</p>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green" />
            <span className="text-sm font-medium text-text">Production &middot; All systems operational</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-electric-blue to-royal-blue" />
          </div>
          <p className="mt-2 text-xs text-text-3">99.98% uptime</p>
        </GlassCard>
      </Panel>

      {/* Middle panel — code snippet */}
      <Panel depth={0.75} sx={sx} sy={sy} floatDuration={5} className="right-[2%] top-[30%] w-[62%]">
        <GlassCard className="overflow-hidden p-0">
          <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
          <pre className="px-4 py-4 font-mono text-[0.72rem] leading-relaxed">
            <span className="text-royal-blue">export</span> <span className="text-royal-blue">async function</span>{' '}
            <span className="text-electric-blue">deploy</span>() {'{'}
            {'\n'}  <span className="text-text-3">{'// ship to production'}</span>
            {'\n'}  <span className="text-royal-blue">await</span> pipeline.<span className="text-electric-blue">run</span>();
            {'\n'}  <span className="text-royal-blue">return</span> <span className="text-green">{"'live'"}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block h-3.5 w-[7px] translate-y-[2px] bg-electric-blue"
            />
            {'\n'}{'}'}
          </pre>
        </GlassCard>
      </Panel>

      {/* Front panel — mini dashboard */}
      <Panel depth={1} sx={sx} sy={sy} floatDuration={4} className="left-[10%] top-[54%] w-[78%]">
        <GlassCard className="p-5">
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
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="v" stroke="var(--color-electric-blue)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </Panel>
    </div>
  );
}
