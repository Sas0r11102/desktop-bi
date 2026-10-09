import type { Dataset } from "../types";

interface TransactionListProps {
  data: Dataset;
}

export function TransactionList({ data }: TransactionListProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] flex-1 hover:-translate-y-px transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">Recent Activity</span>
        <button className="bg-transparent text-ink-secondary border-[1.5px] border-hairline rounded-pill font-display text-[11px] font-bold px-3 py-[5px] cursor-pointer hover:bg-surface-2 hover:border-hairline-strong transition-all">
          View All
        </button>
      </div>
      <div className="flex flex-col gap-0.5">
        {data.transactions.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-2 py-3 rounded-sm cursor-pointer hover:bg-surface-2 transition-colors"
          >
            <div className="w-9 h-9 rounded-sm bg-surface-3 flex items-center justify-center text-base flex-shrink-0">
              {t.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-[13px] font-bold text-ink-primary truncate tracking-[-0.01em]">
                {t.name}
              </div>
              <div className="text-[11px] text-ink-tertiary mt-0.5">{t.date}</div>
            </div>
            <div className={`font-mono text-[13px] font-semibold tabular-nums text-right flex-shrink-0 ${
              t.type === "positive" ? "text-accent-green" : "text-ink-primary"
            }`}>
              {t.type === "positive" ? "+" : ""}${Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
