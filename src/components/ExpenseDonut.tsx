import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { Dataset } from "../types";

interface ExpenseDonutProps {
  data: Dataset;
  onLink?: (filter: Record<string, unknown> | null) => void;
}

const INK = { primary: "#0F172A" };

export function ExpenseDonut({ data, onLink }: ExpenseDonutProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const total = data.expenseSplit.reduce((s, d) => s + d.value, 0);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      tooltip: {
        trigger: "item",
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        textStyle: { color: INK.primary, fontSize: 12, fontFamily: "Plus Jakarta Sans", fontWeight: 600 },
        extraCssText: "border-radius:10px; box-shadow: 0 6px 24px rgba(15,23,42,0.08);",
        formatter: (p: any) => `<b>${p.name}</b><br/>$${p.value} (${p.percent}%)`,
      },
      series: [{
        type: "pie",
        radius: ["62%", "90%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: `$${total.toLocaleString()}`,
          fontSize: 24,
          fontWeight: 800,
          fontFamily: "Plus Jakarta Sans",
          color: INK.primary,
        },
        labelLine: { show: false },
        itemStyle: { borderColor: "#FFFFFF", borderWidth: 3 },
        data: data.expenseSplit.map(d => ({
          name: d.name,
          value: d.value,
          itemStyle: { color: d.color },
        })),
        emphasis: {
          scaleSize: 4,
          label: {
            show: true,
            position: "center",
            formatter: (p: any) => `$${p.value}`,
            fontSize: 24,
            fontWeight: 800,
            fontFamily: "Plus Jakarta Sans",
            color: INK.primary,
          },
        },
        animation: false,
      }],
    });

    // Click linkage: click a donut slice → emit category filter
    chart.on('click', (params: any) => {
      if (onLink && params.name) {
        onLink({ Category: params.name });
      }
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, total]);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] flex-1 hover:-translate-y-px transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">Expense Split</span>
      </div>
      <div ref={chartRef} className="w-full h-[180px]" />
      {/* Legend */}
      <div className="flex flex-col gap-1.5 mt-3">
        {data.expenseSplit.map(d => (
          <div key={d.name} className="flex items-center gap-2 font-display text-[11px] font-semibold text-ink-secondary cursor-pointer hover:text-ink-primary transition-colors">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span>{d.name}</span>
            <span className="ml-auto font-mono tabular-nums text-ink-tertiary">${d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
