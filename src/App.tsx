import { useState, useCallback } from "react";
import { TopNav } from "./components/TopNav";
import { FilterBar } from "./components/FilterBar";
import { HeroKpi } from "./components/HeroKpi";
import { KpiCard } from "./components/KpiCard";
import { RevenueChart } from "./components/RevenueChart";
import { ExpenseDonut } from "./components/ExpenseDonut";
import { TransactionList } from "./components/TransactionList";
import { SubscriptionList } from "./components/SubscriptionList";
import { CardStack } from "./components/CardStack";
import { DataTable } from "./components/DataTable";
import { ScatterChart } from "./components/ScatterChart";
import { FileSelector } from "./components/FileSelector";
import { useDataLoader } from "./hooks/useDataLoader";
import type { Dataset } from "./types";

function App() {
  const {
    data,
    files,
    currentFolder,
    currentFile,
    loading,
    error,
    autoRefresh,
    isTauri,
    selectFolder,
    selectFile,
    refresh,
    toggleAutoRefresh,
  } = useDataLoader();

  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [linkedFilter, setLinkedFilter] = useState<Record<string, unknown> | null>(null);

  const handleFilterChange = useCallback((key: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [key]: values }));
  }, []);

  // Cross-chart linkage: when a chart element is clicked, set a linked filter
  const handleChartLink = useCallback((filter: Record<string, unknown> | null) => {
    setLinkedFilter(filter);
  }, []);

  // Apply filters to data
  const filteredData: Dataset = (() => {
    if (!linkedFilter && Object.values(filters).every(v => v.length === 0)) {
      return data;
    }

    let filteredRows = [...data.rows];

    // Apply global filters
    for (const [key, values] of Object.entries(filters)) {
      if (values.length > 0) {
        filteredRows = filteredRows.filter(row =>
          values.includes(String(row[key] ?? ""))
        );
      }
    }

    // Apply linked filter (from chart click)
    if (linkedFilter) {
      filteredRows = filteredRows.filter(row => {
        for (const [key, val] of Object.entries(linkedFilter)) {
          if (String(row[key]) !== String(val)) return false;
        }
        return true;
      });
    }

    return {
      ...data,
      rows: filteredRows,
      rowCount: filteredRows.length,
    };
  })();

  return (
    <div className="min-h-screen bg-canvas">
      <TopNav
        onSelectFolder={selectFolder}
        onRefresh={refresh}
      />

      <div className="px-6 pt-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink-primary tracking-tight">
          My Dashboard
        </h1>
        <div className="flex items-center gap-3">
          {currentFile && (
            <span className="font-mono text-[11px] text-ink-tertiary tabular-nums">
              {currentFile.split("/").pop() || currentFile}
            </span>
          )}
          {loading && (
            <span className="text-[11px] text-accent-green font-semibold animate-pulse">Loading...</span>
          )}
          {error && (
            <span className="text-[11px] text-accent-red font-semibold">{error}</span>
          )}
          {!isTauri && (
            <span className="text-[10px] bg-surface-3 text-ink-tertiary px-2 py-0.5 rounded-pill font-display font-bold">
              DEV MODE
            </span>
          )}
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={() => { setFilters({}); setLinkedFilter(null); }}
        linkedFilter={linkedFilter}
      />

      {/* File selector (when folder is selected but no file loaded) */}
      {currentFolder && files.length > 0 && !currentFile && (
        <div className="px-6 pb-4">
          <FileSelector files={files} onSelect={selectFile} />
        </div>
      )}

      {/* Auto-refresh toggle */}
      {currentFolder && (
        <div className="px-6 pb-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={toggleAutoRefresh}
              className="w-4 h-4 rounded accent-green-500"
            />
            <span className="text-[11px] font-display font-semibold text-ink-tertiary uppercase tracking-wider">
              Auto Refresh
            </span>
          </label>
        </div>
      )}

      {/* Three-column asymmetric grid */}
      <main className="grid grid-cols-[1fr_340px_280px] gap-4 px-6 pb-6">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <HeroKpi data={filteredData} />
          <RevenueChart data={filteredData} onLink={handleChartLink} />
          <TransactionList data={filteredData} />
        </div>

        {/* Middle column */}
        <div className="flex flex-col gap-4">
          <KpiCard
            label="Income"
            value={filteredData.income}
            delta={8.5}
            icon="arrow-up"
            variant="positive"
          />
          <KpiCard
            label="Expense"
            value={filteredData.expense}
            delta={-2.4}
            icon="arrow-down"
            variant="negative"
          />
          <KpiCard
            label="Net Profit"
            value={filteredData.netProfit}
            delta={12.1}
            icon="dollar-sign"
            variant="neutral"
          />
          <ExpenseDonut data={filteredData} onLink={handleChartLink} />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <CardStack />
          <KpiCard
            label="Orders"
            value={filteredData.orders}
            delta={5.2}
            icon="shopping-bag"
            variant="neutral"
          />
          <ScatterChart data={filteredData} />
          <SubscriptionList data={filteredData} />
        </div>
      </main>

      {/* Bottom: Data table */}
      <div className="px-6 pb-6">
        <DataTable data={filteredData} />
      </div>
    </div>
  );
}

export default App;
