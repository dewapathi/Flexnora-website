'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Search, UserPlus, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmptyState } from '@/components/demo/EmptyState';
import { simulatedDelay } from '@/lib/demo/query-provider';
import { patients, type Patient } from '@/lib/demo/healthcare-data';

const STATUS_BADGE: Record<Patient['status'], string> = {
  Stable: 'bg-green/10 text-green border-green/20',
  Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  Recovering: 'bg-cyan/10 text-cyan border-cyan/20',
  Scheduled: 'bg-amber/10 text-amber border-amber/20',
};

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');

  const { data, isFetching } = useQuery({
    queryKey: ['patients'],
    queryFn: () => simulatedDelay(patients, 400),
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Patients</h2>
          <p className="mt-1 text-sm text-muted-foreground">{data?.length ?? 0} patients under your care</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5">
          <UserPlus className="h-4 w-4" /> Add Patient
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or condition..."
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v ?? 'all')}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status">{(v: string) => (v === 'all' ? 'All statuses' : v)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Stable">Stable</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="Recovering">Recovering</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={`overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No patients found"
            description="Try adjusting your search or status filter to find what you're looking for."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden md:table-cell">Condition</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                <TableHead className="hidden lg:table-cell">Blood Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/demo/healthcare/patients/${p.id}`} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{p.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.age} yrs · {p.gender}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">{p.condition}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className={STATUS_BADGE[p.status]}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{p.lastVisit}</TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{p.bloodType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
