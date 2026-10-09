mod commands;
mod folder_watch;

use std::sync::Mutex;

pub struct AppState {
    pub watcher: Mutex<Option<()>>, // Placeholder; actual watcher handle managed in folder_watch
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(AppState {
            watcher: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![
            commands::scan_folder,
            commands::load_data,
            commands::get_config,
            commands::save_config,
            start_folder_watch,
            stop_folder_watch,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn start_folder_watch(app: tauri::AppHandle, path: String) -> Result<(), String> {
    folder_watch::start_watcher(app, path)
}

#[tauri::command]
fn stop_folder_watch(_app: tauri::AppHandle) -> Result<(), String> {
    // Watcher will be dropped when AppState is cleaned up
    Ok(())
}
