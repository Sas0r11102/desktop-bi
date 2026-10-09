# Desktop BI

> 本地数据可视化分析工具 — Windows 桌面应用

## 功能特性

- **本地文件夹读取**：支持 CSV 和 Excel (.xlsx) 文件
- **自动刷新**：文件变化自动监听 + 手动刷新双通道
- **通用数据模型**：任意表头自动识别列类型（数值/文本/日期）
- **多种图表**：柱形图、折线图、饼图/环图、散点图、KPI 数值卡、明细数据表
- **筛选交互**：全局筛选器 + 图表点击跨图联动
- **本地优先**：数据全部在本地处理，零网络上传，零 CDN 依赖

## 安装

1. 从 [GitHub Releases](../../releases) 下载最新安装包 `Desktop-BI_x.x.x_x64-setup.exe`
2. 双击运行安装程序
3. 安装完成后，桌面会出现 **Desktop BI** 快捷方式

## 使用方法

### 加载数据

1. 启动 Desktop BI
2. 点击右上角 **"📁 选择文件夹"** 按钮
3. 选择包含 CSV 或 Excel 文件的文件夹
4. 点击任意数据文件加载

### 查看看板

- **Hero KPI**：顶部渐变卡片显示核心指标 + 趋势波形图
- **KPI 卡片**：Income / Expense / Net Profit / Orders
- **Revenue Flow**：柱状图（Monthly / Yearly 切换）
- **Expense Split**：环形图 + 图例
- **散点图**：Revenue vs Expense 相关性分析
- **Recent Activity**：交易列表
- **Transaction Details**：明细数据表（排序 + 搜索）

### 筛选与联动

- 点击柱状图的柱子 → 按月份筛选所有图表
- 点击环形图的扇区 → 按类别筛选所有图表
- 点击 **Clear All** 清除筛选

### 自动刷新

- 勾选 **Auto Refresh** 启用文件监听
- 修改/新增/删除文件夹内的 CSV/Excel 文件，看板自动更新

## 技术栈

| 层 | 技术 | 版本 |
|---|------|------|
| 框架 | Tauri | v2.x |
| 前端 | React + TypeScript | 18.x |
| 样式 | TailwindCSS | 3.x |
| 图表 | ECharts | 5.x |
| 字体 | Plus Jakarta Sans + Inter + JetBrains Mono + Noto Sans SC | @fontsource |
| 构建 | Vite | 6.x |
| Rust | csv + calamine + notify | latest |
| CI/CD | GitHub Actions (windows-latest) | - |

## 开发

### 环境要求

- Node.js ≥ 18
- pnpm ≥ 8
- Rust ≥ 1.70
- Windows 10/11（WebView2）

### 启动开发模式

```bash
pnpm install
pnpm tauri dev
```

### 构建安装包

```bash
pnpm build
pnpm tauri build
```

安装包输出：`src-tauri/target/release/bundle/nsis/`

## 项目结构

```
desktop-bi/
├── src/                          # 前端源码
│   ├── components/               # React 组件
│   │   ├── TopNav.tsx            # 顶栏
│   │   ├── FilterBar.tsx         # 筛选栏
│   │   ├── HeroKpi.tsx           # Hero KPI 渐变卡片
│   │   ├── KpiCard.tsx           # KPI 数值卡
│   │   ├── RevenueChart.tsx      # 柱状图
│   │   ├── ExpenseDonut.tsx      # 环形图
│   │   ├── ScatterChart.tsx      # 散点图
│   │   ├── TransactionList.tsx   # 交易列表
│   │   ├── SubscriptionList.tsx  # 订阅列表
│   │   ├── CardStack.tsx         # 磨砂玻璃卡片
│   │   ├── DataTable.tsx         # 明细数据表
│   │   └── FileSelector.tsx      # 文件选择器
│   ├── hooks/                    # React Hooks
│   │   └── useDataLoader.ts      # 数据加载 + 文件监听
│   ├── ipc/                      # IPC 封装
│   │   └── commands.ts           # Tauri 命令封装
│   ├── types/                    # TypeScript 类型
│   ├── utils/                    # 工具函数
│   ├── App.tsx                   # 主应用
│   └── main.tsx                  # 入口
├── src-tauri/                    # Rust 后端
│   ├── src/
│   │   ├── commands.rs           # IPC Commands
│   │   ├── folder_watch.rs       # 文件监听
│   │   ├── lib.rs                # Tauri 入口
│   │   └── main.rs               # Windows 入口
│   ├── Cargo.toml
│   └── tauri.conf.json
├── icons/                        # 应用图标
├── scripts/                      # 构建脚本
├── .github/workflows/build.yml   # CI/CD
├── PRD.md                        # 需求文档
├── CHARTER.md                    # 项目宪章
├── ARCHITECTURE.md               # 架构设计
├── DESIGN-SPEC.md                # 视觉规范
├── DECISIONS.md                  # 决策记录
├── TASKS.md                      # 任务清单
└── CHANGELOG.md                  # 变更日志
```

## License

MIT
