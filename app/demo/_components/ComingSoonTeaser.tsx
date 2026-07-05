import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Mail, Clock } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import type { Industry } from '@/lib/demo/industries';

export function ComingSoonTeaser({ industry }: { industry: Industry }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Back to FLEXNORA">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-surface-2">
              <Image src="/images/logo1.png" alt="FLEXNORA" width={34} height={34} className="object-contain" />
            </span>
            <span className="font-display text-[1.1rem] font-extrabold tracking-tight text-text">FLEXNORA</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-semibold text-text-2 transition-colors hover:text-text"
            >
              <ArrowLeft className="h-4 w-4" /> All demos
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-cyan text-white">
          <industry.icon className="h-7 w-7" />
        </div>
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-2 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-text-2">
          <Clock className="h-3.5 w-3.5" /> In Progress
        </span>
        <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-text">
          {industry.name} demo is
          <br />
          <span className="text-gradient">coming soon.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-text-2">{industry.tagline}</p>

        <div className="mx-auto mb-10 grid max-w-lg gap-3 text-left sm:grid-cols-2">
          {industry.features.map((f) => (
            <div key={f} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3.5 shadow-card">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
              <span className="text-sm text-text-2">{f}</span>
            </div>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {industry.stack.map((t) => (
            <span key={t} className="rounded-full border border-indigo/20 bg-indigo/10 px-3 py-1.5 text-xs font-semibold text-lilac">
              {t}
            </span>
          ))}
        </div>

        <a
          href={`mailto:pradeepa@flexnora.com?subject=Notify%20me%3A%20${encodeURIComponent(industry.name)}%20demo`}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(29,78,216,0.5)] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
        >
          <Mail className="h-4 w-4" /> Notify me when it&apos;s live
        </a>

        <p className="mt-6 text-sm text-text-2">
          Want this sooner, or need something similar for your own business?{' '}
          <Link href="/#contact" className="font-semibold text-indigo hover:underline">
            Talk to us
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
