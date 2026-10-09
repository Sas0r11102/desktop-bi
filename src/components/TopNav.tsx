import { BarChart3, Bell, Plus, Settings, Search } from "lucide-react";

interface TopNavProps {
  onSelectFolder: () => void;
  onRefresh: () => void;
}

export function TopNav({ onSelectFolder, onRefresh: _onRefresh }: TopNavProps) {
  return (
    <nav className="h-14 bg-surface-1 flex items-center px-6 gap-5 border-b border-hairline shadow-[0_1px_4px_rgba(15,23,42,0.04)]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BarChart3 className="w-7 h-7 text-accent-green" strokeWidth={2.5} />
        <span className="font-display text-[17px] font-extrabold text-ink-primary tracking-[-0.03em]">
          Desktop BI
        </span>
      </div>

      {/* Search */}
      <div className="flex-0 w-[280px] ml-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-9 bg-surface-3 border border-hairline rounded-sm pl-9 pr-3 text-[13px] text-ink-secondary placeholder:text-ink-faint outline-none focus:border-accent-green transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 ml-5">
        <a href="#" className="font-display text-[13px] font-bold text-ink-primary border-b-[2.5px] border-accent-green pb-4 tracking-[-0.01em]">
          Dashboard
        </a>
        <a href="#" className="font-display text-[13px] font-bold text-ink-tertiary border-b-[2.5px] border-transparent pb-4 hover:text-ink-secondary transition-colors">
          Transactions
        </a>
        <a href="#" className="font-display text-[13px] font-bold text-ink-tertiary border-b-[2.5px] border-transparent pb-4 hover:text-ink-secondary transition-colors">
          Analytics
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-5">
        <button className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-ink-tertiary rounded-sm cursor-pointer hover:bg-surface-3 hover:text-ink-secondary transition-colors">
          <Bell className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={onSelectFolder}
          className="inline-flex items-center gap-1.5 px-[18px] py-2 bg-accent-green text-white font-display text-[13px] font-bold rounded-pill border-none cursor-pointer shadow-[0_2px_8px_rgba(16,185,129,0.25)] hover:bg-[#059669] hover:shadow-[0_4px_12px_rgba(16,185,129,0.35)] transition-all active:scale-[0.97]"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Add Data
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-ink-tertiary rounded-sm cursor-pointer hover:bg-surface-3 hover:text-ink-secondary transition-colors">
          <Settings className="w-[18px] h-[18px]" />
        </button>
      </div>
    </nav>
  );
}
