import { notFound } from 'next/navigation';
import { industries, getIndustry } from '@/lib/demo/industries';
import { ComingSoonTeaser } from '../_components/ComingSoonTeaser';

export function generateStaticParams() {
  return industries.filter((i) => i.status === 'soon').map((i) => ({ industry: i.slug }));
}

export default function IndustryComingSoonPage({ params }: { params: { industry: string } }) {
  const industry = getIndustry(params.industry);
  if (!industry || industry.status !== 'soon') notFound();
  return <ComingSoonTeaser industry={industry} />;
}
