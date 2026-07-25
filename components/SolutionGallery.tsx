'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useScroll } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';
import { MagneticCTA } from './MagneticButton';
import { IndustryCard } from './IndustryCard';
import { industries } from '@/lib/demo/industries';

const PortfolioScene = dynamic(() => import('./PortfolioScene').then((m) => m.PortfolioScene), {
  ssr: false,
  loading: () => null,
});

export default function SolutionGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const use3DRef = useRef(false);
  const [use3D, setUse3D] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useLayoutEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webglOK = false;
    try {
      const t = document.createElement('canvas');
      webglOK = !!(t.getContext('webgl2') || t.getContext('webgl'));
    } catch {
      webglOK = false;
    }
    const result = isDesktop && !reduced && webglOK;
    use3DRef.current = result;
    setUse3D(result);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      scrollRef.current = v;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    if (!use3D) return;
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };
    document.addEventListener('mousemove', onMouse, { passive: true });
    return () => document.removeEventListener('mousemove', onMouse);
  }, [use3D]);

  return (
    <section id="solutions" aria-labelledby="sol-h" className="scroll-mt-20">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="Solution gallery"
            title={
              <>
                Software built for
                <br />
                <span className="text-gradient">your industry.</span>
              </>
            }
            desc="Don't take our word for it — every card below opens a fully interactive product demo. Real navigation, real dashboards, real AI."
          />

          <Reveal className="mb-10 flex justify-center">
            <MagneticCTA
              as={Link}
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo/25 bg-indigo/10 px-4 py-2 text-sm font-semibold text-indigo transition-all hover:bg-indigo/15 hover:scale-[1.08]"
              contentClassName="inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4" /> Browse the full Demo Gallery <ArrowRight className="h-4 w-4" />
            </MagneticCTA>
          </Reveal>

          {/* ~7 cards need real dwell time each — at 180vh the pinned scroll range was only
              ~720px total (height minus one viewport), giving each card ~100px before the next
              one took over, far too fast to read. 420vh gives ~2880px of scroll distance across
              all 7, roughly 400px of comfortable focus time per card. */}
          <div ref={sectionRef} className={`relative ${use3D ? 'h-[420vh]' : ''}`}>
            {use3D ? (
              <div className="sticky top-0 h-screen overflow-hidden">
                <PortfolioScene scrollRef={scrollRef} mouseRef={mouseRef} />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                    <IndustryCard industry={s} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
