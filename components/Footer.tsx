import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Container } from './ui';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-bg-1 pb-9 pt-20">
      <Container>
        <div className="mb-[60px] grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.14] bg-white/[0.06]">
                <Image src="/images/logo1.png" alt="FLEXNORA" width={34} height={34} className="object-contain" />
              </span>
              <span className="font-display text-[1.1rem] font-extrabold tracking-tight text-text">
                FLEXNORA<span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[2px] text-text-2">Global Digital Solutions</span>
              </span>
            </a>
            <p className="mt-4 max-w-[280px] text-sm text-text-2">
              We build digital products that drive real business growth — for founders and companies
              who demand the very best.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href="https://wa.me/94779400291"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.06] text-text-2 transition-colors hover:border-indigo/30 hover:bg-indigo/15 hover:text-indigo"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
              <a
                href="mailto:pradeepa@flexnora.com"
                aria-label="Email"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.06] text-text-2 transition-colors hover:border-indigo/30 hover:bg-indigo/15 hover:text-indigo"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+94779400291"
                aria-label="Phone"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.06] text-text-2 transition-colors hover:border-indigo/30 hover:bg-indigo/15 hover:text-indigo"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[0.85rem] font-bold uppercase tracking-wide text-text-3">Solutions</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#itp" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Tech Partnership</a></li>
              <li><a href="#services" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Software Development</a></li>
              <li><a href="#solutions" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Solution Gallery</a></li>
              <li><a href="#ai" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">AI & Automation</a></li>
              <li><a href="#hire" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Hire Developers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[0.85rem] font-bold uppercase tracking-wide text-text-3">Company</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#why" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Why FLEXNORA</a></li>
              <li><a href="#process" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Our Process</a></li>
              <li><a href="#tech" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Tech Stack</a></li>
              <li><a href="#testimonials" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Testimonials</a></li>
              <li><a href="#faq" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[0.85rem] font-bold uppercase tracking-wide text-text-3">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="https://wa.me/94779400291" target="_blank" rel="noopener noreferrer" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">WhatsApp</a></li>
              <li><a href="mailto:pradeepa@flexnora.com" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Email Us</a></li>
              <li><a href="tel:+94779400291" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">+94 77 9400 291</a></li>
              <li><a href="#contact" className="text-sm text-text-2 transition-all hover:pl-1 hover:text-text">Get a Quote</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-7">
          <p className="text-sm text-text-3">&copy; 2026 FLEXNORA Digital. All rights reserved. · Colombo, Sri Lanka</p>
          <div className="flex gap-5">
            <Link href="/ball-sort-game/privacy-policy" className="text-sm text-text-3 transition-colors hover:text-text-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
