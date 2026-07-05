import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

export default function HealthcareNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
        <HeartPulse className="h-7 w-7" />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This page doesn&apos;t exist in the Healthcare demo. Head back to the dashboard to keep exploring.
      </p>
      <Link
        href="/demo/healthcare/dashboard"
        className="mt-2 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
