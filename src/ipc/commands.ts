import type { Dataset, FileEntry, AppConfig } from "../types";
import { mockData } from "../utils/mockData";

// Check if running inside Tauri
export function isTauri(): boolean {
  return !!(window as any).__TAURI_INTERNALS__;
}

// Invoke Tauri commands
async function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (!isTauri()) {
    throw new Error("Not running in Tauri environment");
  }
  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<T>(cmd, args);
}

// Open folder dialog
export async function selectFolder(): Promise<string | null> {
  if (!isTauri()) {
    // Dev fallback: return a mock path
    return "/home/user/data";
  }
  const { open } = await import("@tauri-apps/plugin-dialog");
  const selected = await open({
    directory: true,
    multiple: false,
    title: "选择数据文件夹",
  });
  return selected as string | null;
}

// Scan folder for data files
export async function scanFolder(path: string): Promise<FileEntry[]> {
  if (!isTauri()) {
    return mockFileEntries();
  }
  return invoke<FileEntry[]>("scan_folder", { path });
}

// Load data from file
export async function loadData(path: string): Promise<Dataset> {
  if (!isTauri()) {
    return mockLoadData(path);
  }
  return invoke<Dataset>("load_data", { path });
}

// Get saved config
export async function getConfig(): Promise<AppConfig> {
  if (!isTauri()) {
    return { lastFolder: null, lastFile: null, autoRefresh: true };
  }
  return invoke<AppConfig>("get_config");
}

// Save config
export async function saveConfig(config: AppConfig): Promise<void> {
  if (!isTauri()) return;
  return invoke<void>("save_config", { config });
}

// Start folder watcher
export async function startFolderWatch(path: string): Promise<void> {
  if (!isTauri()) return;
  return invoke<void>("start_folder_watch", { path });
}

// Stop folder watcher
export async function stopFolderWatch(): Promise<void> {
  if (!isTauri()) return;
  return invoke<void>("stop_folder_watch");
}

// Listen for data-changed events
export async function onDataChanged(
  callback: (event: { path: string; change_type: string }) => void
): Promise<() => void> {
  if (!isTauri()) {
    return () => {};
  }
  const { listen } = await import("@tauri-apps/api/event");
  const unlisten = await listen<{ path: string; change_type: string }>(
    "data-changed",
    (event) => {
      callback(event.payload);
    }
  );
  return unlisten;
}

// ═══════════════════════════════════════════
// Mock data for development without Tauri
// ═══════════════════════════════════════════

function mockFileEntries(): FileEntry[] {
  return [
    { name: "sales_2026.csv", path: "/mock/sales_2026.csv", size: 45230, modified: Date.now() / 1000, type: "csv" as const },
    { name: "inventory_q3.xlsx", path: "/mock/inventory_q3.xlsx", size: 128400, modified: (Date.now() / 1000) - 86400, type: "excel" as const },
    { name: "orders_sept.csv", path: "/mock/orders_sept.csv", size: 23100, modified: (Date.now() / 1000) - 172800, type: "csv" as const },
  ];
}

function mockLoadData(_path: string): Dataset {
  return mockData;
}
