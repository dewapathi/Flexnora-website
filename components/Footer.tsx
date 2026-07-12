import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Container } from './ui';
import { MagneticCTA } from './MagneticButton';

const SMALL_LENS = { magneticRange: 40, magneticMax: 5, magneticContentMax: 7, lensRadius: 22, lensZoom: 1.3 };

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-1 pb-9 pt-20">
      <Container>
        <div className="mb-[60px] grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <MagneticCTA href="#top" className="inline-flex items-center gap-3 transition-transform hover:scale-[1.03]" contentClassName="inline-flex items-center gap-3" {...SMALL_LENS}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-surface-2">
                <Image src="/images/logo1.png" alt="FLEXNORA" width={34} height={34} className="object-contain" />
              </span>
              <span className="font-display text-[1.1rem] font-extrabold tracking-tight text-text">
                FLEXNORA<span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[2px] text-text-2">Global Digital Solutions</span>
              </span>
            </MagneticCTA>
            <p className="mt-4 max-w-[280px] text-sm text-text-2">
              We build digital products that drive real business growth — for founders and companies
              who demand the very best.
            </p>
            <div className="mt-6 flex gap-2.5">
              <MagneticCTA
                href="https://wa.me/94779400291"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-surface-2 text-text-2 transition-all hover:border-indigo/30 hover:bg-indigo/15 hover:text-indigo hover:scale-[1.1]"
                {...SMALL_LENS}
              >
                <FaWhatsapp className="h-4 w-4" />
              </MagneticCTA>
              <MagneticCTA
                href="mailto:pradeepa@flexnora.com"
                aria-label="Email"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-surface-2 text-text-2 transition-all hover:border-indigo/30 hover:bg-indigo/15 hover:text-indigo hover:scale-[1.1]"
                {...SMALL_LENS}
              >
                <Mail className="h-4 w-4" />
              </MagneticCTA>
              <MagneticCTA
                href="tel:+94779400291"
                aria-label="Phone"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-surface-2 text-text-2 transition-all hover:border-indigo/30 hover:bg-indigo/15 hover:text-indigo hover:scale-[1.1]"
                {...SMALL_LENS}
              >
                <Phone className="h-4 w-4" />
              </MagneticCTA>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[0.85rem] font-bold uppercase tracking-wide text-text-3">Solutions</h4>
            <ul className="flex flex-col gap-2.5">
              <li><MagneticCTA href="#itp" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Tech Partnership</MagneticCTA></li>
              <li><MagneticCTA href="#services" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Software Development</MagneticCTA></li>
              <li><MagneticCTA href="#solutions" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Solution Gallery</MagneticCTA></li>
              <li><MagneticCTA href="#ai" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>AI &amp; Automation</MagneticCTA></li>
              <li><MagneticCTA href="#hire" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Hire Developers</MagneticCTA></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[0.85rem] font-bold uppercase tracking-wide text-text-3">Company</h4>
            <ul className="flex flex-col gap-2.5">
              <li><MagneticCTA href="#why" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Why FLEXNORA</MagneticCTA></li>
              <li><MagneticCTA href="#process" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Our Process</MagneticCTA></li>
              <li><MagneticCTA href="#tech" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Tech Stack</MagneticCTA></li>
              <li><MagneticCTA href="#testimonials" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Testimonials</MagneticCTA></li>
              <li><MagneticCTA href="#faq" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>FAQ</MagneticCTA></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[0.85rem] font-bold uppercase tracking-wide text-text-3">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              <li><MagneticCTA href="https://wa.me/94779400291" target="_blank" rel="noopener noreferrer" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>WhatsApp</MagneticCTA></li>
              <li><MagneticCTA href="mailto:pradeepa@flexnora.com" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Email Us</MagneticCTA></li>
              <li><MagneticCTA href="tel:+94779400291" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>+94 77 9400 291</MagneticCTA></li>
              <li><MagneticCTA href="#contact" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text hover:scale-[1.05]" {...SMALL_LENS}>Get a Quote</MagneticCTA></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-7">
          <p className="text-sm text-text-3">&copy; 2026 FLEXNORA Digital. All rights reserved. · Colombo, Sri Lanka</p>
          <div className="flex gap-5">
            <MagneticCTA
              as={Link}
              href="/ball-sort-game/privacy-policy"
              className="text-sm text-text-3 transition-all hover:text-text-2 hover:scale-[1.05]"
              {...SMALL_LENS}
            >
              Privacy Policy
            </MagneticCTA>
          </div>
        </div>
      </Container>
    </footer>
  );
}
