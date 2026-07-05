'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useDemoUI } from '@/lib/demo/store';

export type DemoNavItem = { href: string; label: string; icon: LucideIcon };

function NavLinks({ items, basePath }: { items: DemoNavItem[]; basePath: string }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 px-3">
      {items.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? 'bg-indigo/10 text-indigo' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <item.icon className="h-[1.05rem] w-[1.05rem]" />
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/demo"
        className="mt-4 flex items-center gap-3 rounded-xl border-t border-border px-3 pt-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-[1.05rem] w-[1.05rem]" />
        Exit Demo
      </Link>
    </nav>
  );
}

export function DemoSidebar({
  items,
  basePath,
  industryLabel,
  industryIcon: IndustryIcon,
}: {
  items: DemoNavItem[];
  basePath: string;
  industryLabel: string;
  industryIcon: LucideIcon;
}) {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useDemoUI();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar py-6 lg:flex">
        <div className="mb-6 flex items-center gap-2.5 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-cyan text-white">
            <IndustryIcon className="h-[1.05rem] w-[1.05rem]" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-foreground">{industryLabel}</p>
            <p className="text-[0.7rem] text-muted-foreground">FLEXNORA Demo</p>
          </div>
        </div>
        <NavLinks items={items} basePath={basePath} />
      </aside>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="mb-6 flex items-center gap-2.5 px-5 pt-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-cyan text-white">
              <IndustryIcon className="h-[1.05rem] w-[1.05rem]" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-foreground">{industryLabel}</p>
              <p className="text-[0.7rem] text-muted-foreground">FLEXNORA Demo</p>
            </div>
          </div>
          <NavLinks items={items} basePath={basePath} />
        </SheetContent>
      </Sheet>
    </>
  );
}
