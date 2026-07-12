import {
  Check, ArrowRight, Code2, Cloud, Bot, ShieldCheck, Users, Wrench, LineChart, Headset,
  UserX, Layers, ArrowUpDown, PiggyBank,
} from 'lucide-react';
import { Container, Kicker, GradientText, Reveal } from './ui';
import { MagneticCTA } from './MagneticButton';

const categories = [
  { icon: Code2, label: 'Software Development' },
  { icon: Cloud, label: 'Cloud & Infrastructure' },
  { icon: Bot, label: 'AI & Automation' },
  { icon: ShieldCheck, label: 'Security & Updates' },
  { icon: Users, label: 'Dedicated Teams' },
  { icon: Wrench, label: 'Managed IT Services' },
  { icon: LineChart, label: 'Performance & SEO' },
  { icon: Headset, label: '24/7 Tech Support' },
];

const bullets = [
  'No recruitment, no HR, no onboarding delays',
  'Ready-to-work experts across every discipline',
  'Scale your team up or down instantly',
  'One partner for everything — from websites to AI',
  "Continuous support — we don't disappear after launch",
];

const cards = [
  { icon: UserX, title: 'No Hiring Needed', desc: 'Skip the months-long recruitment process, interviews, and onboarding. Our experts are ready to start immediately.' },
  { icon: Layers, title: 'Full-Stack Coverage', desc: 'From frontend to backend, mobile to cloud, AI to security — one partner covers every layer of your technology.' },
  { icon: ArrowUpDown, title: 'Scale On Demand', desc: 'Need more developers for a big launch? Scaling down after? Adjust your team size instantly with no lock-in.' },
  { icon: PiggyBank, title: 'Lower Cost', desc: 'Get senior-level expertise at a fraction of the cost of in-house hiring — no salaries, benefits, or equipment costs.' },
];

export default function ItPartnership() {
  return (
    <section id="itp" aria-labelledby="itp-h" className="scroll-mt-20 bg-bg-1">
      <div className="py-[120px]">
        <Container>
          <div className="mb-20 grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Kicker>Your Outsourced IT Department</Kicker>
              <h2 id="itp-h" className="mb-8 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text">
                We don&apos;t just build software.
                <br />
                <GradientText>We become your technology team.</GradientText>
              </h2>
              <p className="mb-8 text-text-2">
                Growing businesses shouldn&apos;t need to hire expensive in-house developers, manage HR,
                or worry about technology. Partner with FLEXNORA and get a complete, expert technology
                department — at a fraction of the cost.
              </p>
              <ul className="mb-8 flex flex-col gap-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-text-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> {b}
                  </li>
                ))}
              </ul>
              <MagneticCTA
                href="#cta-fin"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-[30px] py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 hover:scale-[1.08] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </MagneticCTA>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0e0c2e] to-[#0a1228] p-7 bg-noise">
                <p className="relative mb-5 text-xs font-bold uppercase tracking-[2px] text-[#818cf8]">Everything we cover</p>
                <div className="relative grid grid-cols-2 gap-3">
                  {categories.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors hover:border-[#818cf8]/30 hover:bg-[#6366f1]/[0.08]"
                    >
                      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#6366f1]/10 text-[#818cf8]">
                        <c.icon className="h-[0.85rem] w-[0.85rem]" />
                      </div>
                      <span className="text-[0.82rem] font-semibold text-slate-300">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-3xl border border-border bg-surface p-8 text-center shadow-card transition-all hover:-translate-y-1.5 hover:border-indigo/40">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo/20 bg-indigo/10 text-indigo transition-all group-hover:bg-gradient-to-br">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-text">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-text-2">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
