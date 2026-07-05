'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter,
  SiPython, SiDjango, SiFastapi, SiNodedotjs,
  SiPostgresql, SiRedis, SiMongodb,
  SiDocker, SiKubernetes, SiNginx, SiGithubactions,
  SiClaude,
} from 'react-icons/si';
import { Monitor, Server, Database, Cloud, Bot, BrainCircuit, Workflow, Zap, Sparkles, type LucideIcon } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';
import type { IconType } from 'react-icons';

type Tech = { icon: IconType | LucideIcon; label: string; color: string };
type Category = { id: string; label: string; icon: LucideIcon; items: Tech[] };

const categories: Category[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Monitor,
    items: [
      { icon: SiReact, label: 'React', color: '#61dafb' },
      { icon: SiNextdotjs, label: 'Next.js', color: '#ffffff' },
      { icon: SiTypescript, label: 'TypeScript', color: '#3178c6' },
      { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#38bdf8' },
      { icon: SiFlutter, label: 'Flutter', color: '#54c5f8' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    items: [
      { icon: SiPython, label: 'Python', color: '#ffd43b' },
      { icon: SiDjango, label: 'Django', color: '#44b78b' },
      { icon: SiFastapi, label: 'FastAPI', color: '#05998b' },
      { icon: SiNodedotjs, label: 'Node.js', color: '#83cd29' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    items: [
      { icon: SiPostgresql, label: 'PostgreSQL', color: '#336791' },
      { icon: SiRedis, label: 'Redis', color: '#d82c20' },
      { icon: SiMongodb, label: 'MongoDB', color: '#47a248' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: Cloud,
    items: [
      { icon: Cloud, label: 'AWS', color: '#ff9900' },
      { icon: SiDocker, label: 'Docker', color: '#2496ed' },
      { icon: SiKubernetes, label: 'Kubernetes', color: '#326ce5' },
      { icon: SiNginx, label: 'Nginx', color: '#009639' },
      { icon: SiGithubactions, label: 'GitHub Actions', color: '#ffffff' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Bot,
    items: [
      { icon: Sparkles, label: 'OpenAI', color: '#ffffff' },
      { icon: SiClaude, label: 'Claude AI', color: '#d97757' },
      { icon: BrainCircuit, label: 'LLMs', color: '#a855f7' },
      { icon: Workflow, label: 'RAG Pipelines', color: '#06b6d4' },
      { icon: Database, label: 'Vector Databases', color: '#10b981' },
      { icon: Zap, label: 'Automation', color: '#fbbf24' },
    ],
  },
];

export default function TechStack() {
  const [active, setActive] = useState('frontend');
  const cat = categories.find((c) => c.id === active)!;

  return (
    <section id="tech" aria-labelledby="tech-h" className="scroll-mt-20">
      <div className="py-[120px]">
        <Container>
          <SectionHeader
            kicker="Tech stack"
            title={
              <>
                The tools we
                <br />
                <span className="text-gradient">trust to ship.</span>
              </>
            }
            desc="Modern, proven technologies chosen for performance, scalability, and developer experience."
          />

          <Reveal className="mx-auto mb-12 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-border bg-surface p-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === c.id
                    ? 'bg-gradient-to-br from-indigo to-violet text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)]'
                    : 'text-text-2 hover:bg-surface-2 hover:text-text'
                }`}
              >
                <c.icon className="h-4 w-4" /> {c.label}
              </button>
            ))}
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {cat.items.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-[18px] py-2.5 text-sm font-semibold text-text-2 transition-all hover:-translate-y-0.5 hover:border-indigo/30 hover:bg-indigo/10 hover:text-text"
                >
                  <t.icon className="h-4 w-4" style={{ color: t.color }} />
                  {t.label}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </div>
    </section>
  );
}
