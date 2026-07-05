'use client';
import { useEffect } from 'react';

export default function ClientInit() {
  useEffect(() => {
    // Scroll reveal
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.rv').forEach((el) => ro.observe(el));

    // Smooth scroll with nav offset
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 88,
        behavior: 'smooth',
      });
    };
    document.addEventListener('click', handleClick);

    return () => {
      ro.disconnect();
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
