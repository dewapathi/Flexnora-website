'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import type { Industry } from '@/lib/demo/industries';

export function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const isLive = industry.status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/demo/${industry.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-2 shadow-card transition-colors hover:border-indigo/40"
      >
        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${industry.grad} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </div>
            {isLive ? (
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
            <industry.icon className="h-6 w-6" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="mb-2 text-lg font-bold text-text">{industry.name}</h3>
          <p className="mb-5 flex-1 text-sm text-text-2">{industry.tagline}</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {industry.stack.map((t) => (
              <span key={t} className="rounded-full border border-indigo/20 bg-indigo/10 px-2.5 py-1 text-xs font-semibold text-lilac">
                {t}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo transition-transform group-hover:gap-2.5">
            {isLive ? '✨ Explore Live Demo' : 'Preview & get notified'} <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
