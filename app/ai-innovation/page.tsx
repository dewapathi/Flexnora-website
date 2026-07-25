import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import AIInnovation from '@/components/AIInnovation';

export const metadata: Metadata = {
  title: 'AI Innovation | FLEXNORA Digital',
  description: 'AI chatbots, document AI, invoice AI, and voice AI capabilities.',
};

export default function AIInnovationPage() {
  return (
    <main>
      <BackToMap />
      <AIInnovation />
    </main>
  );
}
