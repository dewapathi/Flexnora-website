'use client';
import { motion } from 'framer-motion';
import { MessageCircle, ClipboardList, PenTool, Code2, TestTube, Rocket, Headset } from 'lucide-react';
import { Container, SectionHeader } from './ui';

const steps = [
  { num: '01', icon: MessageCircle, title: 'Discovery', desc: 'Deep dive into your goals, audience, and landscape — defining exactly what we\'re building and why it matters.' },
  { num: '02', icon: ClipboardList, title: 'Planning', desc: 'Scope, architecture, and milestones locked in — so timeline and budget are clear before design starts.' },
  { num: '03', icon: PenTool, title: 'Design', desc: 'Wireframes and high-fidelity prototypes — reviewed and approved before a single line of code is written.' },
  { num: '04', icon: Code2, title: 'Development', desc: 'Sprint-based development with weekly demos, clean architecture, and continuous integration.' },
  { num: '05', icon: TestTube, title: 'Testing', desc: 'Manual and automated QA across devices — performance, security, and edge cases all verified.' },
  { num: '06', icon: Rocket, title: 'Deployment', desc: 'Seamless production launch with zero-downtime releases and full monitoring from day one.' },
  { num: '07', icon: Headset, title: 'Support', desc: 'Post-launch monitoring, iteration, and a direct line to our team for whatever comes next.' },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="proc-h" className="scroll-mt-20">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="How we work"
            title={
              <>
                Your journey from
                <br />
                <span className="text-gradient">idea to launch.</span>
              </>
            }
            desc="A clear, repeatable process that keeps projects on track and stakeholders aligned at every step."
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-indigo via-violet to-cyan" />
            <div className="flex flex-col gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  className="relative flex items-start gap-6 pl-16"
                >
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/[0.14] bg-bg font-display text-sm font-extrabold text-text-2">
                    {s.num}
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center gap-2 text-indigo">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <h3 className="mb-1.5 text-base font-bold text-text">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-text-2">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
