import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Wallet, TrendingUp } from "lucide-react";
import type { Dataset } from "../types";

interface HeroKpiProps {
  data: Dataset;
}

export function HeroKpi({ data }: HeroKpiProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const waveData = [30, 45, 35, 55, 48, 62, 55, 70, 65, 80, 72, 85, 78, 90, 85, 95, 88, 92, 98, 95];

    chart.setOption({
      grid: { top: 5, right: 0, bottom: 0, left: 0 },
      xAxis: { show: false, type: "category", data: waveData.map((_, i) => i) },
      yAxis: { show: false, type: "value" },
      series: [{
        type: "line",
        data: waveData,
        smooth: true,
        symbol: "none",
        lineStyle: { color: "rgba(255,255,255,0.95)", width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255,255,255,0.35)" },
            { offset: 1, color: "rgba(255,255,255,0.02)" },
          ]),
        },
        animation: false,
      }],
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl p-5 min-h-[200px]"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.75)] font-display text-xs font-bold uppercase tracking-[0.02em]">
        <Wallet className="w-4 h-4 opacity-80" />
        TOTAL BALANCE
      </div>

      <div className="font-display text-[40px] font-extrabold text-white mt-2 tabular-nums tracking-[-0.03em]">
        ${data.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-pill bg-[rgba(255,255,255,0.25)] font-display text-xs font-bold text-white">
          <TrendingUp className="w-3 h-3" />
          +8.5%
        </span>
        <span className="text-[11px] font-medium text-[rgba(255,255,255,0.55)] ml-1">
          vs last month
        </span>
      </div>

      {/* Wave chart at bottom */}
      <div ref={chartRef} className="absolute bottom-0 left-0 right-0 h-20" />
    </div>
  );
}
