export type Region = {
  slug: string;
  label: string;
  route: string;
  description: string;
  /** Percentage-based so hotspot placement survives swapping the placeholder map for real artwork,
   * as long as the new image keeps roughly the same aspect ratio. */
  hotspot: { xPct: number; yPct: number };
};

export const regions: Region[] = [
  {
    slug: 'why-us',
    label: 'Why FLEXNORA',
    route: '/why-us',
    description: 'What sets us apart — innovation, security, and performance.',
    hotspot: { xPct: 18, yPct: 30 },
  },
  {
    slug: 'solutions',
    label: 'Solution Gallery',
    route: '/solutions',
    description: 'Explore real, interactive product demos across industries.',
    hotspot: { xPct: 38, yPct: 20 },
  },
  {
    slug: 'services',
    label: 'Services',
    route: '/services',
    description: 'Full-service software, web, and mobile development coverage.',
    hotspot: { xPct: 58, yPct: 25 },
  },
  {
    slug: 'mobile-apps',
    label: 'Mobile Apps',
    route: '/mobile-apps',
    description: 'Mobile app development across food delivery, healthcare, and finance.',
    hotspot: { xPct: 75, yPct: 18 },
  },
  {
    slug: 'ai-innovation',
    label: 'AI Innovation',
    route: '/ai-innovation',
    description: 'AI chatbots, document AI, invoice AI, and voice AI capabilities.',
    hotspot: { xPct: 85, yPct: 38 },
  },
  {
    slug: 'process',
    label: 'Our Process',
    route: '/process',
    description: 'How we work, from discovery through deployment.',
    hotspot: { xPct: 68, yPct: 50 },
  },
  {
    slug: 'tech-stack',
    label: 'Tech Stack',
    route: '/tech-stack',
    description: 'The frameworks, languages, and infrastructure we build with.',
    hotspot: { xPct: 48, yPct: 45 },
  },
  {
    slug: 'comparison',
    label: 'Comparison',
    route: '/comparison',
    description: 'Hiring in-house vs. partnering with FLEXNORA, side by side.',
    hotspot: { xPct: 28, yPct: 55 },
  },
  {
    slug: 'testimonials',
    label: 'Testimonials',
    route: '/testimonials',
    description: 'Client stories, ratings, and delivery stats.',
    hotspot: { xPct: 15, yPct: 68 },
  },
  {
    slug: 'it-partnership',
    label: 'IT Partnership',
    route: '/it-partnership',
    description: 'Become an outsourced technology department, fully managed.',
    hotspot: { xPct: 35, yPct: 78 },
  },
  {
    slug: 'hire-developers',
    label: 'Hire Developers',
    route: '/hire-developers',
    description: 'Dedicated frontend, backend, full stack, and mobile developers.',
    hotspot: { xPct: 58, yPct: 72 },
  },
  {
    slug: 'contact',
    label: 'Contact',
    route: '/contact',
    description: 'Get in touch — start your project today.',
    hotspot: { xPct: 80, yPct: 65 },
  },
];
