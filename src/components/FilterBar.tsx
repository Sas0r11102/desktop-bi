import { Filter, Calendar, ChevronDown, X, Link2 } from "lucide-react";

interface FilterBarProps {
  filters: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  onClearAll: () => void;
  linkedFilter?: Record<string, unknown> | null;
}

export function FilterBar({ filters, onFilterChange: _onFilterChange, onClearAll, linkedFilter }: FilterBarProps) {
  const hasActive = Object.values(filters).some(v => v.length > 0) || !!linkedFilter;

  return (
    <div className="flex items-center gap-3 px-6 pb-4">
      <button className="flex items-center gap-1.5 px-4 py-[7px] bg-surface-1 border-[1.5px] border-accent-green rounded-sm font-display text-[12px] font-semibold text-accent-green cursor-pointer hover:border-hairline-strong hover:text-ink-primary hover:shadow-[0_2px_6px_rgba(15,23,42,0.04)] transition-all bg-[rgba(16,185,129,0.05)]">
        <Filter className="w-3 h-3" />
        All Categories
        <ChevronDown className="w-3 h-3" />
      </button>

      <button className="flex items-center gap-1.5 px-4 py-[7px] bg-surface-1 border-[1.5px] border-hairline rounded-sm font-display text-[12px] font-semibold text-ink-tertiary cursor-pointer hover:border-hairline-strong hover:text-ink-primary hover:shadow-[0_2px_6px_rgba(15,23,42,0.04)] transition-all">
        <Calendar className="w-3 h-3" />
        Last 30 Days
        <ChevronDown className="w-3 h-3" />
      </button>

      <button className="flex items-center gap-1.5 px-4 py-[7px] bg-surface-1 border-[1.5px] border-hairline rounded-sm font-display text-[12px] font-semibold text-ink-tertiary cursor-pointer hover:border-hairline-strong hover:text-ink-primary hover:shadow-[0_2px_6px_rgba(15,23,42,0.04)] transition-all">
        Region
        <ChevronDown className="w-3 h-3" />
      </button>

      {linkedFilter && (
        <span className="flex items-center gap-1 px-3 py-1 bg-accent-green/10 rounded-pill text-[11px] font-display font-bold text-accent-green">
          <Link2 className="w-3 h-3" />
          {Object.entries(linkedFilter).map(([k, v]) => `${k}: ${v}`).join(", ")}
        </span>
      )}

      {hasActive && (
        <button
          onClick={onClearAll}
          className="ml-auto text-[12px] font-medium text-ink-faint cursor-pointer hover:text-accent-red transition-colors bg-none border-none font-sans flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Clear All
        </button>
      )}
    </div>
  );
}
