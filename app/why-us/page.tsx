import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import WhyFlexnora from '@/components/WhyFlexnora';

export const metadata: Metadata = {
  title: 'Why FLEXNORA | FLEXNORA Digital',
  description: 'What sets FLEXNORA apart — innovation, security, and performance.',
};

export default function WhyUsPage() {
  return (
    <main>
      <BackToMap />
      <WhyFlexnora />
    </main>
  );
}
