import type { Dataset } from "../types";

interface SubscriptionListProps {
  data: Dataset;
}

export function SubscriptionList({ data }: SubscriptionListProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] flex-1 hover:-translate-y-px transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">Subscriptions</span>
      </div>
      <div className="flex flex-col gap-0.5">
        {data.subscriptions.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-1 py-2 rounded-sm cursor-pointer hover:bg-surface-2 transition-colors"
          >
            <div className="w-8 h-8 rounded-sm bg-surface-3 flex items-center justify-center text-sm flex-shrink-0">
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-[12px] font-bold text-ink-primary tracking-[-0.01em]">{s.name}</div>
              <div className="text-[10px] text-ink-tertiary">{s.period}</div>
            </div>
            <div className="font-mono text-[12px] font-medium text-ink-secondary tabular-nums">{s.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
