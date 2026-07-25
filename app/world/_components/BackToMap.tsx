import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackToMap() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-8">
      <Link
        href="/world"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo transition-transform hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> Back to the map
      </Link>
    </div>
  );
}
