// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    use tauri::Manager;
    use tauri_plugin_sql::{Migration, MigrationKind};

    let migration_1 = Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE customers (
                      id INTEGER PRIMARY KEY,
                      first_name TEXT NOT NULL,
                      last_name TEXT NOT NULL,
                      email TEXT,
                      phone TEXT,
                      mobile_phone TEXT
                  );",
            kind: MigrationKind::Up,
        };

    let migration_2 = Migration {
        version: 2,
        description: "create_initial_tables",
        sql: "CREATE TABLE quotations (
                  id INTEGER PRIMARY KEY,
                  customer_id INTEGER,
                  reference TEXT NOT NULL,
                  type TEXT NOT NULL,
                  total INTEGER NOT NULL,
                  created_at TEXT NOT NULL,
                  send_at TEXT,
                  FOREIGN KEY (customer_id) REFERENCES customers(id)
              );",
        kind: MigrationKind::Up,
    };

    let migration_3 = Migration {
            version: 3,
            description: "create_initial_tables",
            sql: "CREATE TABLE quotation_correction_requests (
                      quotation_id INTEGER,
                      comment TEXT NOT NULL,
                      is_closed INTEGER NOT NULL,
                      closed_at DATETIME,
                      received_at DATETIME,
                      FOREIGN KEY (quotation_id) REFERENCES quotations(id)
                  );",
            kind: MigrationKind::Up,
        };

    let migrations = vec![
            // Define your migrations here
            migration_1,
            migration_2,
            migration_3
        ];


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
        .plugin(tauri_plugin_sql::Builder::default()
                                .add_migrations("sqlite:database.db", migrations)
                                .build(),)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
