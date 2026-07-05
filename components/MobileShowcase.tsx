'use client';
import { motion } from 'framer-motion';
import { Bike, HeartPulse, Wallet, Plane } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const apps = [
  { icon: Bike, title: 'Food Delivery', grad: 'from-indigo to-violet', delay: '0s' },
  { icon: HeartPulse, title: 'Healthcare', grad: 'from-green to-cyan', delay: '0.4s' },
  { icon: Wallet, title: 'Finance', grad: 'from-violet to-indigo', delay: '0.8s' },
  { icon: Plane, title: 'Travel', grad: 'from-cyan to-indigo', delay: '1.2s' },
];

export default function MobileShowcase() {
  return (
    <section id="mobile" aria-labelledby="mob-h" className="scroll-mt-20 bg-bg-1">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="Mobile app development"
            title={
              <>
                Native-feel apps,
                <br />
                <span className="text-gradient">any industry.</span>
              </>
            }
            desc="Flutter and React Native builds engineered for performance — published to the App Store and Google Play, monetization and analytics included."
          />

          <div className="flex flex-wrap items-end justify-center gap-8">
            {apps.map((app, i) => (
              <Reveal key={app.title} delay={i * 0.08}>
                <motion.div
                  style={{ animationDelay: app.delay }}
                  className="animate-float"
                >
                  <div className="relative h-[380px] w-[190px] overflow-hidden rounded-[2.25rem] border-[6px] border-white/10 bg-bg-2 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
                    <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black/60" />
                    <div className={`h-full w-full bg-gradient-to-br ${app.grad} p-4 pt-9 opacity-90`}>
                      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                        <app.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2.5 w-3/4 rounded-full bg-white/40" />
                        <div className="h-2.5 w-1/2 rounded-full bg-white/25" />
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="h-16 rounded-xl bg-white/15" />
                        <div className="h-16 rounded-xl bg-white/10" />
                        <div className="h-16 rounded-xl bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm font-semibold text-text-2">{app.title}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
