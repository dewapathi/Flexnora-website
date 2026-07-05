import { Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Container, Kicker, GradientText, Badge, Reveal } from './ui';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="ct-h" className="relative scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'rgba(99,102,241,0.1)' }}
      />
      <div className="relative py-[120px]">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <Kicker>Get in touch</Kicker>
              <h2 id="ct-h" className="mb-4 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text">
                Let&apos;s build
                <br />
                <GradientText>something great.</GradientText>
              </h2>
              <p className="mb-10 text-text-2">
                Tell us about your project. We&apos;ll reply with a plan, timeline, and cost estimate —
                usually within 24 hours.
              </p>
              <div className="flex flex-col gap-3.5">
                <a
                  href="https://wa.me/94779400291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-[18px] transition-all hover:translate-x-1.5 hover:border-indigo/40 hover:bg-indigo/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo/20 bg-indigo/10 text-indigo transition-all group-hover:bg-gradient-to-br group-hover:from-indigo group-hover:to-violet group-hover:text-white">
                    <FaWhatsapp className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-text-3">WhatsApp (Fastest)</span>
                    <span className="block text-[0.95rem] font-semibold text-text">+94 77 9400 291</span>
                  </span>
                </a>
                <a
                  href="mailto:pradeepa@flexnora.com"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-[18px] transition-all hover:translate-x-1.5 hover:border-indigo/40 hover:bg-indigo/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo/20 bg-indigo/10 text-indigo transition-all group-hover:bg-gradient-to-br group-hover:from-indigo group-hover:to-violet group-hover:text-white">
                    <Mail className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-text-3">Email</span>
                    <span className="block text-[0.95rem] font-semibold text-text">pradeepa@flexnora.com</span>
                  </span>
                </a>
                <a
                  href="tel:+94779400291"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-[18px] transition-all hover:translate-x-1.5 hover:border-indigo/40 hover:bg-indigo/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo/20 bg-indigo/10 text-indigo transition-all group-hover:bg-gradient-to-br group-hover:from-indigo group-hover:to-violet group-hover:text-white">
                    <Phone className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-text-3">Phone</span>
                    <span className="block text-[0.95rem] font-semibold text-text">+94 77 9400 291</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-[18px]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo/20 bg-indigo/10 text-indigo">
                    <MapPin className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-text-3">Location</span>
                    <span className="block text-[0.95rem] font-semibold text-text">Colombo, Sri Lanka</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 shadow-card">
                <div
                  aria-hidden="true"
                  className="absolute -right-[100px] -top-[100px] h-[300px] w-[300px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.15),transparent 70%)' }}
                />
                <div className="relative">
                  <div className="mb-6">
                    <Badge dot>Available for new projects</Badge>
                  </div>
                  <h3 className="mb-3 text-[1.8rem] font-bold text-text">Start Your Project Today.</h3>
                  <p className="mb-8 text-text-2">
                    The fastest way to kick things off is a quick WhatsApp message. We&apos;ll schedule a
                    call, understand your vision, and deliver a detailed proposal — no obligation.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://wa.me/94779400291?text=Hi%20FLEXNORA!%20I%20want%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 rounded-2xl bg-[#25d366] px-6 py-[18px] font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#1fb855]"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      <span>
                        WhatsApp Now
                        <small className="block text-xs font-normal opacity-70">Typical reply in under 1 hour</small>
                      </span>
                    </a>
                    <a
                      href="tel:+94779400291"
                      className="flex items-center gap-3.5 rounded-2xl border border-border-strong bg-surface-2 px-6 py-[18px] font-semibold text-text transition-all hover:-translate-y-0.5 hover:bg-surface-3"
                    >
                      <Phone className="h-5 w-5" />
                      <span>
                        Call Us
                        <small className="block text-xs font-normal opacity-70">+94 77 9400 291</small>
                      </span>
                    </a>
                    <a
                      href="mailto:pradeepa@flexnora.com?subject=Project%20Inquiry%20-%20FLEXNORA"
                      className="flex items-center gap-3.5 rounded-2xl border border-indigo/25 bg-indigo/10 px-6 py-[18px] font-semibold text-lilac transition-all hover:-translate-y-0.5 hover:bg-indigo/20"
                    >
                      <Mail className="h-5 w-5" />
                      <span>
                        Send an Email
                        <small className="block text-xs font-normal opacity-70">pradeepa@flexnora.com</small>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
