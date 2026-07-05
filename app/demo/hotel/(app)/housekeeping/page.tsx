'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Sparkles, ClipboardCheck, CheckCircle2, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { housekeepingTasks as initialTasks, type HousekeepingTask, type HousekeepingColumn } from '@/lib/demo/hotel-data';

const COLUMNS: { key: HousekeepingColumn; label: string; icon: typeof Trash2; accent: string }[] = [
  { key: 'Dirty', label: 'Dirty', icon: Trash2, accent: 'text-red-500' },
  { key: 'Cleaning', label: 'Cleaning', icon: Sparkles, accent: 'text-cyan' },
  { key: 'Inspection', label: 'Inspection', icon: ClipboardCheck, accent: 'text-amber' },
  { key: 'Ready', label: 'Ready', icon: CheckCircle2, accent: 'text-green' },
];

const PRIORITY_BADGE: Record<HousekeepingTask['priority'], string> = {
  High: 'bg-red-500/10 text-red-500',
  Medium: 'bg-amber/10 text-amber',
  Low: 'bg-muted text-muted-foreground',
};

export default function HousekeepingPage() {
  const [tasks, setTasks] = useState<HousekeepingTask[]>(initialTasks);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<HousekeepingColumn | null>(null);

  function handleDrop(column: HousekeepingColumn) {
    if (!draggingId) return;
    setTasks((prev) => prev.map((t) => (t.id === draggingId ? { ...t, column } : t)));
    const task = tasks.find((t) => t.id === draggingId);
    if (task && task.column !== column) {
      toast.success(`Room ${task.roomNumber} moved to ${column}`);
    }
    setDraggingId(null);
    setDragOverColumn(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Housekeeping</h2>
        <p className="mt-1 text-sm text-muted-foreground">Drag a card to update its status.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.key);
          return (
            <div
              key={col.key}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverColumn(col.key);
              }}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={() => handleDrop(col.key)}
              className={`flex flex-col gap-3 rounded-2xl border p-3 transition-colors ${
                dragOverColumn === col.key ? 'border-indigo/40 bg-indigo/5' : 'border-border bg-bg-1/40'
              }`}
            >
              <div className="flex items-center justify-between px-1.5 py-1">
                <span className={`flex items-center gap-1.5 text-sm font-bold ${col.accent}`}>
                  <col.icon className="h-4 w-4" /> {col.label}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">{colTasks.length}</span>
              </div>

              <div className="flex min-h-[120px] flex-col gap-2.5">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggingId(task.id)}
                    onDragEnd={() => setDraggingId(null)}
                    className={`cursor-grab select-none rounded-xl border border-border bg-card p-3.5 shadow-sm transition-opacity active:cursor-grabbing ${
                      draggingId === task.id ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground">Room {task.roomNumber}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase ${PRIORITY_BADGE[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-indigo/10 text-[0.6rem] font-bold text-indigo">{task.assigneeInitials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
