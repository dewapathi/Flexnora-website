'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Send, User } from 'lucide-react';
import { doctor, patients } from '@/lib/demo/healthcare-data';

const patient = patients[1];

export default function ConsultationPage() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState([
    { from: 'patient', text: 'Hi doctor, can you see me okay?' },
    { from: 'doctor', text: 'Yes, coming through clearly. How have you been feeling this week?' },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="flex h-[calc(100vh-9rem)] gap-4">
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-neutral-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-950 to-neutral-950"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-3xl font-bold text-emerald-300">
              {patient.initials}
            </div>
            <p className="font-semibold text-white">{patient.name}</p>
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-emerald-300">Connected · 04:12</span>
          </div>
        </div>

        <motion.div
          drag
          dragConstraints={{ left: 0, right: 400, top: 0, bottom: 300 }}
          className="absolute bottom-6 right-6 flex h-32 w-44 cursor-grab items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-indigo-950 to-neutral-950 shadow-2xl active:cursor-grabbing"
        >
          {camOn ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/30 font-bold text-indigo-200">
              {doctor.initials}
            </div>
          ) : (
            <VideoOff className="h-6 w-6 text-white/40" />
          )}
          <span className="absolute bottom-2 left-2 text-[0.65rem] font-medium text-white/70">You</span>
        </motion.div>

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            Video Consultation — {patient.condition}
          </span>
          <button
            onClick={() => setChatOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3">
          <button
            onClick={() => setMicOn((v) => !v)}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              micOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'
            }`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setCamOn((v) => !v)}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              camOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'
            }`}
          >
            {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>
      </div>

      {chatOpen && (
        <div className="hidden w-80 flex-col rounded-2xl border border-border bg-card shadow-sm md:flex">
          <div className="border-b border-border px-4 py-3.5">
            <p className="text-sm font-bold text-foreground">In-call chat</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === 'doctor' ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-3 w-3" />
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                    m.from === 'doctor' ? 'bg-indigo text-white' : 'bg-muted text-foreground'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              setMessages((m) => [...m, { from: 'doctor', text: input }]);
              setInput('');
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-indigo"
            />
            <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo text-white">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
