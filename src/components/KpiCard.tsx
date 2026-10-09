import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, DollarSign, ShoppingBag } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: number;
  delta: number;
  icon: string;
  variant: "positive" | "negative" | "neutral";
}

const iconMap: Record<string, React.ElementType> = {
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  "dollar-sign": DollarSign,
  "shopping-bag": ShoppingBag,
};

export function KpiCard({ label, value, delta, icon, variant }: KpiCardProps) {
  const Icon = iconMap[icon] || ArrowUp;
  const isPositive = delta > 0;
  const DeltaIcon = isPositive ? TrendingUp : TrendingDown;
  const deltaClass = isPositive
    ? "bg-[rgba(16,185,129,0.1)] text-accent-green"
    : "bg-[rgba(239,68,68,0.1)] text-accent-red";

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-px transition-all cursor-pointer">
      <div className="flex items-center gap-1.5 font-display text-xs font-bold text-ink-tertiary uppercase tracking-[0.03em]">
        <span className="w-8 h-8 rounded-sm bg-surface-3 flex items-center justify-center">
          <Icon className="w-4 h-4 text-ink-tertiary" />
        </span>
        {label}
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <span className="font-display text-[30px] font-extrabold text-ink-primary tabular-nums tracking-[-0.03em]">
          {isPositive && variant === "positive" ? "+" : ""}
          {variant === "negative" ? "-" : ""}
          {Math.abs(value).toLocaleString()}
        </span>
        <span className={`inline-flex items-center gap-0.5 px-3 py-1 rounded-pill font-display text-[11px] font-bold ${deltaClass}`}>
          <DeltaIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
          {isPositive ? "+" : ""}{delta}%
        </span>
      </div>
    </div>
  );
}
