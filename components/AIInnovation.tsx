'use client';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Receipt, Mic, TrendingUp, BookOpen } from 'lucide-react';
import { Container, SectionHeader, Reveal } from './ui';

const capabilities = [
  { icon: MessageSquare, title: 'AI Chatbot', desc: 'Conversational agents trained on your product and docs, handling support and lead qualification 24/7.' },
  { icon: FileText, title: 'Document AI', desc: 'Extract, classify, and structure data from contracts, forms, and reports automatically.' },
  { icon: Receipt, title: 'Invoice AI', desc: 'Parse invoices and receipts into structured records, reconciled straight into your accounting system.' },
  { icon: Mic, title: 'Voice AI', desc: 'Speech-to-text pipelines and voice assistants for hands-free, natural interactions.' },
  { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Forecast demand, churn, and revenue using models trained on your historical business data.' },
  { icon: BookOpen, title: 'Knowledge Assistant', desc: 'RAG-powered internal assistants that answer questions from your own documentation and data.' },
];

export default function AIInnovation() {
  return (
    <section id="ai" aria-labelledby="ai-h" className="relative scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(ellipse,rgba(6,182,212,0.14) 0%,rgba(99,102,241,0.08) 50%,transparent 70%)' }}
      />
      <div className="relative py-[120px]">
        <Container>
          <SectionHeader
            kicker="AI innovation"
            title={
              <>
                AI capabilities built
                <br />
                <span className="text-gradient">into every product.</span>
              </>
            }
            desc="We integrate OpenAI, Claude, and custom LLM pipelines directly into your workflows — here's what we build most often."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan transition-all group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-indigo group-hover:text-white">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-text-3">
                      Capability
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-text-2">{c.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
