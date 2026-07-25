import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import FinalCta from '@/components/FinalCta';

export const metadata: Metadata = {
  title: 'Contact | FLEXNORA Digital',
  description: 'Get in touch — start your project today.',
};

export default function ContactPage() {
  return (
    <main>
      <BackToMap />
      <Faq />
      <Contact />
      <FinalCta />
    </main>
  );
}
