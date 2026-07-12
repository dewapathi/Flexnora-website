'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { MagneticCTA } from './MagneticButton';

const links = [
  { href: '#why', label: 'Why Us' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#hire', label: 'Hire' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] h-20 transition-all duration-300 ${
        scrolled ? 'border-b border-border bg-bg/70 backdrop-blur-2xl' : ''
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3" aria-label="FLEXNORA Home">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-surface-2">
            <Image src="/images/logo1.png" alt="FLEXNORA" width={34} height={34} className="object-contain" />
          </span>
          <span className="font-display text-[1.1rem] font-extrabold tracking-tight text-text">
            FLEXNORA
            <span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[2px] text-text-2">
              Global Digital Solutions
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <MagneticCTA
                href={l.href}
                className="group text-sm font-medium text-text-2 transition-all hover:text-text hover:scale-[1.06]"
                magneticRange={40}
                magneticMax={5}
                magneticContentMax={7}
                lensRadius={22}
                lensZoom={1.3}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-blue transition-all duration-300 group-hover:w-full" />
              </MagneticCTA>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <MagneticCTA
            href="#cta-fin"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-electric-blue to-royal-blue px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:scale-[1.08]"
          >
            Book Consultation
          </MagneticCTA>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 rounded-lg p-2 transition-colors hover:bg-surface-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6 text-text" /> : <Menu className="h-6 w-6 text-text" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-20 flex flex-col gap-1 border-b border-border bg-bg/97 p-6 backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <MagneticCTA
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base text-text-2 transition-all hover:bg-surface-2 hover:text-text hover:scale-[1.03]"
                magneticRange={40}
                magneticMax={5}
                magneticContentMax={7}
                lensRadius={22}
                lensZoom={1.3}
              >
                {l.label}
              </MagneticCTA>
            ))}
            <MagneticCTA
              href="#cta-fin"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-electric-blue to-royal-blue px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.08]"
            >
              Book Consultation
            </MagneticCTA>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
