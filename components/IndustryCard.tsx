'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Clock } from 'lucide-react';
import type { Industry } from '@/lib/demo/industries';

export function IndustryCard({ industry: s }: { industry: Industry }) {
  const isLive = s.status === 'live';
  const isExternal = Boolean(s.externalUrl);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group h-full overflow-hidden rounded-3xl border border-border bg-bg-2 shadow-card transition-colors hover:border-indigo/40"
    >
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${s.grad} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          {isExternal ? (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-indigo">
              <ArrowUpRight className="h-3 w-3" /> Live Client Site
            </span>
          ) : isLive ? (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-indigo">
              <Sparkles className="h-3 w-3" /> Live Demo
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              <Clock className="h-3 w-3" /> Coming Soon
            </span>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-2/3 rounded-full bg-white/25" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/15" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-10 rounded-lg bg-white/15" />
            <div className="h-10 rounded-lg bg-white/10" />
            <div className="h-10 rounded-lg bg-white/10" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
          <s.icon className="h-6 w-6" />
        </div>
      </div>

      <div className="p-7">
        <h3 className="mb-3 text-lg font-bold text-text">{s.name}</h3>
        <ul className="mb-5 space-y-1.5">
          {s.features.slice(0, 3).map((f) => (
            <li key={f} className="text-sm text-text-2">
              {f}
            </li>
          ))}
        </ul>
        <div className="mb-5 flex flex-wrap gap-2">
          {s.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-indigo/20 bg-indigo/10 px-2.5 py-1 text-xs font-semibold text-lilac"
            >
              {t}
            </span>
          ))}
        </div>
        <Link
          href={isExternal ? s.externalUrl! : `/demo/${s.slug}`}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo transition-transform hover:gap-2.5"
        >
          {isExternal ? 'Visit Live Site' : isLive ? '✨ Explore Live Demo' : 'Preview & get notified'}{' '}
          {isExternal ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </Link>
      </div>
    </motion.div>
  );
}
