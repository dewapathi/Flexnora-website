'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, LogOut, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/ThemeToggle';
import { useDemoUI } from '@/lib/demo/store';
import type { DemoNavItem } from './DemoSidebar';

const notifications = [
  { title: 'Lab results ready', desc: 'Marcus Webb — Angiogram results uploaded', time: '5m ago' },
  { title: 'Appointment reminder', desc: 'Isabelle Moreau in 45 minutes (Video)', time: '20m ago' },
  { title: 'New message', desc: 'Nurse station flagged a medication refill request', time: '1h ago' },
];

export function DemoTopbar({
  items,
  user,
  basePath,
}: {
  items: DemoNavItem[];
  user: { name: string; role: string; initials: string };
  basePath: string;
}) {
  const { setMobileSidebarOpen } = useDemoUI();
  const pathname = usePathname();
  const title = items.find((item) => pathname === item.href || pathname?.startsWith(item.href + '/'))?.label ?? 'Overview';

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl lg:px-8">
      <button
        className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="hidden font-display text-lg font-bold text-foreground sm:block">{title}</h1>

      <div className="relative ml-auto flex max-w-sm flex-1 items-center lg:ml-8">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search patients, appointments..." className="pl-9" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Notifications" />}
        >
          <Bell className="h-[1.1rem] w-[1.1rem]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((n) => (
            <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-0.5 whitespace-normal py-2.5">
              <span className="text-sm font-semibold text-foreground">{n.title}</span>
              <span className="text-xs text-muted-foreground">{n.desc}</span>
              <span className="text-[0.7rem] text-muted-foreground/70">{n.time}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger render={<button className="flex items-center gap-2 rounded-lg p-1 hover:bg-muted" aria-label="Account menu" />}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{user.initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">{user.role}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href={`${basePath}/profile`} />}>
            <User className="h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`${basePath}/settings`} />}>
            <Settings className="h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/demo" />}>
            <LogOut className="h-4 w-4" /> Exit Demo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
