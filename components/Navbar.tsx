'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' sc' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container ni">
          <a href="#top" className="nl" aria-label="FLEXNORA Home">
            <div className="nl-icon">
              <img src="/images/logo1.png" alt="FLEXNORA" />
            </div>
            <div className="nl-name">
              FLEXNORA<span>Digital</span>
            </div>
          </a>
          <ul className="nlinks" role="list">
            <li><a href="#itp" className="nlink">Solutions</a></li>
            <li><a href="#services" className="nlink">Services</a></li>
            <li><a href="#hire" className="nlink">Hire</a></li>
            <li><a href="#contact" className="nlink">Contact</a></li>
          </ul>
          <div className="nact">
            <a href="#cta-fin" className="btn btn-p btn-sm">Book Consultation</a>
          </div>
          <button
            className={`ham${mobileOpen ? ' op' : ''}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`nmob${mobileOpen ? ' op' : ''}`}>
        <a href="#itp" className="nlink" onClick={close}>Solutions</a>
        <a href="#services" className="nlink" onClick={close}>Services</a>
        <a href="#hire" className="nlink" onClick={close}>Hire</a>
        <a href="#contact" className="nlink" onClick={close}>Contact</a>
        <a href="#cta-fin" className="btn btn-p" onClick={close}>Book Consultation</a>
      </div>
    </>
  );
}
