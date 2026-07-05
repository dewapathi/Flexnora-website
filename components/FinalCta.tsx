import { CalendarCheck, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Container, Kicker, GradientText, Reveal } from './ui';
import { MagneticButton } from './MagneticButton';

export default function FinalCta() {
  return (
    <section id="cta-fin" aria-labelledby="ctaf-h" className="relative scroll-mt-20 overflow-hidden bg-bg-1 py-[140px] text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%,rgba(99,102,241,0.22) 0%,rgba(139,92,246,0.1) 40%,transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px,transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <Container>
        <Reveal className="relative mx-auto max-w-[720px]">
          <Kicker>Ready to get started?</Kicker>
          <h2 id="ctaf-h" className="mb-4 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text">
            Need a reliable
            <br />
            <GradientText>technology partner?</GradientText>
          </h2>
          <p className="mx-auto mb-11 max-w-2xl text-[1.1rem] text-text-2">
            Let&apos;s build and grow your business together. Book a free 30-minute consultation — no
            obligation, no sales pitch. Just an honest conversation about your technology needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a
              href="https://wa.me/94779400291?text=Hi%20FLEXNORA!%20I%20want%20to%20book%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-[42px] py-[18px] text-[1.05rem] font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#1fb855] hover:shadow-[0_16px_40px_rgba(37,211,102,0.4)]"
            >
              <FaWhatsapp className="h-5 w-5" /> Talk on WhatsApp
            </a>
            <MagneticButton>
              <a
                href="mailto:flexnoradigital@gmail.com?subject=Free%20Consultation%20Request%20-%20FLEXNORA"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo to-cyan px-[42px] py-[18px] text-[1.05rem] font-semibold text-white shadow-[0_0_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(29,78,216,0.5)] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_50px_rgba(99,102,241,0.5)]"
              >
                <CalendarCheck className="h-5 w-5" /> Book Free Consultation
              </a>
            </MagneticButton>
            <a
              href="tel:+94779400291"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-[42px] py-[18px] text-[1.05rem] font-semibold text-text backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-surface-3"
            >
              <Phone className="h-5 w-5" /> Call Us Now
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
