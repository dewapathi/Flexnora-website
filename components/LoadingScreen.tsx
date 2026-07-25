'use client';
import { useLayoutEffect, useState } from 'react';
import Image from 'next/image';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [skip, setSkip] = useState(false);

  useLayoutEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('flexnora-loaded');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyLoaded || reduced) {
      setSkip(true);
      sessionStorage.setItem('flexnora-loaded', '1');
      setVisible(false);
      return;
    }

    const exitTimer = window.setTimeout(() => setExiting(true), 1200);
    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem('flexnora-loaded', '1');
      setVisible(false);
    }, 1600);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading FLEXNORA"
      className={`fixed inset-0 z-[10050] flex flex-col items-center justify-center gap-6 bg-bg transition-opacity duration-[400ms] ${
        skip ? 'opacity-0' : exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3 animate-[loading-logo-in_0.7s_ease-out]">
        <Image src="/images/logo1.png" alt="" width={44} height={44} className="object-contain" />
        <span className="font-display text-2xl font-bold tracking-tight text-text">FLEXNORA</span>
      </div>
      <div className="h-[2px] w-[160px] overflow-hidden rounded-full bg-white/8">
        <div className="h-full w-full origin-left animate-[loading-bar-fill_1.1s_ease-out_forwards] rounded-full bg-gradient-to-r from-electric-blue via-royal-blue to-purple" />
      </div>
    </div>
  );
}
