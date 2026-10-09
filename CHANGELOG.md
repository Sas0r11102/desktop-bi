# CHANGELOG.md — Desktop BI 变更日志

## [Unreleased]

### 2026-10-03 — Phase 2 全部完成

- T2.1 脚手架搭建 ✅ Tauri + Vite + React + TypeScript + TailwindCSS + ECharts
- T2.2-T2.4 Rust 后端 ✅ commands.rs（CSV/Excel 解析 + 文件扫描 + 列类型推断 + 配置持久化）
- T2.5 Rust 文件监听 ✅ folder_watch.rs（notify crate + 事件推送 + 500ms 防抖）
- T2.6 前端布局 ✅ 三列网格 + 浅色主题 + Plus Jakarta Sans 粗壮字体
- T2.7 IPC 封装层 ✅ ipc/commands.ts + hooks/useDataLoader.ts（Tauri 检测 + mock fallback）
- T2.8-T2.11 图表组件 ✅ HeroKpi, KpiCard, RevenueChart, ExpenseDonut
- T2.12 散点图 ✅ ScatterChart.tsx（Revenue vs Expense 相关性）
- T2.13 全局筛选 ✅ FilterBar.tsx + linkedFilter 联动显示
- T2.14 跨图联动 ✅ RevenueChart + ExpenseDonut click → onLink → 全局数据过滤
- T2.15 明细数据表 ✅ DataTable.tsx（排序/搜索/分页）
- T2.16 磨砂玻璃卡片 ✅ CardStack.tsx（3 张信用卡 Z 轴堆叠 + hover 扇形展开）
- T2.17 Hero KPI ✅ 酸性绿渐变 + ECharts 波形图
- T2.18 文件选择器 ✅ FileSelector.tsx（文件夹扫描后选文件加载）
- 组件总数：13 个 React 组件 + 1 Hook + IPC 封装层
- TypeScript 零错误，Vite build 成功
- Linux 沙箱 glib 版本不足，Rust 编译将在 GitHub Actions Windows 环境验证

### 2026-10-03 — 项目初始化

- 创建项目目录结构
- 输出 PRD.md（需求确认书）
- 输出 CHARTER.md（项目宪章）
- 输出 ARCHITECTURE.md（架构设计）
- 输出 TASKS.md（任务清单）
- 输出 DECISIONS.md（决策记录）
- 用户确认需求与技术栈（全按推荐）
- 技术栈锁定：Tauri v2 + ECharts + TailwindCSS + Vite
- 构建方式锁定：GitHub Actions windows-latest
