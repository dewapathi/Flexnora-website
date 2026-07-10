'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Cloud, Bot, Wrench, Users,
  Globe, ShoppingCart, AppWindow, Smartphone, Boxes, Building2, Contact, Laptop, Puzzle,
  CloudCog, Server, Settings, Box, LineChart, Database, LifeBuoy,
  MessageSquare, Workflow, Cog, Sparkles, FileText, Mic, BrainCircuit,
  RefreshCw, ShieldCheck, Gauge, Bug, PlusCircle, BarChart3,
  Monitor, GitBranch, TestTube,
  type LucideIcon,
} from 'lucide-react';
import { SiFigma } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { Container, SectionHeader, Reveal } from './ui';

type Item = { icon: LucideIcon | IconType; title: string; desc: string };
type Tab = { id: string; icon: LucideIcon; label: string; blurb: string; items: Item[] };

const tabs: Tab[] = [
  {
    id: 't1',
    icon: Code2,
    label: 'Software Dev',
    blurb: 'Websites, web apps, SaaS platforms, and mobile apps — engineered, not templated.',
    items: [
      { icon: Globe, title: 'Company Websites', desc: 'High-performance marketing sites and landing pages built for speed, SEO, and conversions.' },
      { icon: ShoppingCart, title: 'E-commerce Platforms', desc: 'Custom storefronts, payment integration, and inventory management for online businesses.' },
      { icon: AppWindow, title: 'Web Applications', desc: 'Complex web apps, portals, and dashboards built with React and Next.js architecture.' },
      { icon: Smartphone, title: 'Mobile Apps', desc: 'iOS and Android apps using Flutter or React Native — production-ready and App Store approved.' },
      { icon: Boxes, title: 'SaaS Products', desc: 'Full SaaS platforms with multi-tenancy, billing, onboarding, and admin dashboards.' },
      { icon: Building2, title: 'ERP Systems', desc: 'Custom enterprise resource planning systems tailored to your business workflows.' },
      { icon: Contact, title: 'CRM Development', desc: 'Bespoke CRM systems that match how your sales and customer teams actually work.' },
      { icon: Laptop, title: 'Desktop Applications', desc: 'Cross-platform desktop apps for internal tools, automation, and enterprise workflows.' },
      { icon: Puzzle, title: 'Custom Software', desc: 'Bespoke software solutions designed around your exact business requirements and processes.' },
    ],
  },
  {
    id: 't2',
    icon: Cloud,
    label: 'Cloud & Infra',
    blurb: 'Architecture, DevOps, and databases built to stay up and scale without drama.',
    items: [
      { icon: CloudCog, title: 'AWS', desc: 'Full AWS architecture, EC2, RDS, S3, Lambda, CloudFront — designed for reliability and scale.' },
      { icon: Cloud, title: 'Azure & GCP', desc: 'Microsoft Azure and Google Cloud setup, migration, and ongoing management.' },
      { icon: Server, title: 'Server Management', desc: 'Linux server setup, configuration, hardening, monitoring, and ongoing administration.' },
      { icon: Settings, title: 'DevOps & CI/CD', desc: 'Automated pipelines, deployment workflows, and infrastructure-as-code with Terraform.' },
      { icon: Box, title: 'Docker & Kubernetes', desc: 'Containerization, orchestration, and microservices architecture for scalable systems.' },
      { icon: LineChart, title: 'Monitoring & Alerts', desc: 'Real-time infrastructure monitoring, uptime checks, and proactive incident response.' },
      { icon: Database, title: 'Database Management', desc: 'PostgreSQL, MySQL, MongoDB — setup, optimization, backups, and scaling.' },
      { icon: LifeBuoy, title: 'Backup & Recovery', desc: 'Automated backup strategies and disaster recovery plans that protect your business data.' },
    ],
  },
  {
    id: 't3',
    icon: Bot,
    label: 'AI & Automation',
    blurb: 'Chatbots, agents, and workflow automation that remove real manual work.',
    items: [
      { icon: MessageSquare, title: 'AI Chatbots', desc: 'Intelligent customer-facing chatbots powered by Claude, OpenAI, or custom LLM pipelines.' },
      { icon: Workflow, title: 'Workflow Automation', desc: 'Automate repetitive business processes — approvals, notifications, data entry, and reporting.' },
      { icon: Cog, title: 'Business Process Automation', desc: 'End-to-end BPA solutions that connect your systems and eliminate manual handoffs.' },
      { icon: Bot, title: 'AI Agents', desc: 'Autonomous AI agents that handle research, analysis, data processing, and decision support.' },
      { icon: Sparkles, title: 'OpenAI & Claude Integration', desc: 'Integrate cutting-edge AI models into your existing products and workflows seamlessly.' },
      { icon: FileText, title: 'Document Processing', desc: 'Automated document extraction, classification, and processing using AI — invoices, contracts, reports.' },
      { icon: Mic, title: 'Voice AI', desc: 'Voice assistants, speech-to-text pipelines, and voice-enabled applications for modern UX.' },
      { icon: BrainCircuit, title: 'Custom AI Solutions', desc: 'Bespoke AI systems fine-tuned on your business data for maximum relevance and accuracy.' },
    ],
  },
  {
    id: 't4',
    icon: Wrench,
    label: 'Managed IT',
    blurb: 'Ongoing maintenance, security, and performance work — so nothing quietly breaks.',
    items: [
      { icon: RefreshCw, title: 'Website Maintenance', desc: 'Regular updates, content changes, plugin management, and ongoing website improvements.' },
      { icon: Smartphone, title: 'App Maintenance', desc: 'OS compatibility updates, bug fixes, feature additions, and App Store re-submissions.' },
      { icon: ShieldCheck, title: 'Security Updates', desc: 'Vulnerability patching, dependency updates, penetration testing, and security hardening.' },
      { icon: Gauge, title: 'Performance Optimization', desc: 'Speed audits, Core Web Vitals improvements, caching, and infrastructure tuning.' },
      { icon: Database, title: 'Database Administration', desc: 'Query optimization, indexing, migrations, backups, and database health monitoring.' },
      { icon: Bug, title: 'Bug Fixes & QA', desc: 'Rapid bug identification, root-cause analysis, fixing, and regression testing.' },
      { icon: PlusCircle, title: 'Feature Development', desc: 'Build new features into existing systems — scoped, designed, built, and tested on a monthly basis.' },
      { icon: BarChart3, title: 'Technical SEO', desc: 'Site speed, schema markup, crawlability, Core Web Vitals — technical SEO that moves rankings.' },
    ],
  },
  {
    id: 't5',
    icon: Users,
    label: 'Dedicated Teams',
    blurb: 'Engineers, designers, and PMs embedded in your team, not a ticket queue.',
    items: [
      { icon: Monitor, title: 'Frontend Developers', desc: 'React, Next.js, Vue, Tailwind — pixel-perfect UI engineers who care about UX.' },
      { icon: Server, title: 'Backend Developers', desc: 'Node.js, Django, FastAPI, PostgreSQL — robust API and system engineers.' },
      { icon: GitBranch, title: 'Full Stack Developers', desc: 'End-to-end engineers who own features from database schema to polished UI.' },
      { icon: Smartphone, title: 'Mobile Developers', desc: 'Flutter and React Native specialists for iOS and Android production apps.' },
      { icon: SiFigma, title: 'UI/UX Designers', desc: 'Product designers who create beautiful, user-tested interfaces that convert.' },
      { icon: TestTube, title: 'QA Engineers', desc: 'Manual and automated testing specialists who ensure your software ships bug-free.' },
      { icon: Settings, title: 'DevOps Engineers', desc: 'Cloud, CI/CD, Docker, Kubernetes — infrastructure engineers who keep systems running.' },
      { icon: BrainCircuit, title: 'AI Engineers', desc: 'LLM integration, RAG pipelines, fine-tuning, and AI product development specialists.' },
      { icon: Workflow, title: 'Project Managers', desc: 'Experienced PMs who keep projects on time, on scope, and stakeholders aligned.' },
    ],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('t1');
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="services" aria-labelledby="svc-h" className="relative scroll-mt-20">
      <div
        aria-hidden="true"
        className="absolute -left-[200px] -top-[200px] h-[600px] w-[600px] rounded-full blur-[80px]"
        style={{ background: 'rgba(46,107,255,0.06)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-[150px] -right-[150px] h-[500px] w-[500px] rounded-full blur-[80px]"
        style={{ background: 'rgba(168,85,247,0.05)' }}
      />
      <div className="relative py-[120px]">
        <Container>
          <SectionHeader
            kicker="Full service coverage"
            title={
              <>
                Everything your business
                <br />
                <span className="text-gradient-premium">needs to grow.</span>
              </>
            }
            desc="Five complete service pillars. One technology partner."
          />

          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Left: sticky index rail */}
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <div className="flex flex-col">
                {tabs.map((tab, i) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <div key={tab.id} className="border-b border-border last:border-b-0 lg:border-none">
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        onMouseEnter={() => setActiveTab(tab.id)}
                        className={`group relative flex w-full items-start gap-4 border-l-2 py-5 pl-5 text-left transition-colors ${
                          isActive ? 'border-electric-blue' : 'border-transparent hover:border-border-strong'
                        }`}
                      >
                        <span className={`font-display text-sm font-bold ${isActive ? 'text-electric-blue' : 'text-text-3'}`}>
                          0{i + 1}
                        </span>
                        <span>
                          <span
                            className={`block font-display text-xl font-bold transition-colors sm:text-2xl ${
                              isActive ? 'text-text' : 'text-text-2 group-hover:text-text'
                            }`}
                          >
                            {tab.label}
                          </span>
                          {isActive && (
                            <span className="mt-1 block text-sm leading-relaxed text-text-2">{tab.blurb}</span>
                          )}
                        </span>
                      </button>

                      {/* Mobile accordion body */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden lg:hidden"
                          >
                            <ServiceList items={tab.items} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Right: animated detail canvas (desktop only) */}
            <div className="hidden lg:block">
              <div
                data-lenis-prevent
                className="relative max-h-[560px] overflow-y-auto rounded-3xl border border-border bg-surface p-2"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ServiceList items={active.items} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function ServiceList({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-border px-3 py-2 lg:px-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-4 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-electric-blue/20 bg-electric-blue/10 text-electric-blue">
            <item.icon className="h-[0.9rem] w-[0.9rem]" />
          </div>
          <div>
            <h3 className="mb-1 text-[0.9rem] font-bold text-text">{item.title}</h3>
            <p className="text-[0.8rem] leading-relaxed text-text-2">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
