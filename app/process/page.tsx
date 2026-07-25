import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import Process from '@/components/Process';

export const metadata: Metadata = {
  title: 'Our Process | FLEXNORA Digital',
  description: 'How we work, from discovery through deployment.',
};

export default function ProcessPage() {
  return (
    <main>
      <BackToMap />
      <Process />
    </main>
  );
}
