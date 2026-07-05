'use client';
import { motion } from 'framer-motion';
import { Hotel, ShoppingCart, HeartPulse, Building2, Home, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const industries = [
  {
    icon: Hotel,
    title: 'Hotel & Hospitality',
    grad: 'from-indigo/40 to-violet/20',
    features: ['Real-time room booking engine', 'Housekeeping & staff scheduling', 'Multi-property dashboard'],
    stack: ['Next.js', 'PostgreSQL', 'Stripe'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    grad: 'from-cyan/40 to-indigo/20',
    features: ['Custom storefront & checkout', 'Inventory & order management', 'Multi-currency, multi-warehouse'],
    stack: ['Next.js', 'Django', 'Redis'],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    grad: 'from-green/40 to-cyan/20',
    features: ['Patient records & scheduling', 'Telehealth video consultations', 'HIPAA-aware data handling'],
    stack: ['React', 'FastAPI', 'PostgreSQL'],
  },
  {
    icon: Building2,
    title: 'ERP / CRM',
    grad: 'from-violet/40 to-indigo/20',
    features: ['Sales pipeline & lead scoring', 'Inventory & procurement', 'Role-based team dashboards'],
    stack: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    icon: Home,
    title: 'Real Estate',
    grad: 'from-amber/30 to-violet/20',
    features: ['Property listings & search filters', 'Virtual tour integration', 'Agent & lead CRM'],
    stack: ['Next.js', 'Django', 'MongoDB'],
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurant',
    grad: 'from-cyan/40 to-green/20',
    features: ['Online ordering & table booking', 'Kitchen display system', 'Loyalty & rewards program'],
    stack: ['React Native', 'Node.js', 'Redis'],
  },
];

export default function SolutionGallery() {
  return (
    <section id="solutions" aria-labelledby="sol-h" className="scroll-mt-20">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="Solution gallery"
            title={
              <>
                Software built for
                <br />
                <span className="text-gradient">your industry.</span>
              </>
            }
            desc="A preview of the kind of platforms we build — every project is custom-designed and engineered around your exact workflow, not a template."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-2 transition-colors hover:border-indigo/40"
                >
                  <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${s.grad} p-4`}>
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-2.5 w-2/3 rounded-full bg-white/25" />
                      <div className="h-2.5 w-1/2 rounded-full bg-white/15" />
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="h-10 rounded-lg bg-white/15" />
                        <div className="h-10 rounded-lg bg-white/10" />
                        <div className="h-10 rounded-lg bg-white/10" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                      <s.icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="mb-3 text-lg font-bold text-text">{s.title}</h3>
                    <ul className="mb-5 space-y-1.5">
                      {s.features.map((f) => (
                        <li key={f} className="text-sm text-text-2">
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {s.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-indigo/20 bg-indigo/10 px-2.5 py-1 text-xs font-semibold text-lilac"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo transition-transform hover:gap-2.5"
                    >
                      Request a similar build <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
