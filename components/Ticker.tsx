import { Code2, Smartphone, Zap, Palette, Clapperboard, PenLine, Rocket, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Code2, label: 'Web Development' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: Zap, label: 'Automation' },
  { icon: Palette, label: 'Brand Design' },
  { icon: Clapperboard, label: 'Video Production' },
  { icon: PenLine, label: 'Content Strategy' },
  { icon: Rocket, label: 'Product Launch' },
  { icon: ShieldCheck, label: 'Secure Builds' },
];

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden border-y border-border bg-surface py-[18px]"
    >
      <div className="flex w-max animate-tick gap-[60px] group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-text-3"
          >
            <item.icon className="h-[0.95rem] w-[0.95rem] text-indigo" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
