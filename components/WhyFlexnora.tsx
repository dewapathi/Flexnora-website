'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Gauge, Layers, Award, Eye, Handshake, type LucideIcon } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const pillars: { icon: LucideIcon; title: string; headline: string; desc: string; featured?: boolean }[] = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    headline: 'We adopt technology that moves the needle — not hype.',
    desc: 'AI, modern frameworks, and lean architectures, chosen because they solve a real problem — not because they were trending this quarter.',
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    headline: "Security isn't a patch. It's part of the build.",
    desc: 'Dependency hygiene, security reviews, and hardened infrastructure baked into every project from day one, not bolted on after launch.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    headline: "Fast isn't a feature request. It's the default.",
    desc: 'Lighthouse scores above 95, sub-second loads, and Core Web Vitals treated as a first-class concern in every build.',
  },
  {
    icon: Layers,
    title: 'Scalability',
    headline: "Built for 10x growth, not just today's traffic.",
    desc: 'Architecture designed to handle real scale — from database schema to cloud infrastructure — without a rewrite six months in.',
  },
  {
    icon: Award,
    title: 'Quality',
    headline: 'Every interface, tested before your users ever see it.',
    desc: 'Clean, documented, reviewed code, checked across real devices — not just the designer’s laptop.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    headline: 'You see the build. Every week, no surprises.',
    desc: 'Weekly demos, honest timelines, and a direct line to the people actually writing your code.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    headline: 'We stay on after launch — as your team, not a vendor.',
    desc: 'The relationship doesn’t end at deployment. We keep building, keep maintaining, and keep showing up.',
  },
];

function StoryRow({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.98, 1]);

  return (
    <Reveal>
      <motion.div
        ref={ref}
        style={{ opacity, scale }}
        className="grid gap-4 py-9 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-11"
      >
        <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-5">
          <span className="font-display text-sm font-bold text-text-3">0{index + 1}</span>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-electric-blue/20 bg-electric-blue/10 text-electric-blue">
            <pillar.icon className="h-5 w-5" />
            {pillar.featured && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-purple" />}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-text-3">{pillar.title}</p>
          <h3 className="mb-3 max-w-[22ch] font-display text-2xl font-bold leading-[1.15] text-text sm:text-3xl">
            {pillar.headline}
          </h3>
          <p className="max-w-[52ch] text-sm leading-relaxed text-text-2 sm:text-base">{pillar.desc}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function WhyFlexnora() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] });

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
                <span className="text-gradient-premium">Delivered Better.</span>
              </>
            }
            desc="We don't just write code. We think like a product team — obsessing over every pixel, every interaction, and every business outcome."
          />

          <div ref={sectionRef} className="relative mx-auto max-w-[760px]">
            <div className="absolute left-[23px] top-0 hidden h-full w-px bg-border sm:block">
              <motion.div
                style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                className="h-full w-full origin-top bg-gradient-to-b from-electric-blue to-royal-blue"
              />
            </div>
            <div className="divide-y divide-border">
              {pillars.map((p, i) => (
                <StoryRow key={p.title} pillar={p} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
