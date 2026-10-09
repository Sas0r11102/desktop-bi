import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import type { Dataset } from "../types";

interface RevenueChartProps {
  data: Dataset;
  onLink?: (filter: Record<string, unknown> | null) => void;
}

const INK = { primary: "#0F172A", secondary: "#475569", tertiary: "#94A3B8" };

export function RevenueChart({ data, onLink }: RevenueChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [range, setRange] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const months = data.revenueFlow.map(d => d.month);
    const mult = range === "yearly" ? 3 : 1;
    const revenue = data.revenueFlow.map(d => d.revenue * mult + Math.round(Math.random() * 500));
    const expense = data.revenueFlow.map(d => d.expense * mult + Math.round(Math.random() * 300));

    chart.setOption({
      tooltip: {
        trigger: "axis",
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        textStyle: { color: INK.primary, fontSize: 12, fontFamily: "Plus Jakarta Sans", fontWeight: 600 },
        extraCssText: "border-radius:10px; box-shadow: 0 6px 24px rgba(15,23,42,0.08);",
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        textStyle: { color: INK.secondary, fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 600 },
        itemWidth: 8,
        itemHeight: 8,
        icon: "roundRect",
        itemGap: 16,
      },
      grid: { top: 36, right: 0, bottom: 24, left: 8 },
      xAxis: {
        type: "category",
        data: months,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: INK.tertiary, fontSize: 11, fontFamily: "Inter" },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: INK.tertiary,
          fontSize: 11,
          fontFamily: "Inter",
          formatter: (v: number) => v >= 1000 ? `${v / 1000}k` : `${v}`,
        },
        splitLine: { lineStyle: { color: "#E2E8F0", width: 1 } },
      },
      series: [
        {
          name: "Revenue",
          type: "bar",
          data: revenue,
          itemStyle: { color: "#B4A7D6", borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 28,
          barGap: "30%",
        },
        {
          name: "Expense",
          type: "bar",
          data: expense,
          itemStyle: { color: "#E2E8F0", borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 28,
        },
      ],
      animation: false,
    });

    // Click linkage: click a bar → emit month filter
    chart.on('click', (params: any) => {
      if (onLink && params.name) {
        onLink({ month: params.name });
      }
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, range]);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-px transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">Revenue Flow</span>
        <div className="flex gap-1.5">
          {(["monthly", "yearly"] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3.5 py-[5px] rounded-pill font-display text-[11px] font-bold tracking-[0.01em] border-none cursor-pointer transition-colors ${
                range === r
                  ? "bg-accent-green text-white"
                  : "bg-surface-3 text-ink-tertiary hover:bg-surface-2 hover:text-ink-secondary"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} className="w-full h-[260px]" />
    </div>
  );
}
