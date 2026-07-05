import Link from 'next/link';
import { UserX } from 'lucide-react';
import { EmptyState } from '@/components/demo/EmptyState';

export default function GuestNotFound() {
  return (
    <EmptyState
      icon={UserX}
      title="Guest not found"
      description="This guest record doesn't exist or may have been removed."
      action={
        <Link
          href="/demo/hotel/guests"
          className="mt-2 inline-flex items-center rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2 text-sm font-semibold text-white"
        >
          Back to Guests
        </Link>
      }
    />
  );
}
