export function HudFrame({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-electric-blue/30" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-electric-blue/30" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-electric-blue/30" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-electric-blue/30" />
      <span className="absolute -bottom-6 right-0 font-mono text-[0.65rem] tracking-wider text-text-3">
        FLX/HERO&middot;01
      </span>
    </div>
  );
}
