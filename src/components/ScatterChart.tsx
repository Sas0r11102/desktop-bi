import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { Dataset } from "../types";

interface ScatterChartProps {
  data: Dataset;
}

const INK = { primary: "#0F172A", secondary: "#475569", tertiary: "#94A3B8" };

export function ScatterChart({ data }: ScatterChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Generate scatter data from revenue flow
    const scatterData = data.revenueFlow.map((d) => [
      d.revenue,
      d.expense,
      d.month,
    ]);

    chart.setOption({
      tooltip: {
        trigger: "item",
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        textStyle: { color: INK.primary, fontSize: 12, fontFamily: "Plus Jakarta Sans", fontWeight: 600 },
        extraCssText: "border-radius:10px; box-shadow: 0 6px 24px rgba(15,23,42,0.08);",
        formatter: (p: any) => {
          const d = p.data;
          return `<b>${d[2]}</b><br/>Revenue: $${d[0].toLocaleString()}<br/>Expense: $${d[1].toLocaleString()}`;
        },
      },
      grid: { top: 12, right: 12, bottom: 28, left: 40 },
      xAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: INK.tertiary,
          fontSize: 10,
          fontFamily: "JetBrains Mono",
          formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`,
        },
        splitLine: { lineStyle: { color: "#E2E8F0", width: 1 } },
        name: "Revenue",
        nameTextStyle: { color: INK.tertiary, fontSize: 10, fontFamily: "Plus Jakarta Sans" },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: INK.tertiary,
          fontSize: 10,
          fontFamily: "JetBrains Mono",
          formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`,
        },
        splitLine: { lineStyle: { color: "#E2E8F0", width: 1 } },
        name: "Expense",
        nameTextStyle: { color: INK.tertiary, fontSize: 10, fontFamily: "Plus Jakarta Sans" },
      },
      series: [{
        type: "scatter",
        data: scatterData,
        symbolSize: 12,
        itemStyle: {
          color: "#60A5FA",
          opacity: 0.7,
        },
        emphasis: {
          itemStyle: {
            color: "#2563EB",
            opacity: 1,
            borderColor: "#fff",
            borderWidth: 2,
          },
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
  }, [data]);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:-translate-y-px transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">Revenue vs Expense</span>
      </div>
      <div ref={chartRef} className="w-full h-[160px]" />
    </div>
  );
}
