'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Sparkles, Star, LayoutDashboard, CalendarCheck, BedDouble,
  Users, ClipboardList, Bot, Hotel as HotelIcon,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { Container, Reveal, Kicker, GradientText } from '@/components/ui';
import { hotel, dashboardStats } from '@/lib/demo/hotel-data';

const stats = [
  { value: 18, suffix: '', label: 'Rooms & Suites' },
  { value: 4.8, suffix: '★', label: 'Average Rating', decimals: 1 },
  { value: 97, suffix: '%', label: 'Weekend Occupancy' },
  { value: 2.1, suffix: 'M+', label: 'Annual Revenue ($)', decimals: 1 },
];

const features = [
  { icon: LayoutDashboard, title: 'Executive Dashboard', desc: 'Real-time occupancy, revenue, and housekeeping status at a glance.' },
  { icon: CalendarCheck, title: 'Reservations', desc: 'Search, filter, and manage bookings across every channel.' },
  { icon: BedDouble, title: 'Room Management', desc: 'A live grid of every room — status, pricing, and guest at a click.' },
  { icon: Users, title: 'Guest Profiles', desc: 'VIP tiers, preferences, stay history, and billing in one place.' },
  { icon: ClipboardList, title: 'Housekeeping Board', desc: 'A drag-and-drop Kanban that keeps every room turnover on track.' },
  { icon: Bot, title: 'AI Concierge', desc: 'Ask about VIP arrivals, availability, or revenue — get instant answers.' },
];

const techStack = ['Next.js', 'React Query', 'PostgreSQL', 'Redis', 'Stripe', 'AWS', 'Docker', 'TypeScript', 'Tailwind'];

function useCountUp(target: number, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const dur = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setValue(Number((p * target).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, decimals]);

  return { ref, value };
}

function StatCounter({ value, suffix, decimals, label }: { value: number; suffix: string; decimals?: number; label: string }) {
  const { ref, value: display } = useCountUp(value, decimals);
  return (
    <div className="text-center">
      <span ref={ref} className="block font-display text-4xl font-extrabold text-text sm:text-5xl">
        {display}
        {suffix}
      </span>
      <span className="mt-1.5 block text-sm font-medium text-text-3">{label}</span>
    </div>
  );
}

export default function HotelLandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between">
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
              className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-semibold text-text-2 transition-colors hover:text-text sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" /> All demos
            </Link>
          </div>
        </Container>
      </header>

      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(99,102,241,0.25) 0%,rgba(6,182,212,0.12) 45%,transparent 70%)' }}
        />
        <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-indigo/25 bg-indigo/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-lilac">
              <Sparkles className="h-3.5 w-3.5" /> Hotel &amp; Hospitality Platform
            </span>
            <h1 className="mb-5 font-display text-[clamp(2.4rem,4.5vw,4rem)] font-bold leading-[1.08] text-text">
              Run a five-star hotel
              <br />
              <GradientText>like a five-star team.</GradientText>
            </h1>
            <p className="mb-9 max-w-lg text-text-2">
              {hotel.name} runs entirely on this platform — reservations, rooms, guests, housekeeping,
              and an AI concierge, in one luxury-grade operating system.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/demo/hotel/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(29,78,216,0.5)] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                <HotelIcon className="h-4 w-4" /> Launch Live Demo
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-8 py-3.5 text-sm font-semibold text-text transition-all hover:-translate-y-0.5 hover:bg-surface-3"
              >
                All Demos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-indigo/30 via-violet/20 to-cyan/20 p-8 shadow-card" style={{ aspectRatio: '4/3' }}>
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px,transparent 1px)', backgroundSize: '22px 22px' }}
              />
              <div className="relative flex h-full flex-col justify-between">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {hotel.location}
                </span>
                <div className="flex gap-3">
                  <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur-md">
                    <p className="font-display text-2xl font-extrabold text-white">{dashboardStats.occupancy}%</p>
                    <p className="text-xs text-white/80">Occupancy</p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur-md">
                    <p className="flex items-center gap-1 font-display text-2xl font-extrabold text-white">
                      {dashboardStats.avgRating} <Star className="h-4 w-4 fill-amber text-amber" />
                    </p>
                    <p className="text-xs text-white/80">Guest Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-bg-1 py-16">
        <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <Kicker>Inside the platform</Kicker>
            <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold text-text">Everything a modern hotel needs.</h2>
            <p className="text-text-2">Six connected modules, one seamless operating system.</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-indigo/30">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 font-bold text-text">{f.title}</h3>
                  <p className="text-sm text-text-2">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-bg-1 py-14">
        <Container>
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-text-3">Built with</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStack.map((t) => (
              <span key={t} className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-semibold text-text-2">
                {t}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 text-center">
        <Container>
          <Reveal className="mx-auto max-w-xl">
            <h2 className="mb-4 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-text">Need a platform like this?</h2>
            <p className="mb-8 text-text-2">Build your own hotel management platform with FLEXNORA — tailored to your property, your brand.</p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link
                href="/demo/hotel/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                <HotelIcon className="h-4 w-4" /> Launch Live Demo
              </Link>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-8 py-3.5 text-sm font-semibold text-text transition-all hover:-translate-y-0.5 hover:bg-surface-3"
              >
                Book Free Consultation
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
