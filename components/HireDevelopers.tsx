import {
  Monitor, Server, GitBranch, Smartphone, TestTube, Settings, BrainCircuit, Cloud,
  Clock, Hourglass, ListChecks, Users, Handshake, Check, ArrowRight,
} from 'lucide-react';
import { SiFigma } from 'react-icons/si';
import { Container, Kicker, GradientText, Reveal } from './ui';
import { MagneticCTA } from './MagneticButton';

const roles = [
  { icon: Monitor, label: 'Frontend Developer' },
  { icon: Server, label: 'Backend Developer' },
  { icon: GitBranch, label: 'Full Stack Developer' },
  { icon: Smartphone, label: 'Mobile Developer' },
  { icon: SiFigma, label: 'UI/UX Designer' },
  { icon: TestTube, label: 'QA Engineer' },
  { icon: Settings, label: 'DevOps Engineer' },
  { icon: BrainCircuit, label: 'AI Engineer' },
  { icon: Cloud, label: 'Cloud Engineer' },
];

const engagements = [
  { icon: Clock, label: 'Full Time · 160 hrs/mo' },
  { icon: Hourglass, label: 'Part Time · 80 hrs/mo' },
  { icon: ListChecks, label: 'Project Based' },
  { icon: Users, label: 'Dedicated Team' },
  { icon: Handshake, label: 'Long-Term Contract' },
];

export default function HireDevelopers() {
  return (
    <section id="hire" aria-labelledby="hire-h" className="scroll-mt-20">
      <div className="py-[120px]">
        <Container>
          <div className="mb-16 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <Kicker>Dedicated developers</Kicker>
              <h2 id="hire-h" className="mb-6 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text">
                Hire expert developers
                <br />
                <GradientText>that work as your own.</GradientText>
              </h2>
              <p className="mb-7 text-text-2">
                Need a specific expert embedded in your team? Hire dedicated developers from FLEXNORA —
                they integrate seamlessly with your workflow, communicate on your channels, and deliver
                as if they&apos;re sitting in your office.
              </p>
              <ul className="mb-8 flex flex-col gap-3">
                {[
                  'Start within 48 hours — no long recruitment cycles',
                  'Deeply vetted engineers with proven track records',
                  'Flexible engagement — part-time, full-time, or project-based',
                  'Daily standups, your tools, your timezone',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-text-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> {b}
                  </li>
                ))}
              </ul>
              <MagneticCTA
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-[30px] py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 hover:scale-[1.08] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                Hire a Developer <ArrowRight className="h-4 w-4" />
              </MagneticCTA>
            </Reveal>

            <Reveal delay={0.1} className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4.5 py-4 transition-all hover:-translate-y-0.5 hover:border-indigo/40 hover:bg-indigo/[0.06]"
                >
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-indigo/10 text-indigo">
                    <r.icon className="h-[0.9rem] w-[0.9rem]" />
                  </div>
                  <span className="text-[0.85rem] font-semibold text-text-2">{r.label}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="border-t border-border pt-12 text-center">
            <Kicker>Engagement models</Kicker>
            <h3 className="mb-1.5 font-display text-xl font-bold text-text">Work the way that suits your business.</h3>
            <p className="mx-auto mb-6 max-w-[580px] text-text-2">
              From a few hours a week to a fully embedded full-time team — we flex to your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {engagements.map((e) => (
                <div
                  key={e.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-[22px] py-2.5 text-sm font-semibold text-text-2 transition-colors hover:border-indigo/30 hover:bg-indigo/10 hover:text-text"
                >
                  <e.icon className="h-4 w-4 text-indigo" /> {e.label}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
