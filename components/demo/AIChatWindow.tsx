'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string };

export function AIChatWindow({
  assistantName,
  assistantDescription,
  seedMessage,
  suggestedPrompts,
  getResponse,
  placeholder = 'Ask a question...',
}: {
  assistantName: string;
  assistantDescription: string;
  seedMessage: string;
  suggestedPrompts: string[];
  getResponse: (input: string) => string;
  placeholder?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'seed', role: 'assistant', content: seedMessage }]);
  const [isTyping, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  function send(content: string) {
    if (!content.trim()) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', content }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', content: getResponse(content) }]);
      setTyping(false);
    }, 1100);
  }

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-indigo text-white">
          <Sparkles className="h-[1.05rem] w-[1.05rem]" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">{assistantName}</p>
          <p className="text-xs text-muted-foreground">{assistantDescription}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {m.role === 'assistant' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-indigo">
                <Bot className="h-3.5 w-3.5" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-indigo to-cyan text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              {m.content}
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-indigo">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {messages.length < 3 && (
        <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-indigo/30 hover:text-indigo"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-3 border-t border-border p-4"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder={placeholder}
          className="max-h-32 min-h-10 flex-1 resize-none"
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-cyan text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
