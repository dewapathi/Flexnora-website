import { AIChatWindow } from '@/components/demo/AIChatWindow';

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">AI Medical Assistant</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ask about patient history, medications, or draft clinical notes.</p>
      </div>
      <AIChatWindow />
    </div>
  );
}
