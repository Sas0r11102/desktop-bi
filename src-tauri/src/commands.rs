use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::fs;
use std::io::BufReader;
use std::fs::File;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ColumnMeta {
    pub name: String,
    pub col_type: String,
    pub distinct: Option<usize>,
    pub min: Option<f64>,
    pub max: Option<f64>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileEntry {
    pub name: String,
    pub path: String,
    pub size: u64,
    pub modified: u64,
    pub file_type: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Dataset {
    pub columns: Vec<ColumnMeta>,
    pub rows: Vec<serde_json::Value>,
    pub row_count: usize,
    pub source_file: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub struct AppConfig {
    pub last_folder: Option<String>,
    pub last_file: Option<String>,
    pub auto_refresh: bool,
}

/// Scan a folder for CSV and Excel files
#[tauri::command]
pub fn scan_folder(path: String) -> Result<Vec<FileEntry>, String> {
    let dir = PathBuf::from(&path);
    if !dir.exists() || !dir.is_dir() {
        return Err(format!("Invalid directory: {}", path));
    }

    let mut entries = Vec::new();

    for entry in fs::read_dir(&dir).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let file_path = entry.path();

        if !file_path.is_file() {
            continue;
        }

        let ext = file_path
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("")
            .to_lowercase();

        let file_type = match ext.as_str() {
            "csv" => "csv",
            "xlsx" | "xls" => "excel",
            _ => continue,
        };

        let metadata = fs::metadata(&file_path).map_err(|e| e.to_string())?;
        let modified = metadata
            .modified()
            .map(|t| {
                t.duration_since(std::time::UNIX_EPOCH)
                    .unwrap_or_default()
                    .as_secs()
            })
            .unwrap_or(0);

        entries.push(FileEntry {
            name: file_path
                .file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string(),
            path: file_path.to_string_lossy().to_string(),
            size: metadata.len(),
            modified,
            file_type: file_type.to_string(),
        });
    }

    entries.sort_by(|a, b| b.modified.cmp(&a.modified));
    Ok(entries)
}

/// Load data from a CSV or Excel file
#[tauri::command]
pub fn load_data(path: String) -> Result<Dataset, String> {
    let file_path = PathBuf::from(&path);
    let ext = file_path
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("")
        .to_lowercase();

    match ext.as_str() {
        "csv" => load_csv(&file_path),
        "xlsx" | "xls" => load_excel(&file_path),
        _ => Err(format!("Unsupported file type: {}", ext)),
    }
}

fn load_csv(path: &PathBuf) -> Result<Dataset, String> {
    let mut rdr = csv::Reader::from_path(path).map_err(|e| e.to_string())?;

    let headers: Vec<String> = rdr
        .headers()
        .map_err(|e| e.to_string())?
        .iter()
        .map(|h| h.to_string())
        .collect();

    let mut rows: Vec<serde_json::Value> = Vec::new();
    let mut columns: Vec<ColumnMeta> = headers
        .iter()
        .map(|h| ColumnMeta {
            name: h.clone(),
            col_type: "string".to_string(),
            distinct: None,
            min: None,
            max: None,
        })
        .collect();

    for result in rdr.records() {
        let record = result.map_err(|e| e.to_string())?;
        let mut row = serde_json::Map::new();

        for (i, field) in record.iter().enumerate() {
            if i >= headers.len() {
                continue;
            }

            let value = if let Ok(n) = field.parse::<f64>() {
                serde_json::Value::Number(
                    serde_json::Number::from_f64(n).unwrap_or(serde_json::Number::from(0)),
                )
            } else if field.is_empty() {
                serde_json::Value::Null
            } else {
                serde_json::Value::String(field.to_string())
            };

            row.insert(headers[i].clone(), value);
        }

        rows.push(serde_json::Value::Object(row));
    }

    infer_column_types(&mut columns, &rows);

    let source_file = path
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();

    Ok(Dataset {
        columns,
        row_count: rows.len(),
        rows,
        source_file,
    })
}

fn load_excel(path: &PathBuf) -> Result<Dataset, String> {
    use calamine::{open_workbook, Reader, Xlsx};

    let mut workbook = open_workbook::<Xlsx<BufReader<File>>, _>(path).map_err(|e| e.to_string())?;

    let sheets = workbook.sheet_names().to_vec();
    if sheets.is_empty() {
        return Err("No sheets found in Excel file".to_string());
    }

    let range = workbook
        .worksheet_range(&sheets[0])
        .map_err(|e| e.to_string())?;

    let mut rows_iter = range.rows();
    let header_row = rows_iter.next().ok_or("Empty Excel file")?;

    let headers: Vec<String> = header_row
        .iter()
        .map(|cell| cell.to_string())
        .collect();

    let mut columns: Vec<ColumnMeta> = headers
        .iter()
        .map(|h| ColumnMeta {
            name: h.clone(),
            col_type: "string".to_string(),
            distinct: None,
            min: None,
            max: None,
        })
        .collect();

    let mut rows: Vec<serde_json::Value> = Vec::new();

    for row in rows_iter {
        let mut row_map = serde_json::Map::new();

        for (i, cell) in row.iter().enumerate() {
            if i >= headers.len() {
                break;
            }

            let value = match cell {
                calamine::Data::Empty => serde_json::Value::Null,
                calamine::Data::String(s) => serde_json::Value::String(s.clone()),
                calamine::Data::Float(f) => serde_json::Value::Number(
                    serde_json::Number::from_f64(*f).unwrap_or(serde_json::Number::from(0)),
                ),
                calamine::Data::Int(i) => serde_json::Value::Number((*i).into()),
                calamine::Data::Bool(b) => serde_json::Value::Bool(*b),
                calamine::Data::DateTime(dt) => {
                    serde_json::Value::String(dt.to_string())
                }
                _ => serde_json::Value::String(cell.to_string()),
            };

            row_map.insert(headers[i].clone(), value);
        }

        rows.push(serde_json::Value::Object(row_map));
    }

    infer_column_types(&mut columns, &rows);

    let source_file = path
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();

    Ok(Dataset {
        columns,
        row_count: rows.len(),
        rows,
        source_file,
    })
}

fn infer_column_types(columns: &mut Vec<ColumnMeta>, rows: &[serde_json::Value]) {
    for col in columns.iter_mut() {
        let mut is_number = true;
        let mut is_boolean = true;
        let mut nums: Vec<f64> = Vec::new();
        let mut distinct_values = std::collections::HashSet::new();

        for row in rows.iter().take(100) {
            if let Some(obj) = row.as_object() {
                if let Some(val) = obj.get(&col.name) {
                    match val {
                        serde_json::Value::Number(n) => {
                            if let Some(f) = n.as_f64() {
                                nums.push(f);
                            }
                            is_boolean = false;
                        }
                        serde_json::Value::Bool(_) => {
                            is_number = false;
                        }
                        serde_json::Value::String(s) => {
                            is_number = false;
                            is_boolean = false;
                            distinct_values.insert(s.clone());
                        }
                        serde_json::Value::Null => {}
                        _ => {
                            is_number = false;
                            is_boolean = false;
                        }
                    }
                }
            }
        }

        if is_number && !nums.is_empty() {
            col.col_type = "number".to_string();
            col.min = nums.iter().cloned().fold(f64::INFINITY, f64::min).into();
            col.max = nums.iter().cloned().fold(f64::NEG_INFINITY, f64::max).into();
        } else if is_boolean {
            col.col_type = "boolean".to_string();
        } else {
            col.col_type = "string".to_string();
            col.distinct = distinct_values.len().into();
        }
    }
}

/// Get saved config
#[tauri::command]
pub fn get_config() -> Result<AppConfig, String> {
    let config_path = get_config_path()?;
    if config_path.exists() {
        let content = fs::read_to_string(&config_path).map_err(|e| e.to_string())?;
        serde_json::from_str(&content).map_err(|e| e.to_string())
    } else {
        Ok(AppConfig::default())
    }
}

/// Save config
#[tauri::command]
pub fn save_config(config: AppConfig) -> Result<(), String> {
    let config_path = get_config_path()?;
    if let Some(parent) = config_path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let content = serde_json::to_string_pretty(&config).map_err(|e| e.to_string())?;
    fs::write(&config_path, content).map_err(|e| e.to_string())
}

fn get_config_path() -> Result<PathBuf, String> {
    let home = std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .map_err(|_| "Cannot find home directory".to_string())?;
    Ok(PathBuf::from(home).join(".desktop-bi").join("config.json"))
}
