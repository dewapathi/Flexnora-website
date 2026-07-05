'use client';
import { useState, useRef } from 'react';

const faqs = [
  {
    q: 'Can FLEXNORA replace our in-house IT team?',
    a: 'Yes — many of our clients use FLEXNORA as their complete, outsourced technology department. We cover everything from development and cloud infrastructure to security, maintenance, and ongoing support. You get a full team without the overhead of hiring.',
  },
  {
    q: 'What\'s included in the monthly partnership plans?',
    a: 'Monthly plans include dedicated development hours, maintenance, security updates, bug fixes, and a direct communication channel. Higher tiers add feature development, cloud monitoring, strategy calls, and larger developer teams. Everything is documented and transparent.',
  },
  {
    q: 'How does hiring a dedicated developer work?',
    a: 'Tell us the role, skills, and engagement type you need. We match you with the right engineer, do a brief intro call, and they can start within 48 hours. They\'ll join your Slack, attend your standups, and work as part of your team — just without the HR burden.',
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
  const [open, setOpen] = useState<number | null>(null);
  const ansRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  return (
    <section className="fq" id="faq" aria-labelledby="fq-h">
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">FAQ</p>
          <h2 id="fq-h" className="rv">
            Questions we<br /><span className="g">hear often.</span>
          </h2>
        </div>
        <div className="fql">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`fqi${isOpen ? ' op' : ''}`}>
                <button
                  className="fqb"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                >
                  {faq.q}
                  <span className="fqic"><i className="fa-solid fa-plus"></i></span>
                </button>
                <div
                  className="fqa"
                  ref={(el) => { ansRefs.current[i] = el; }}
                  style={{ maxHeight: isOpen ? (ansRefs.current[i]?.scrollHeight ?? 0) + 'px' : '0' }}
                >
                  <div className="fqai">{faq.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
