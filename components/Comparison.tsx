import { X, Check } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const bad = [
  'High developer salaries ($60k–$150k/yr)',
  'Months of recruitment & interviews',
  'Expensive onboarding & training',
  'Annual leave & sick days affect delivery',
  'Equipment, software, and licenses costs',
  'HR management & employment compliance',
  'Limited to one or two skill sets',
  'Knowledge lost when staff leave',
];

const good = [
  'Predictable monthly investment',
  'Ready-to-work experts, start within days',
  'No onboarding — we hit the ground running',
  'Continuous delivery, no interruptions',
  'No overhead costs whatsoever',
  'Zero HR burden — we handle everything',
  'Full team: dev, design, cloud, AI, QA',
  'Institutional knowledge stays with your system',
];

export default function Comparison() {
  return (
    <section id="compare" aria-labelledby="cmp-h" className="scroll-mt-20">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="The smarter choice"
            title={
              <>
                Hiring internally vs
                <br />
                <span className="text-gradient">partnering with FLEXNORA.</span>
              </>
            }
            desc="The numbers speak for themselves. See why smart businesses outsource their technology."
          />

          <Reveal className="mx-auto grid max-w-[860px] overflow-hidden rounded-3xl border border-border shadow-card sm:grid-cols-2">
            <div className="bg-bg-1">
              <div className="border-b border-border px-8 py-6">
                <div className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold text-text">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Traditional In-House Hiring
                </div>
                <div className="mt-1 text-[0.78rem] text-text-3">The expensive, slow, and unpredictable way</div>
              </div>
              {bad.map((row) => (
                <div key={row} className="flex items-center gap-3 border-b border-border px-8 py-3.5 text-[0.88rem] text-text-2 last:border-b-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {row}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-indigo/[0.07] to-violet/[0.04]">
              <div className="border-b border-border px-8 py-6">
                <div className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold text-text">
                  <span className="h-2 w-2 rounded-full bg-green" />
                  FLEXNORA Technology Partner
                </div>
                <div className="mt-1 text-[0.78rem] text-text-3">The smart, scalable, and cost-effective way</div>
              </div>
              {good.map((row) => (
                <div key={row} className="flex items-center gap-3 border-b border-border px-8 py-3.5 text-[0.88rem] text-text-2 last:border-b-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {row}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
