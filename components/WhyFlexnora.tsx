'use client';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Gauge, Layers, Award, Eye, Handshake } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const pillars = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We track and adopt the technology that actually moves the needle — AI, modern frameworks, and lean architectures — not hype for its own sake.',
    big: true,
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    desc: 'Security reviews, dependency hygiene, and hardened infrastructure baked into every build, not bolted on after launch.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    desc: 'Lighthouse scores above 95, sub-second loads, and Core Web Vitals treated as a feature, not an afterthought.',
  },
  {
    icon: Layers,
    title: 'Scalability',
    desc: 'Architecture designed to handle 10x growth without a rewrite — from database schema to cloud infrastructure.',
  },
  {
    icon: Award,
    title: 'Quality',
    desc: 'Clean, documented, reviewed code. Every interface tested across devices before it ever reaches your users.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'Weekly demos, honest timelines, and a direct line to the people actually building your product.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    desc: "We stay on after launch — as your technology team, not a vendor you never hear from again.",
    big: true,
  },
];

export default function WhyFlexnora() {
  return (
    <section id="why" aria-labelledby="why-h" className="scroll-mt-20 bg-bg-1">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="Why choose us"
            title={
              <>
                Built Different.
                <br />
                <span className="text-gradient">Delivered Better.</span>
              </>
            }
            desc="We don't just write code. We think like a product team — obsessing over every pixel, every interaction, and every business outcome."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 4) * 0.06}
                className={p.big ? 'md:col-span-2' : ''}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-card transition-colors hover:border-indigo/40"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo/20 bg-indigo/10 text-indigo transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-indigo group-hover:to-violet group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(99,102,241,0.4)]">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-text-2">{p.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
