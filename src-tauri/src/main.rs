// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};
use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main() {
    tauri::Builder::default()
        .plugin(Builder::default().build())
        .setup(|app| {
            let _window: Window = app.get_window("main").unwrap();
            // Prevent initial shaking
            _window.show().unwrap();
            Ok(())
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested {
                api,
                ..
            } => {
                #[cfg(target_os = "macos")]
                {
                    event.window().minimize().unwrap();
                }

                #[cfg(not(target_os = "macos"))]
                event.window().close().unwrap();

                api.prevent_close();
            }
            _ => {}
        })
        .plugin({
                    Builder::default()
                        .add_migrations(
                            "sqlite:WatchList.db",
                            vec![
                                Migration {
                                    version: 1,
                                    description: "create tables",
                                    sql: include_str!("../migrations/1.sql"),
                                    kind: MigrationKind::Up,
                                },
                                Migration {
                                    version: 2,
                                    description: "create tables",
                                    sql: include_str!("../migrations/2.sql"),
                                    kind: MigrationKind::Up,
                                }
                            ]
                        )
                        .build()})
                    .run(tauri::generate_context!())
                    .expect("error while running tauri application")
}