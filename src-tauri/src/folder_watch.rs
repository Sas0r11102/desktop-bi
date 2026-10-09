use notify::{Config, RecommendedWatcher, RecursiveMode, Watcher};
use serde::Serialize;
use std::path::PathBuf;
use std::sync::mpsc;
use std::time::Duration;
use tauri::{Emitter, Manager};

#[derive(Debug, Clone, Serialize)]
pub struct DataChangedEvent {
    pub path: String,
    pub change_type: String,
}

/// Start watching a folder for file changes
pub fn start_watcher(app: tauri::AppHandle, path: String) -> Result<(), String> {
    let watch_path = PathBuf::from(&path);
    if !watch_path.exists() || !watch_path.is_dir() {
        return Err(format!("Invalid directory: {}", path));
    }

    // Stop existing watcher if any
    if let Some(window) = app.get_webview_window("main") {
        let state = app.state::<super::AppState>();
        let mut watcher_guard = state.watcher.lock().map_err(|e| e.to_string())?;
        *watcher_guard = None; // Drop old watcher
    }

    let (tx, rx) = mpsc::channel();
    let app_clone = app.clone();

    // Spawn watcher thread
    std::thread::spawn(move || {
        let mut watcher = RecommendedWatcher::new(
            move |res: Result<notify::Event, notify::Error>| {
                if let Ok(event) = res {
                    for p in &event.paths {
                        let ext = p
                            .extension()
                            .and_then(|e| e.to_str())
                            .unwrap_or("")
                            .to_lowercase();

                        if matches!(ext.as_str(), "csv" | "xlsx" | "xls") {
                            let change_type = match event.kind {
                                notify::EventKind::Create(_) => "created",
                                notify::EventKind::Modify(_) => "modified",
                                notify::EventKind::Remove(_) => "removed",
                                _ => "unknown",
                            };

                            let _ = tx.send(DataChangedEvent {
                                path: p.to_string_lossy().to_string(),
                                change_type: change_type.to_string(),
                            });
                        }
                    }
                }
            },
            Config::default(),
        );

        if let Ok(mut w) = watcher {
            if w.watch(&watch_path, RecursiveMode::NonRecursive).is_ok() {
                // Keep watcher alive
                loop {
                    std::thread::sleep(Duration::from_secs(1));
                }
            }
        }
    });

    // Spawn event relay thread
    let app_clone2 = app.clone();
    std::thread::spawn(move || {
        loop {
            match rx.recv() {
                Ok(event) => {
                    // Debounce: wait 500ms to batch rapid changes
                    std::thread::sleep(Duration::from_millis(500));
                    // Drain any queued events
                    while rx.try_recv().is_ok() {}

                    let _ = app_clone2.emit("data-changed", &event);
                }
                Err(_) => break,
            }
        }
    });

    Ok(())
}
