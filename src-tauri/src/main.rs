// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    use tauri::Manager;
    tauri::Builder::default()
        .setup(|app| {
                {
                  let window = app.get_window("main").unwrap();
                  window.open_devtools();
                  window.close_devtools();
                }
                Ok(())
              })
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
