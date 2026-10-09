import { useState, useMemo } from "react";
import { Search, Download } from "lucide-react";
import type { Dataset } from "../types";

interface DataTableProps {
  data: Dataset;
}

type SortKey = string;
type SortDir = "asc" | "desc";

export function DataTable({ data }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("Date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let rows = [...data.rows];

    // Filter
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        Object.values(r).some(v =>
          String(v).toLowerCase().includes(q)
        )
      );
    }

    // Sort
    rows.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

    return rows;
  }, [data.rows, search, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">Transaction Details</span>
        <div className="flex gap-2 items-center">
          <div className="relative w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-tertiary" />
            <input
              type="text"
              placeholder="Filter table..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-8 bg-surface-3 border border-hairline rounded-sm pl-8 pr-3 text-[12px] text-ink-secondary placeholder:text-ink-faint outline-none focus:border-accent-green transition-colors"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 px-3 py-[5px] bg-transparent text-ink-secondary border-[1.5px] border-hairline rounded-pill font-display text-[11px] font-bold cursor-pointer hover:bg-surface-2 hover:border-hairline-strong transition-all">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[320px] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {data.columns.map(col => (
                <th
                  key={col.name}
                  onClick={() => handleSort(col.name)}
                  className={`bg-surface-2 px-4 py-3 font-display text-[11px] font-bold text-ink-tertiary text-left uppercase tracking-[0.06em] sticky top-0 cursor-pointer select-none whitespace-nowrap hover:text-ink-secondary transition-colors ${
                    sortKey === col.name ? "text-accent-green" : ""
                  }`}
                >
                  {col.name}
                  {sortKey === col.name && (
                    <span className="ml-1 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="hover:bg-surface-2 transition-colors">
                {data.columns.map(col => {
                  const val = row[col.name];
                  const isNum = typeof val === "number";
                  const isAmount = col.name === "Amount";
                  let cellColor = "text-ink-secondary";
                  if (isAmount && isNum) {
                    cellColor = (val as number) >= 0 ? "text-accent-green" : "text-ink-secondary";
                  }
                  if (col.name === "Description") {
                    cellColor = "text-ink-primary font-medium";
                  }
                  if (col.name === "Status") {
                    const statusColor = val === "Completed" ? "text-accent-green" : "text-accent-yellow";
                    return (
                      <td key={col.name} className="px-4 py-3 text-[12px] border-b border-hairline">
                        <span className={`${statusColor} text-[11px] font-medium`}>● {String(val)}</span>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={col.name}
                      className={`px-4 py-3 text-[12px] border-b border-hairline ${cellColor} ${
                        isNum ? "font-mono text-right tabular-nums" : ""
                      }`}
                    >
                      {isNum && isAmount
                        ? `${(val as number) >= 0 ? "+" : ""}$${Math.abs(val as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                        : String(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
