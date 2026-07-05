'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hotel, ArrowLeft, Loader2, Mail, Lock, Star, BedDouble, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { hotel } from '@/lib/demo/hotel-data';
import { useHotelAuth } from '@/lib/demo/store';

export default function HotelLoginPage() {
  const router = useRouter();
  const signIn = useHotelAuth((s) => s.signIn);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn();
      router.push('/demo/hotel/dashboard');
    }, 900);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1a1230] to-[#0d0a1a] p-12 text-white lg:flex">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(rgba(139,92,246,0.18) 1px,transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <Link href="/demo" className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All demos
        </Link>

        <div className="relative z-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
            <Hotel className="h-7 w-7 text-violet-300" />
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight">
            {hotel.name}
            <br />
            Staff Portal
          </h1>
          <p className="max-w-md text-white/70">
            One platform for reservations, rooms, guests, housekeeping, and an AI concierge — built
            for luxury hospitality teams.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: BedDouble, label: '18 Rooms & Suites' },
              { icon: Star, label: '4.8 Guest Rating' },
              { icon: Users, label: '7 VIP Guests' },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <f.icon className="mb-2 h-5 w-5 text-violet-300" />
                <p className="text-xs font-semibold text-white/80">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">This is a FLEXNORA product demo — no real guest data is used.</p>
      </div>

      <div className="flex flex-col items-center justify-center bg-background p-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <Link href="/demo" className="mb-8 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft className="h-4 w-4" /> All demos
          </Link>
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Welcome back.</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Sign in to manage {hotel.name}.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" defaultValue={hotel.manager.email} className="pl-9" readOnly />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" defaultValue="••••••••••" className="pl-9" readOnly />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo to-cyan text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo credentials are pre-filled — just click sign in.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
