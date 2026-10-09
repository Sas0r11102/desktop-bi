# DECISIONS.md — Desktop BI 决策记录

## D001 — 技术栈选型：Tauri v2

- **日期**：2026-10-03
- **背景**：桌面 BI 工具需要原生窗口 + 丰富图表交互
- **候选**：Tauri / Electron / Python+PyQt
- **决定**：Tauri v2（Rust + WebView2）
- **理由**：
  - 包体小（~10MB vs Electron 150MB+）
  - Win10/11 自带 WebView2，零额外依赖
  - 前端可用 Web 技术实现 Tableau 级视觉效果
  - Rust 后端性能优秀，数据解析快
- **状态**：✅ 已锁定（CHARTER.md 红线）

## D002 — 图表库选型：ECharts

- **日期**：2026-10-03
- **背景**：需要覆盖柱/折线/饼/散点/KPI/明细表全部图表类型
- **候选**：ECharts / Chart.js / D3.js / Highcharts
- **决定**：ECharts 5.x
- **理由**：
  - 原生支持所有所需图表类型
  - 内置暗色主题，Tableau 风格易定制
  - 中文社区活跃，文档完善
  - 交互式 tooltip + 联动 API 成熟
- **状态**：✅ 已锁定（CHARTER.md 红线）

## D003 — 交互深度：预设看板 + 筛选联动

- **日期**：2026-10-03
- **背景**：用户要求"Tableau 风格"，但拖拽建图工作量巨大
- **候选**：真·Tableau 拖拽建图 / 预设看板 + 筛选联动
- **决定**：预设看板 + 筛选联动（方案 B）
- **理由**：
  - 工作量可控，1-3 轮可交付
  - 筛选联动已满足日常分析需求
  - 拖拽建图留待 v2 迭代
- **状态**：✅ 已确认（PRD.md 非目标）

## D004 — 数据源：CSV + Excel，通用模型

- **日期**：2026-10-03
- **背景**：用户要求"随时读取本地文件夹数据"
- **决定**：
  - 支持 CSV + Excel(.xlsx)
  - 通用任意表头自动识别列类型
  - 自动监听文件变化 + 手动刷新双通道
- **状态**：✅ 已确认（PRD.md F1/F2/F3）

## D005 — 构建方式：GitHub Actions

- **日期**：2026-10-03
- **背景**：需要 Windows 安装包，但开发环境是 Linux
- **决定**：GitHub Actions windows-latest 构建
- **理由**：
  - 与主人既有 Excel 工具链一致
  - 免本地 Windows 环境
  - 自动发布到 GitHub Release
- **状态**：✅ 已确认（CHARTER.md 技术栈）

## D007 — Linux 沙箱不编译 Rust，依赖 GitHub Actions

- **日期**：2026-10-03
- **背景**：沙箱 glib 2.68 < Tauri 要求 2.70，无法在 Linux 上 cargo check
- **决定**：跳过 Linux 本地 Rust 编译验证，完全依赖 GitHub Actions windows-latest 构建
- **理由**：
  - 最终交付物是 Windows 安装包，Linux 本地编译不是必要条件
  - 前端 TypeScript + Vite 构建已验证成功
  - Rust 代码逻辑简单（CSV/Excel 解析 + 文件扫描），编译错误风险低
  - 升级沙箱 glib 可能影响其他项目
- **状态**：✅ 已确认

## D008 — CARGO_TARGET_DIR 规避路径冒号

- **日期**：2026-10-03
- **背景**：项目路径含 `:` 导致 Rust LD_LIBRARY_PATH 解析失败
- **决定**：在 GitHub Actions 中设置 `CARGO_TARGET_DIR` 或避免路径含冒号
- **状态**：✅ 已确认

## D006 — 项目目录位置

- **日期**：2026-10-03
- **决定**：`workspace/agent:main:uuid-64jm45mgcgrmurs6ga8/projects/desktop-bi/`
- **理由**：遵循 file write policy 约束
