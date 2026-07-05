'use client';
import { useState, useEffect, useRef } from 'react';

const tabs = [
  {
    id: 't1',
    icon: 'fa-solid fa-code',
    label: 'Software Dev',
    items: [
      { icon: 'fa-globe', title: 'Company Websites', desc: 'High-performance marketing sites and landing pages built for speed, SEO, and conversions.' },
      { icon: 'fa-cart-shopping', title: 'E-commerce Platforms', desc: 'Custom storefronts, payment integration, and inventory management for online businesses.' },
      { icon: 'fa-window-restore', title: 'Web Applications', desc: 'Complex web apps, portals, and dashboards built with React and Next.js architecture.' },
      { icon: 'fa-mobile-screen', title: 'Mobile Apps', desc: 'iOS and Android apps using Flutter or React Native — production-ready and App Store approved.' },
      { icon: 'fa-cubes', title: 'SaaS Products', desc: 'Full SaaS platforms with multi-tenancy, billing, onboarding, and admin dashboards.' },
      { icon: 'fa-building', title: 'ERP Systems', desc: 'Custom enterprise resource planning systems tailored to your business workflows.' },
      { icon: 'fa-address-book', title: 'CRM Development', desc: 'Bespoke CRM systems that match how your sales and customer teams actually work.' },
      { icon: 'fa-laptop-code', title: 'Desktop Applications', desc: 'Cross-platform desktop apps for internal tools, automation, and enterprise workflows.' },
      { icon: 'fa-puzzle-piece', title: 'Custom Software', desc: 'Bespoke software solutions designed around your exact business requirements and processes.' },
    ],
  },
  {
    id: 't2',
    icon: 'fa-brands fa-aws',
    label: 'Cloud & Infra',
    items: [
      { icon: 'fa-brands fa-aws', title: 'AWS', desc: 'Full AWS architecture, EC2, RDS, S3, Lambda, CloudFront — designed for reliability and scale.' },
      { icon: 'fa-cloud', title: 'Azure & GCP', desc: 'Microsoft Azure and Google Cloud setup, migration, and ongoing management.' },
      { icon: 'fa-server', title: 'Server Management', desc: 'Linux server setup, configuration, hardening, monitoring, and ongoing administration.' },
      { icon: 'fa-gear', title: 'DevOps & CI/CD', desc: 'Automated pipelines, deployment workflows, and infrastructure-as-code with Terraform.' },
      { icon: 'fa-brands fa-docker', title: 'Docker & Kubernetes', desc: 'Containerization, orchestration, and microservices architecture for scalable systems.' },
      { icon: 'fa-chart-line', title: 'Monitoring & Alerts', desc: 'Real-time infrastructure monitoring, uptime checks, and proactive incident response.' },
      { icon: 'fa-database', title: 'Database Management', desc: 'PostgreSQL, MySQL, MongoDB — setup, optimization, backups, and scaling.' },
      { icon: 'fa-life-ring', title: 'Backup & Recovery', desc: 'Automated backup strategies and disaster recovery plans that protect your business data.' },
    ],
  },
  {
    id: 't3',
    icon: 'fa-solid fa-robot',
    label: 'AI & Automation',
    items: [
      { icon: 'fa-comments', title: 'AI Chatbots', desc: 'Intelligent customer-facing chatbots powered by Claude, OpenAI, or custom LLM pipelines.' },
      { icon: 'fa-diagram-project', title: 'Workflow Automation', desc: 'Automate repetitive business processes — approvals, notifications, data entry, and reporting.' },
      { icon: 'fa-gears', title: 'Business Process Automation', desc: 'End-to-end BPA solutions that connect your systems and eliminate manual handoffs.' },
      { icon: 'fa-robot', title: 'AI Agents', desc: 'Autonomous AI agents that handle research, analysis, data processing, and decision support.' },
      { icon: 'fa-wand-magic-sparkles', title: 'OpenAI & Claude Integration', desc: 'Integrate cutting-edge AI models into your existing products and workflows seamlessly.' },
      { icon: 'fa-file-lines', title: 'Document Processing', desc: 'Automated document extraction, classification, and processing using AI — invoices, contracts, reports.' },
      { icon: 'fa-microphone', title: 'Voice AI', desc: 'Voice assistants, speech-to-text pipelines, and voice-enabled applications for modern UX.' },
      { icon: 'fa-brain', title: 'Custom AI Solutions', desc: 'Bespoke AI systems fine-tuned on your business data for maximum relevance and accuracy.' },
    ],
  },
  {
    id: 't4',
    icon: 'fa-solid fa-wrench',
    label: 'Managed IT',
    items: [
      { icon: 'fa-rotate', title: 'Website Maintenance', desc: 'Regular updates, content changes, plugin management, and ongoing website improvements.' },
      { icon: 'fa-mobile-screen', title: 'App Maintenance', desc: 'OS compatibility updates, bug fixes, feature additions, and App Store re-submissions.' },
      { icon: 'fa-shield-halved', title: 'Security Updates', desc: 'Vulnerability patching, dependency updates, penetration testing, and security hardening.' },
      { icon: 'fa-gauge-high', title: 'Performance Optimization', desc: 'Speed audits, Core Web Vitals improvements, caching, and infrastructure tuning.' },
      { icon: 'fa-database', title: 'Database Administration', desc: 'Query optimization, indexing, migrations, backups, and database health monitoring.' },
      { icon: 'fa-bug-slash', title: 'Bug Fixes & QA', desc: 'Rapid bug identification, root-cause analysis, fixing, and regression testing.' },
      { icon: 'fa-circle-plus', title: 'Feature Development', desc: 'Build new features into existing systems — scoped, designed, built, and tested on a monthly basis.' },
      { icon: 'fa-magnifying-glass-chart', title: 'Technical SEO', desc: 'Site speed, schema markup, crawlability, Core Web Vitals — technical SEO that moves rankings.' },
    ],
  },
  {
    id: 't5',
    icon: 'fa-solid fa-users',
    label: 'Dedicated Teams',
    items: [
      { icon: 'fa-display', title: 'Frontend Developers', desc: 'React, Next.js, Vue, Tailwind — pixel-perfect UI engineers who care about UX.' },
      { icon: 'fa-server', title: 'Backend Developers', desc: 'Node.js, Django, FastAPI, PostgreSQL — robust API and system engineers.' },
      { icon: 'fa-code-branch', title: 'Full Stack Developers', desc: 'End-to-end engineers who own features from database schema to polished UI.' },
      { icon: 'fa-mobile-screen', title: 'Mobile Developers', desc: 'Flutter and React Native specialists for iOS and Android production apps.' },
      { icon: 'fa-brands fa-figma', title: 'UI/UX Designers', desc: 'Product designers who create beautiful, user-tested interfaces that convert.' },
      { icon: 'fa-vial', title: 'QA Engineers', desc: 'Manual and automated testing specialists who ensure your software ships bug-free.' },
      { icon: 'fa-gear', title: 'DevOps Engineers', desc: 'Cloud, CI/CD, Docker, Kubernetes — infrastructure engineers who keep systems running.' },
      { icon: 'fa-brain', title: 'AI Engineers', desc: 'LLM integration, RAG pipelines, fine-tuning, and AI product development specialists.' },
      { icon: 'fa-diagram-project', title: 'Project Managers', desc: 'Experienced PMs who keep projects on time, on scope, and stakeholders aligned.' },
    ],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('t1');
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const items = pane.querySelectorAll<HTMLElement>('.tsvc');
    items.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'none';
    });
    requestAnimationFrame(() => {
      items.forEach((el, i) => {
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease,transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 40);
      });
    });
  }, [activeTab]);

  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="services" aria-labelledby="svc-h">
      <div className="orb" style={{ width: '600px', height: '600px', background: 'rgba(99,102,241,0.08)', top: '-200px', left: '-200px' }} aria-hidden="true"></div>
      <div className="orb" style={{ width: '500px', height: '500px', background: 'rgba(139,92,246,0.06)', bottom: '-150px', right: '-150px' }} aria-hidden="true"></div>
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">Full service coverage</p>
          <h2 id="svc-h" className="rv">
            Everything your business<br /><span className="g">needs to grow.</span>
          </h2>
          <p className="rv d1">Five complete service pillars. One technology partner.</p>
        </div>
        <div className="tab-nav rv d1" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? ' act' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i> {tab.label}
            </button>
          ))}
        </div>
        <div ref={paneRef} className="tab-pane act" role="tabpanel">
          {active.items.map((item, i) => (
            <div key={i} className="tsvc">
              <div className="tsvc-ic"><i className={`fa-solid ${item.icon}`}></i></div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
