'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { industries } from '@/lib/demo/industries';
import { IndustryCard } from './_components/IndustryCard';

export default function DemoGalleryPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Back to FLEXNORA">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-surface-2">
              <Image src="/images/logo1.png" alt="FLEXNORA" width={34} height={34} className="object-contain" />
            </span>
            <span className="font-display text-[1.1rem] font-extrabold tracking-tight text-text">
              FLEXNORA
              <span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[2px] text-text-2">
                Demo Gallery
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-semibold text-text-2 transition-colors hover:text-text sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mb-3.5 text-xs font-bold uppercase tracking-[2px] text-indigo">FLEXNORA Demo Gallery</p>
          <h1 className="mx-auto mb-5 max-w-3xl font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.1] text-text">
            Don&apos;t take our word for it.
            <br />
            <span className="text-gradient">Use the product.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-text-2">
            Every card below opens a fully interactive application — real navigation, real dashboards,
            real AI. This is the closest thing to seeing FLEXNORA build your product before you ever
            reach out.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.slug} industry={industry} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
