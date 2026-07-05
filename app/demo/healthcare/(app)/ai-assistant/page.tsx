'use client';
import { AIChatWindow } from '@/components/demo/AIChatWindow';
import { doctor, aiSuggestedPrompts, getAIResponse } from '@/lib/demo/healthcare-data';

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">AI Medical Assistant</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ask about patient history, medications, or draft clinical notes.</p>
      </div>
      <AIChatWindow
        assistantName="AI Medical Assistant"
        assistantDescription="Trained on de-identified clinical guidelines & patient records"
        seedMessage={`Hi ${doctor.name} — I'm your AI medical assistant. Ask me about a patient's history, medication interactions, or ask me to draft clinical notes.`}
        suggestedPrompts={aiSuggestedPrompts}
        getResponse={getAIResponse}
        placeholder="Ask about a patient, medication, or guideline..."
      />
    </div>
  );
}
