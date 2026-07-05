'use client';
import { AIChatWindow } from '@/components/demo/AIChatWindow';
import { conciergeSuggestedPrompts, getConciergeResponse } from '@/lib/demo/hotel-data';

export default function ConciergePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">AI Concierge</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ask about arrivals, availability, or revenue — get an instant answer.</p>
      </div>
      <AIChatWindow
        assistantName="AI Concierge"
        assistantDescription="Trained on live reservations, room, and guest data"
        seedMessage="Good morning — I'm your AI concierge. Ask me about VIP arrivals, room availability, revenue, or ask me to generate an occupancy report."
        suggestedPrompts={conciergeSuggestedPrompts}
        getResponse={getConciergeResponse}
        placeholder="Ask about arrivals, rooms, or revenue..."
      />
    </div>
  );
}
