import type { ReactNode } from 'react';

export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[640px] w-[310px] overflow-hidden rounded-[2.75rem] border-[8px] border-neutral-900 bg-neutral-900 shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
        <div className="h-full w-full overflow-y-auto rounded-[2.1rem] bg-background [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
      {label && <p className="text-sm font-semibold text-muted-foreground">{label}</p>}
    </div>
  );
}
