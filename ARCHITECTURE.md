# ARCHITECTURE.md — Desktop BI 架构设计

## 整体架构

```
┌─────────────────────────────────────────────────────┐
│                   Tauri 桌面窗口                      │
│  ┌───────────────────────────────────────────────┐  │
│  │         前端 (HTML + TypeScript)              │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │  │
│  │  │ KPI 卡 │ │ 折线图 │ │ 柱形图 │ │ 饼图   │ │  │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐            │  │
│  │  │ 散点图 │ │ 热力图 │ │ 明细表 │            │  │
│  │  └────────┘ └────────┘ └────────┘            │  │
│  │  ┌───────────────────────────────────────┐   │  │
│  │  │        全局筛选器栏 (FilterBar)        │   │  │
│  │  └───────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────┘  │
│                         ↑ invoke / event            │
│  ┌───────────────────────────────────────────────┐  │
│  │         Rust 后端 (Tauri Core)                │  │
│  │  ┌────────┐ ┌────────┐ ┌────────────────┐     │  │
│  │  │csv parse│ │xlsx parse│ │ folder watch  │     │  │
│  │  └────────┘ └────────┘ └────────────────┘     │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 项目目录结构

```
projects/desktop-bi/
├── PRD.md              # 需求确认书
├── CHARTER.md          # 项目宪章
├── ARCHITECTURE.md     # 架构设计（本文件）
├── TASKS.md            # 任务清单与状态
├── DECISIONS.md        # 决策记录
├── CHANGELOG.md        # 变更日志
├── package.json        # Node.js 依赖
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 构建配置
├── index.html          # 主页面
├── src/
│   ├── main.ts         # 前端入口
│   ├── dashboard/
│   │   ├── kpi-cards.ts    # KPI 卡片
│   │   ├── charts.ts       # 图表初始化与更新
│   │   ├── filter-bar.ts   # 筛选器
│   │   ├── data-table.ts   # 明细表
│   │   └── linkage.ts      # 跨图联动
│   ├── ipc/
│   │   ├── commands.ts     # Tauri invoke 封装
│   │   └── types.ts        # 数据类型定义
│   ├── assets/
│   │   └── logo.svg        # 图标源文件
│   └── styles/
│       └── main.css        # 自定义样式（Tailwind 补充）
├── src-tauri/
│   ├── Cargo.toml          # Rust 依赖
│   ├── tauri.conf.json     # Tauri 配置（窗口/图标/打包）
│   ├── icons/              # 多尺寸图标（ico/png）
│   └── src/
│       ├── main.rs         # Tauri 入口
│       ├── lib.rs          # 模块注册
│       ├── data_loader.rs  # CSV/Excel 解析
│       ├── folder_watch.rs # 文件监听
│       └── commands.rs     # IPC Commands
├── assets/
│   └── icon.svg            # 图标设计源文件
└── .github/
    └── workflows/
        └── build.yml       # GitHub Actions 构建
```

## 数据流

```
用户选文件夹 → Rust scan_folder → 文件列表
      ↓
用户选文件 → Rust load_data → 解析为统一 JSON → 前端
      ↓
文件夹变化 → Rust notify → event: data-changed → 前端自动重载
      ↓
前端筛选器变更 → 内存过滤 → 全部图表重绘
      ↓
图表点击 → 联动过滤 → 其他图表缩窄数据范围
```

## IPC 接口设计

### Commands（前端 → Rust）

| Command | 入参 | 返回 | 说明 |
|---------|------|------|------|
| `select_folder` | 无 | `string` | 弹出文件夹选择对话框，返回路径并持久化 |
| `scan_folder` | `path: string` | `FileEntry[]` | 扫描目录，返回 CSV/Excel 文件列表 |
| `load_data` | `path: string` | `Dataset` | 读取文件，解析为统一数据集 |
| `get_config` | 无 | `AppConfig` | 读取持久化配置（上次选择的文件夹） |

### Events（Rust → 前端）

| Event | Payload | 说明 |
|-------|---------|------|
| `data-changed` | `{ path: string, change_type: string }` | 监听文件变化时推送 |
| `scan-complete` | `{ file_count: number }` | 扫描完成通知 |

## 数据类型

```typescript
interface Dataset {
  columns: ColumnMeta[];
  rows: Row[];
  rowCount: number;
  sourceFile: string;
}

interface ColumnMeta {
  name: string;
  type: 'number' | 'string' | 'date' | 'boolean';
  distinct?: number;
  min?: number;
  max?: number;
}

type Row = Record<string, string | number | boolean | null>;

interface FileEntry {
  name: string;
  path: string;
  size: number;
  modified: number;
  type: 'csv' | 'excel';
}

interface AppConfig {
  lastFolder: string | null;
  lastFile: string | null;
  autoRefresh: boolean;
}
```

## 图表预设布局

```
┌────────────────────────────────────────────────────┐
│  [Logo] Desktop BI       [📁 选文件夹] [🔄 刷新]    │
├────────────────────────────────────────────────────┤
│  全局筛选器栏：[字段A ▼] [字段B ▼] [日期范围]       │
├──────┬──────┬──────┬──────┬──────┬──────┬─────────┤
│ KPI1 │ KPI2 │ KPI3 │ KPI4 │ KPI5 │ KPI6 │  ...    │
├──────┴──────┴──────┴──────┴──────┴──────┴─────────┤
│                                                    │
│   ┌──────────────┐    ┌──────────────┐             │
│   │  柱形/条形图  │    │   折线趋势图  │             │
│   │  (分类对比)   │    │  (时间序列)   │             │
│   └──────────────┘    └──────────────┘             │
│   ┌──────────────┐    ┌──────────────┐             │
│   │   饼图/环图   │    │   散点分布图  │             │
│   │   (占比构成)  │    │  (相关性)    │             │
│   └──────────────┘    └──────────────┘             │
│   ┌──────────────────────────────────┐             │
│   │        明细数据表 (排序/搜索)     │             │
│   └──────────────────────────────────┘             │
└────────────────────────────────────────────────────┘
```

- 三列网格，响应式（窗口 ≥ 1200px 三列，< 1200 两列）
- KPI 卡片顶部横排，自动计算数值列的 sum/avg/count
- 图表自动根据列类型匹配（数值列→柱/折线，分类列→饼，双数值→散点）

## 视觉规范（Tableau 暗色风格）

| 元素 | 规范 |
|------|------|
| 主背景 | `#1e1e1e`（深灰） |
| 卡片背景 | `#2d2d2d` |
| 文字主色 | `#f0f0f0` |
| 文字次色 | `#a0a0a0` |
| 强调色 | `#4e79a7`（Tableau 蓝） |
| 图表色板 | Tableau 10 标准色板 |
| 字体 | Inter（拉丁）+ Noto Sans SC（中文），自托管 woff2 |
| 圆角 | 4px（卡片），0px（图表内部） |
| 边框 | `#3d3d3d`，1px |

## 桌面图标

- 源文件 SVG，几何简约风格
- 深蓝底 + 青色/橙色柱状图图案
- 导出 32×32、128×128、256×256 PNG + .ico
- Tauri `tauri.conf.json` 中配置 `icons` 字段

## 端口分配

| 场景 | 端口 | 说明 |
|------|------|------|
| 开发模式 Vite dev server | 1420 | Vite 默认，Tauri 自动连接 |
| 生产环境 | 无 | Tauri 打包为独立 exe，无端口占用 |

## 打包与分发

```yaml
# GitHub Actions 工作流
- 触发：push tag v* 或手动 dispatch
- 环境：windows-latest
- 步骤：checkout → setup-node → setup-rust → pnpm install → tauri build
- 产物：NSIS 安装包（.exe）上传到 GitHub Release
```

## 安全考虑

- Tauri 默认沙盒：前端不能直接访问文件系统，必须通过 Commands
- 文件监听路径限制：只监听用户选择的文件夹，不越权
- 无网络权限：tauri.conf.json 中不配置网络权限
