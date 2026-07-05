import { create } from 'zustand';
import { doctor } from './healthcare-data';

type AuthState = {
  isAuthenticated: boolean;
  user: typeof doctor;
  signIn: () => void;
  signOut: () => void;
};

export const useDemoAuth = create<AuthState>((set) => ({
  // Defaults to signed-in so a shared deep link to any dashboard page works
  // without a redirect gate — this is a showcase, not a real authenticated app.
  isAuthenticated: true,
  user: doctor,
  signIn: () => set({ isAuthenticated: true }),
  signOut: () => set({ isAuthenticated: false }),
}));

type UIState = {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
};

export const useDemoUI = create<UIState>((set) => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
}));

export type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string };

type AIChatState = {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
};

export const useAIChat = create<AIChatState>((set) => ({
  messages: [
    {
      id: 'seed-1',
      role: 'assistant',
      content: "Hi Dr. Wickramasinghe — I'm your AI medical assistant. Ask me about a patient's history, medication interactions, or ask me to draft clinical notes.",
    },
  ],
  isTyping: false,
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  setTyping: (typing) => set({ isTyping: typing }),
}));
