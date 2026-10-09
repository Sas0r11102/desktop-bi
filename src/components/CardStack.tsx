import { MoreHorizontal } from "lucide-react";

export function CardStack() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-px transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">My Cards</span>
        <button className="w-7 h-7 flex items-center justify-center bg-transparent border-none text-ink-tertiary rounded-sm cursor-pointer hover:bg-surface-3 hover:text-ink-secondary transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="relative h-[210px] mb-2" style={{ perspective: "800px" }}>
        {/* Visa card - front */}
        <div
          className="absolute w-full h-[155px] rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 group"
          style={{
            background: "var(--gradient-visa)",
            zIndex: 3,
            top: 0,
            left: 0,
            transform: "rotate(-2deg)",
            boxShadow: "0 12px 32px rgba(67,56,202,0.3), 0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-[0.08em]">Balance</span>
            <span className="text-base font-bold text-white italic">VISA</span>
          </div>
          <div className="font-mono text-sm font-medium text-[rgba(255,255,255,0.85)] tracking-[0.12em] tabular-nums">
            4165 ···· ···· 6902
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] text-[rgba(255,255,255,0.6)]">HAOLIN LI</span>
            <span className="text-[11px] font-mono text-[rgba(255,255,255,0.6)]">09/28</span>
          </div>
        </div>

        {/* MC card - middle, frosted glass */}
        <div
          className="absolute rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(16px) saturate(1.8)",
            WebkitBackdropFilter: "blur(16px) saturate(1.8)",
            border: "1px solid rgba(255,255,255,0.6)",
            zIndex: 2,
            top: "22px",
            left: "14px",
            width: "calc(100% - 14px)",
            height: "155px",
            transform: "rotate(1deg)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-ink-secondary uppercase tracking-[0.08em]">Balance</span>
            <span className="text-base font-bold text-ink-secondary">MC</span>
          </div>
          <div className="font-mono text-sm font-medium text-ink-primary tracking-[0.12em] tabular-nums">
            5412 ···· ···· 3317
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] text-ink-secondary">HAOLIN LI</span>
            <span className="text-[11px] font-mono text-ink-secondary">03/27</span>
          </div>
        </div>

        {/* Amex card - back, frosted glass */}
        <div
          className="absolute rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(20px) saturate(1.5)",
            WebkitBackdropFilter: "blur(20px) saturate(1.5)",
            border: "1px solid rgba(255,255,255,0.4)",
            zIndex: 1,
            top: "44px",
            left: "28px",
            width: "calc(100% - 28px)",
            height: "155px",
            transform: "rotate(3deg)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-ink-tertiary uppercase tracking-[0.08em]">Balance</span>
            <span className="text-base font-extrabold text-ink-tertiary tracking-[0.05em]">AMEX</span>
          </div>
          <div className="font-mono text-sm font-medium text-ink-tertiary tracking-[0.12em] tabular-nums">
            3782 ···· ···· 0005
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] text-ink-tertiary">HAOLIN LI</span>
            <span className="text-[11px] font-mono text-ink-tertiary">12/29</span>
          </div>
        </div>
      </div>
    </div>
  );
}
