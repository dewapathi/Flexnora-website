import type { Metadata } from 'next';
import { WorldMap } from './_components/WorldMap';

export const metadata: Metadata = {
  title: 'Explore the FLEXNORA World | FLEXNORA Digital',
  description:
    'Travel the FLEXNORA world map to explore our services, solutions, process, tech stack, and more.',
};

export default function WorldPage() {
  return (
    <main className="py-24">
      <div className="mx-auto mb-14 max-w-2xl px-6 text-center">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[2px] text-indigo">Explore</p>
        <h1 className="mb-4 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text">
          Welcome to the <span className="text-gradient">FLEXNORA world.</span>
        </h1>
        <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-text-2">
          Every region on this map is a real part of our site — travel to one, or open the list
          below if you&apos;d rather not click around.
        </p>
      </div>
      <WorldMap />
    </main>
  );
}
