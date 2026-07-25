import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import TechStack from '@/components/TechStack';

export const metadata: Metadata = {
  title: 'Tech Stack | FLEXNORA Digital',
  description: 'The frameworks, languages, and infrastructure we build with.',
};

export default function TechStackPage() {
  return (
    <main>
      <BackToMap />
      <TechStack />
    </main>
  );
}
