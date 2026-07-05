'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Container, SectionHeader } from './ui';

const faqs = [
  {
    q: 'Can FLEXNORA replace our in-house IT team?',
    a: 'Yes — many of our clients use FLEXNORA as their complete, outsourced technology department. We cover everything from development and cloud infrastructure to security, maintenance, and ongoing support. You get a full team without the overhead of hiring.',
  },
  {
    q: "What's included in the monthly partnership plans?",
    a: 'Monthly plans include dedicated development hours, maintenance, security updates, bug fixes, and a direct communication channel. Higher tiers add feature development, cloud monitoring, strategy calls, and larger developer teams. Everything is documented and transparent.',
  },
  {
    q: 'How does hiring a dedicated developer work?',
    a: "Tell us the role, skills, and engagement type you need. We match you with the right engineer, do a brief intro call, and they can start within 48 hours. They'll join your Slack, attend your standups, and work as part of your team — just without the HR burden.",
  },
  {
    q: 'Do you provide support after a project launches?',
    a: "We don't disappear after go-live. All projects include a post-launch support window. After that, clients typically move onto a monthly maintenance plan so we remain their long-term technology partner for updates, new features, monitoring, and growth.",
  },
  {
    q: 'How long does a project typically take?',
    a: 'A simple website takes 2–3 weeks. A complex web app or mobile product is usually 6–12 weeks. ERP or SaaS platforms vary based on scope. We give you a precise timeline after the discovery call — always with milestones, never vague.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. We work with businesses across Australia, Europe, the US, and beyond. Our team adapts to your timezone for meetings and standups, and we use tools like Slack, Notion, and Linear to keep everything transparent regardless of location.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="fq-h" className="scroll-mt-20 bg-bg-1">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="FAQ"
            title={
              <>
                Questions we
                <br />
                <span className="text-gradient">hear often.</span>
              </>
            }
          />
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-2xl border bg-surface shadow-card transition-colors ${
                    isOpen ? 'border-indigo/35' : 'border-border hover:border-border-strong'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-[22px] text-left font-display text-base font-semibold text-text transition-colors hover:text-lilac"
                  >
                    {faq.q}
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-indigo/15 text-indigo' : 'bg-surface-2 text-indigo'
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-[22px] leading-relaxed text-text-2">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
