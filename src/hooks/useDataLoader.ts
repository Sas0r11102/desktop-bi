import { useState, useEffect, useCallback, useRef } from "react";
import type { Dataset, FileEntry } from "../types";
import { mockData } from "../utils/mockData";
import {
  isTauri,
  selectFolder,
  scanFolder,
  loadData,
  getConfig,
  saveConfig,
  startFolderWatch,
  stopFolderWatch,
  onDataChanged,
} from "../ipc/commands";

interface DataLoaderState {
  data: Dataset;
  files: FileEntry[];
  currentFolder: string | null;
  currentFile: string | null;
  loading: boolean;
  error: string | null;
  autoRefresh: boolean;
}

export function useDataLoader() {
  const [state, setState] = useState<DataLoaderState>({
    data: mockData,
    files: [],
    currentFolder: null,
    currentFile: null,
    loading: false,
    error: null,
    autoRefresh: true,
  });

  const unlistenRef = useRef<(() => void) | null>(null);

  // Load saved config on mount
  useEffect(() => {
    (async () => {
      try {
        const config = await getConfig();
        if (config.lastFolder) {
          await doScanFolder(config.lastFolder);
        }
        if (config.lastFile) {
          await doLoadData(config.lastFile);
        }
      } catch {
        // Config load failed, use defaults
      }
    })();

    return () => {
      // Cleanup watcher on unmount
      unlistenRef.current?.();
      stopFolderWatch();
    };
  }, []);

  // Listen for file changes
  useEffect(() => {
    (async () => {
      unlistenRef.current = await onDataChanged(async (_event) => {
        // File changed in watched folder — reload current file
        if (state.currentFile) {
          await doLoadData(state.currentFile);
        }
        // Also rescan folder
        if (state.currentFolder) {
          await doScanFolder(state.currentFolder);
        }
      });
    })();

    return () => {
      unlistenRef.current?.();
    };
  }, [state.currentFile, state.currentFolder]);

  const doScanFolder = useCallback(async (path: string) => {
    try {
      const files = await scanFolder(path);
      setState(prev => ({ ...prev, files, currentFolder: path }));
    } catch (err) {
      setState(prev => ({ ...prev, error: `扫描失败: ${err}` }));
    }
  }, []);

  const doLoadData = useCallback(async (filePath: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await loadData(filePath);
      setState(prev => ({
        ...prev,
        data,
        currentFile: filePath,
        loading: false,
        error: null,
      }));
      // Save to config
      await saveConfig({
        lastFolder: state.currentFolder,
        lastFile: filePath,
        autoRefresh: state.autoRefresh,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: `加载失败: ${err}`,
      }));
    }
  }, [state.currentFolder, state.autoRefresh]);

  // Public API
  const handleSelectFolder = useCallback(async () => {
    const folder = await selectFolder();
    if (!folder) return;

    await doScanFolder(folder);

    // Start folder watcher
    if (state.autoRefresh) {
      await startFolderWatch(folder);
    }

    // Save config
    await saveConfig({
      lastFolder: folder,
      lastFile: null,
      autoRefresh: state.autoRefresh,
    });
  }, [doScanFolder, state.autoRefresh]);

  const handleSelectFile = useCallback(async (filePath: string) => {
    await doLoadData(filePath);
  }, [doLoadData]);

  const handleRefresh = useCallback(async () => {
    if (state.currentFile) {
      await doLoadData(state.currentFile);
    }
    if (state.currentFolder) {
      await doScanFolder(state.currentFolder);
    }
  }, [state.currentFile, state.currentFolder, doLoadData, doScanFolder]);

  const toggleAutoRefresh = useCallback(async () => {
    const newAuto = !state.autoRefresh;
    setState(prev => ({ ...prev, autoRefresh: newAuto }));

    if (newAuto && state.currentFolder) {
      await startFolderWatch(state.currentFolder);
    } else {
      await stopFolderWatch();
    }

    await saveConfig({
      lastFolder: state.currentFolder,
      lastFile: state.currentFile,
      autoRefresh: newAuto,
    });
  }, [state.autoRefresh, state.currentFolder, state.currentFile]);

  return {
    ...state,
    isTauri: isTauri(),
    selectFolder: handleSelectFolder,
    selectFile: handleSelectFile,
    refresh: handleRefresh,
    toggleAutoRefresh,
  };
}
