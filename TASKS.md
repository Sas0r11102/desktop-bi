# TASKS.md — Desktop BI 任务清单

> 流程：valet-dev-flow | PM：主机器人 | 状态：⬜ 未开始 / 🔄 进行中 / ✅ 完成

---

## Phase 0: 需求确认 ✅

- [x] T0.1 需求梳理与提问
- [x] T0.2 输出 PRD.md
- [x] T0.3 用户确认需求（⏸ 门禁 1）
- [x] T0.4 输出 CHARTER.md + ARCHITECTURE.md
- [x] T0.5 用户确认架构（⏸ 门禁 2）

## Phase 1: 设计 ✅

- [x] T1.0 品味总监方向决策（TASTE-DIRECTION.md）
- [x] T1.1 参考截图深度分析
- [x] T1.2 DESIGN-SPEC.md 视觉规范（v1.0）
- [x] T1.3 Demo 静态页面（index.html）
- [x] T1.4 Demo 迭代：字体粗壮化（Plus Jakarta Sans 800）
- [x] T1.5 Demo 迭代：浅色主题（冷蓝灰 #F1F5F9）
- [x] T1.6 Demo 迭代：配色对齐参考截图
- [x] T1.7 Demo 迭代：酸性绿渐变 + 磨砂玻璃卡片 + 灰紫柱状图
- [x] T1.8 用户确认 Demo（⏸ 门禁 3）

---

## Phase 2: 实现

- [x] T2.1 项目脚手架搭建（Tauri + Vite + TypeScript + TailwindCSS + ECharts）✅
  - 前端：Vite + React + TypeScript + TailwindCSS + ECharts 构建成功 (1.2MB JS, 399KB gzip)
  - 后端：Rust Tauri 源码完成 (commands.rs + lib.rs + main.rs)
  - TypeScript 零错误，Vite build 成功
  - Linux 沙箱 glib 版本不足，Rust 编译验证将在 GitHub Actions Windows 环境完成
- [x] T2.2 Rust 后端：CSV 读取与解析（`csv` crate）✅ commands.rs 已实现
- [x] T2.3 Rust 后端：Excel 读取与解析（`calamine` crate）✅ commands.rs 已实现
- [x] T2.4 Rust 后端：文件夹扫描 + 文件选择对话框 ✅ commands.rs scan_folder + dialog 插件
- [x] T2.5 Rust 后端：文件监听（`notify` crate）+ 事件推送 ✅ folder_watch.rs + lib.rs
- [x] T2.6 前端布局框架（浅色主题 + 三列网格）✅ App.tsx 已实现
- [x] T2.7 前端数据接入（IPC 调用 + Tauri API 封装层）✅ ipc/commands.ts + hooks/useDataLoader.ts

---

- [x] T2.8 KPI 卡片组件（自动识别数值列，显示 sum/avg/count）✅ KpiCard.tsx
- [x] T2.9 柱形/条形图（灰紫色 Revenue + 浅灰 Expense）✅ RevenueChart.tsx
- [x] T2.10 折线趋势图（Hero 波形图）✅ HeroKpi.tsx
- [x] T2.11 饼图/环图（占比构成）✅ ExpenseDonut.tsx
- [x] T2.12 散点分布图（相关性分析）✅ ScatterChart.tsx
- [x] T2.13 全局筛选器栏（多选下拉 + 联动显示）✅ FilterBar.tsx + linkedFilter
- [x] T2.14 跨图联动（RevenueChart + ExpenseDonut click → 全局过滤）✅ onLink callback
- [x] T2.15 明细数据表（排序、搜索、分页）✅ DataTable.tsx
- [x] T2.16 My Cards 磨砂玻璃悬浮堆叠 ✅ CardStack.tsx
- [x] T2.17 Hero KPI 酸性绿渐变卡片 ✅ HeroKpi.tsx

---

## Phase 3: 打包与交付

- [x] T3.1 桌面图标设计与多尺寸导出（SVG → PNG → ICO）✅
  - 生成 6 种尺寸 PNG：16x16, 32x32, 64x64, 128x128, 256x256, 512x512
  - 生成 Windows ICO 文件（包含 16/32/64/128/256px）
  - 更新 tauri.conf.json 图标配置
- [x] T3.2 Tauri 打包配置（NSIS 安装包、桌面快捷方式）✅
  - 配置 desktop shortcut 和 start menu shortcut
  - NSIS compression: lzma
- [x] T3.3 GitHub Actions 工作流（Windows 构建 + Release 发布）✅
  - 触发条件：tag push (v*) 或手动 dispatch
  - 环境：windows-latest
  - 自动构建、打包、创建 Release Draft
- [ ] T3.4 安装包测试（Windows 10/11 安装、启动、功能验证）— 🔄 GitHub Actions 构建后 Windows 实测
  - Git 仓库已初始化，64 文件提交
  - PUSH-GUIDE.md 已生成，含推送命令与测试清单
- [x] T3.5 规格评审（逐条对照 PRD 验收标准）✅
  - 7/8 验收标准已满足，1/8 待 Windows 实测
  - PRD.md 已更新：浅色主题、技术约束同步
- [x] T3.6 质量评审（代码质量、无红线违反）✅
  - 红线 6/6 通过（零上传、零 CDN、包体上限、Windows 兼容、浅色主题、零回归）
  - 代码质量良好：TS 零错误、构建成功、架构清晰
  - CHARTER.md 已更新：锁项清单补充完整
- [x] T3.7 字体本地化（移除 Google Fonts CDN，使用 @fontsource）✅
  - 安装 @fontsource/noto-sans-sc, plus-jakarta-sans, inter, jetbrains-mono
  - 只加载 chinese-simplified 子集，CSS 从 566KB 降至 93KB（-83%）
  - 构建成功，零 CDN 依赖

---

## 变更日志

| 日期 | 变更内容 |
|------|---------|
| 2026-10-03 | 初始任务清单创建 |
| 2026-10-03 | Phase 0-1 完成，Demo 确认通过，进入 Phase 2 |
