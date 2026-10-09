import type { FileEntry } from "../types";
import { FileSpreadsheet, FileText } from "lucide-react";

interface FileSelectorProps {
  files: FileEntry[];
  onSelect: (path: string) => void;
}

export function FileSelector({ files, onSelect }: FileSelectorProps) {
  return (
    <div className="bg-surface-1 rounded-lg p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-bold text-ink-primary tracking-[-0.01em]">
          Select a Data File
        </span>
        <span className="text-[11px] font-display font-semibold text-ink-tertiary">
          {files.length} file{files.length !== 1 ? "s" : ""} found
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {files.map(file => (
          <button
            key={file.path}
            onClick={() => onSelect(file.path)}
            className="flex flex-col items-center gap-2 p-4 bg-surface-2 rounded-md border border-hairline cursor-pointer hover:bg-surface-3 hover:border-accent-green transition-all group"
          >
            {file.type === "csv"
              ? <FileText className="w-8 h-8 text-ink-tertiary group-hover:text-accent-green transition-colors" />
              : <FileSpreadsheet className="w-8 h-8 text-ink-tertiary group-hover:text-accent-green transition-colors" />
            }
            <span className="font-display text-[12px] font-bold text-ink-primary truncate w-full text-center">
              {file.name}
            </span>
            <span className="font-mono text-[10px] text-ink-faint tabular-nums">
              {formatSize(file.size)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
