import { Skeleton } from '@/components/ui/skeleton';

export default function HotelAppLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-72 w-full rounded-2xl" />
    </div>
  );
}
