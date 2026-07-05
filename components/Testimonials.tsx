import Image from 'next/image';
import { Star } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const testimonials = [
  {
    quote: 'FLEXNORA transformed our online presence with a stunning website that perfectly represents our brand. The quality and attention to detail was far beyond what I expected.',
    name: 'Ranuli Shalinya',
    role: 'Teacher · Nexora Institute of Education',
    avatar: '/images/ranuli.png',
  },
  {
    quote: 'The mobile app FLEXNORA built helped us increase customer engagement significantly. Professional, fast, and exactly what we envisioned — delivered on time, no compromises.',
    name: 'Aloka Harshana',
    role: 'Marketing Director · TMR (True Man Racing)',
    avatar: '/images/aloka.png',
  },
  {
    quote: "Their automation solutions saved us countless hours every week. FLEXNORA truly understands how technology can transform the way a business operates day to day.",
    name: 'Theekshani Aloka',
    role: "Teacher · St Mary's College Negombo",
    avatar: '/images/theekshani.png',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="ts-h" className="scroll-mt-20 bg-bg-1">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="Client love"
            title={
              <>
                Don&apos;t take our word
                <br />
                <span className="text-gradient">for it.</span>
              </>
            }
            desc="Real feedback from real clients who've seen the difference FLEXNORA makes."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-9 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-indigo/30">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2.5 right-6 font-display text-[8rem] font-extrabold leading-none text-indigo/[0.08]"
                  >
                    &rdquo;
                  </span>
                  <div className="mb-5 flex gap-1 text-amber">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber" />
                    ))}
                  </div>
                  <p className="relative mb-7 italic leading-relaxed text-text/85">&ldquo;{t.quote}&rdquo;</p>
                  <div className="relative flex items-center gap-3.5">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border-2 border-white/[0.14] bg-bg-2 object-cover"
                    />
                    <div>
                      <div className="font-display text-[0.95rem] font-bold text-text">{t.name}</div>
                      <div className="mt-0.5 text-[0.8rem] text-text-3">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
