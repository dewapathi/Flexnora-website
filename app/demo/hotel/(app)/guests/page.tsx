'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Users, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { EmptyState } from '@/components/demo/EmptyState';
import { guests } from '@/lib/demo/hotel-data';

const TIER_BADGE: Record<string, string> = {
  Silver: 'bg-muted text-muted-foreground border-transparent',
  Gold: 'bg-amber/10 text-amber border-amber/20',
  Platinum: 'bg-violet/10 text-violet border-violet/20',
};

export default function GuestsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.nationality.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Guests</h2>
        <p className="mt-1 text-sm text-muted-foreground">{guests.length} guests on file</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or nationality..." className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {filtered.length === 0 ? (
          <EmptyState icon={Users} title="No guests found" description="Try a different search term." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead className="hidden md:table-cell">Nationality</TableHead>
                <TableHead className="hidden sm:table-cell">Loyalty Tier</TableHead>
                <TableHead className="hidden lg:table-cell">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>
                    <Link href={`/demo/hotel/guests/${g.id}`} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{g.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="flex items-center gap-1.5 font-semibold text-foreground">
                          {g.name} {g.vip && <Crown className="h-3.5 w-3.5 text-amber" />}
                        </p>
                        <p className="text-xs text-muted-foreground">{g.email}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">{g.nationality}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className={TIER_BADGE[g.loyaltyTier]}>
                      {g.loyaltyTier}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{g.loyaltyPoints.toLocaleString()} pts</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
