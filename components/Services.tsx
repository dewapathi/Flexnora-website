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
type Tab = { id: string; icon: LucideIcon; label: string; items: Item[] };

const tabs: Tab[] = [
  {
    id: 't1',
    icon: Code2,
    label: 'Software Dev',
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
        style={{ background: 'rgba(99,102,241,0.08)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-[150px] -right-[150px] h-[500px] w-[500px] rounded-full blur-[80px]"
        style={{ background: 'rgba(139,92,246,0.06)' }}
      />
      <div className="relative py-[120px]">
        <Container>
          <SectionHeader
            kicker="Full service coverage"
            title={
              <>
                Everything your business
                <br />
                <span className="text-gradient">needs to grow.</span>
              </>
            }
            desc="Five complete service pillars. One technology partner."
          />

          <Reveal className="mb-14 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-border bg-surface p-1.5 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-indigo to-violet text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)]'
                    : 'text-text-2 hover:bg-surface-2 hover:text-text'
                }`}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              role="tabpanel"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {active.items.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-3.5 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-indigo/35"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-indigo/20 bg-indigo/10 text-indigo transition-all group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-indigo group-hover:to-violet group-hover:text-white">
                    <item.icon className="h-[0.95rem] w-[0.95rem]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[0.9rem] font-bold text-text">{item.title}</h3>
                    <p className="text-[0.8rem] leading-relaxed text-text-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </div>
    </section>
  );
}
