# DESIGN-SPEC.md — Desktop BI 视觉规范 v1.0

> 风格定位：**FinTech 科技骨架 + 冷蓝灰浅色**
> 参考截图：唯秘 FinTech Dashboard（浅色主题 + 大圆角 + Emerald 绿 + 酸性绿渐变）
> 视觉确认：2026-10-03 主人确认 Demo，以下规范已锁定

---

## 1. 配色体系

### 1.1 表面层级（冷蓝灰浅色，5 层）

| Token | Hex | 用途 |
|-------|-----|------|
| `--canvas` | `#F1F5F9` | 全局背景（冷蓝灰） |
| `--surface-1` | `#FFFFFF` | 普通卡片底色（白） |
| `--surface-2` | `#F8FAFC` | 顶栏、表头、hover 态 |
| `--surface-3` | `#E2E8F0` | 输入框、控件、未选中 pill |
| `--surface-elevated` | `#FFFFFF` | 弹窗、tooltip |

靠底色差 + 极轻阴影分层。

### 1.2 文字层级（4 档，深色 on 浅色）

| Token | Hex | 用途 |
|-------|-----|------|
| `--ink-primary` | `#0F172A` | 核心数值、页面标题 |
| `--ink-secondary` | `#475569` | 正文、卡片标题 |
| `--ink-tertiary` | `#94A3B8` | 标签、描述文字 |
| `--ink-faint` | `#CBD5E1` | 禁用态、占位符 |

### 1.3 功能色（与参考截图完全一致）

| Token | Hex | 用途 |
|-------|-----|------|
| `--accent-green` | `#10B981` | 正向/增长、Income、+8.5% |
| `--accent-green-light` | `#34D399` | 渐变起点、高亮态 |
| `--accent-red` | `#EF4444` | 负向/支出、Expense、-2.4% |
| `--accent-red-light` | `#F87171` | 红色渐变 |
| `--accent-purple` | `#A78BFA` | 图表色板第一色 |
| `--accent-lavender` | `#B4A7D6` | **柱状图 Revenue 专用**（灰紫） |
| `--accent-blue` | `#60A5FA` | 链接、信息提示 |
| `--accent-yellow` | `#FBBF24` | 警告 |

### 1.4 渐变色（已锁定）

| Token | 值 | 用途 |
|-------|-----|------|
| `--gradient-hero` | `linear-gradient(135deg, #34D399 0%, #6EE7B7 40%, #A7F3D0 100%)` | **Hero KPI 卡片（酸性绿）** |
| `--gradient-card-red` | `linear-gradient(135deg, #EF4444 0%, #F87171 100%)` | 负向 KPI 卡片 |
| `--gradient-card-purple` | `linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)` | 装饰性卡片 |
| `--gradient-visa` | `linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #818CF8 100%)` | 信用卡前置卡 |

**渐变使用纪律**：仅 Hero KPI 卡片和重点装饰区使用渐变，普通面板/图表区域纯色。

### 1.5 图表色板（多色彩虹系，10 色）

```
#A78BFA (紫)  #60A5FA (蓝)  #22D3EE (青)  #10B981 (绿)  #FBBF24 (黄)
#F97316 (橙)  #EF4444 (红)  #EC4899 (粉)  #8B5CF6 (深紫) #6366F1 (靛蓝)
```

环形图、多系列图表按此顺序取色。

---

## 2. 圆角体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-xl` | `20px` | 大卡片、主要面板 |
| `--radius-lg` | `16px` | 普通卡片 |
| `--radius-md` | `12px` | 子面板、图表容器 |
| `--radius-sm` | `8px` | 输入框、小组件 |
| `--radius-pill` | `9999px` | 胶囊按钮、标签、趋势指示器 |

---

## 3. 字体系统（粗壮型，已锁定）

| 场景 | 字体 | 字号 | 字重 | 备注 |
|------|------|------|------|------|
| 页面标题 | **Plus Jakarta Sans** | 24px | **800** | "My Dashboard" |
| 核心大数字 | **Plus Jakarta Sans** | 30-40px | **800** | KPI 数值，tabular-nums |
| 卡片标题 | **Plus Jakarta Sans** | 14px | **700** | "Revenue Flow" |
| 按钮/胶囊 | **Plus Jakarta Sans** | 11-13px | **700** | pill/按钮文字 |
| KPI 标签 | **Plus Jakarta Sans** | 12px | **700** | uppercase, letter-spacing 0.03em |
| 正文 | Inter | 12-13px | 500 | 分类标签、描述 |
| 中文 | Noto Sans SC | — | 400/500/700/900 | 回退字体 |
| 数字列（表格） | JetBrains Mono | 12-13px | 600 | tabular-nums，右对齐 |
| 微小标注 | Inter | 10-11px | 400 | 日期/辅助 |

字体栈：
```css
--font-display: 'Plus Jakarta Sans', 'Inter', 'Noto Sans SC', system-ui, sans-serif;
--font-sans: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

---

## 4. 间距与布局

| Token | 值 | 用途 |
|-------|-----|------|
| `--spacing-xs` | `4px` | 紧凑元素内间距 |
| `--spacing-sm` | `8px` | 标签与值间距 |
| `--spacing-md` | `12px` | 卡片内边距、图表 padding |
| `--spacing-lg` | `16px` | 卡片间距（gutter） |
| `--spacing-xl` | `20px` | 区块间距 |
| `--spacing-2xl` | `24px` | 页面边距 |

### 布局网格
- **三列非对称**：左 50-55% + 中 25% + 右 20-25%
- **Gutter**：16px
- **页面边距**：24px
- **顶栏高度**：56px
- **卡片最小高度**：自适应内容

---

## 5. 阴影

| Token | 值 | 用途 |
|-------|-----|------|
| `--shadow-card` | `0 4px 24px rgba(0,0,0,0.15)` | 卡片微阴影（极克制） |
| `--shadow-elevated` | `0 8px 32px rgba(0,0,0,0.25)` | 弹窗/下拉 |

**纪律**：阴影仅用于层级提升（弹窗 > 卡片 > 背景），不用于装饰。大部分卡片靠底色差分层即可。

---

## 6. 组件规范

### 6.1 KPI 卡片

```
┌──────────────────────────────────┐  ← surface-1, radius-lg, shadow-card
│  📊 Total Balance                │  ← ink-tertiary 12px + 图标
│  $120,456.50                     │  ← ink-primary 36px mono 600
│  ┌──────────┐                    │
│  │ ↑ +8.5% │  vs last month    │  ← 胶囊: accent-green pill bg + white text
│  └──────────┘                    │
│  ～～～～～ 面积图波形 ～～～～～  │  ← 白色曲线 + 半透明白填充
└──────────────────────────────────┘
```

- Hero 卡片可用 `--gradient-hero` 渐变底色
- 普通 KPI 用 `surface-1` 纯色
- 趋势胶囊：`accent-green` 底 + 白色箭头 + 百分比

### 6.2 普通数据卡片（图表容器）

```
┌────────────────────────────┐  ← surface-1, radius-lg
│  Revenue Flow    Monthly ▼ │  ← 标题 ink-secondary 14px + 筛选胶囊
│                            │
│  [柱状图/折线图/环形图]     │  ← 图表区域
│                            │
│  Jan  Feb  Mar  Apr        │  ← 轴标签 ink-tertiary 11px
└────────────────────────────┘
```

### 6.3 按钮

| 类型 | 样式 | 用途 |
|------|------|------|
| 主按钮 | `accent-green` 底 + 白字 + radius-pill + hover 提亮 10% | 主要操作（"Add"） |
| 次按钮 | `surface-3` 底 + ink-secondary 字 + radius-pill | 次要操作 |
| 幽灵按钮 | 透明底 + ink-secondary 字 + 1px hairline 边框 + radius-pill | 三级操作 |
| 图标按钮 | 透明底 + ink-tertiary 图标 + hover surface-3 底 + radius-sm | 操作图标 |

### 6.4 筛选器/胶囊切换

```
[Monthly] [Yearly] [All]    ← 未选中: surface-3 + ink-tertiary + radius-pill
 ●Monthly  Yearly  All      ← 选中: accent-green + white + radius-pill
```

### 6.5 输入框

- 底色：`surface-3`
- 边框：1px `#3E3A37`（hairline）
- 圆角：`radius-sm` (8px)
- 聚焦：边框变 `accent-green`，无阴影
- 占位符：`ink-faint`

### 6.6 Tab 导航

- 未选中：`ink-tertiary` 文字，无底线
- 选中：`ink-primary` 文字 + 2px `accent-green` 下划线
- 间距：24px 水平间距

### 6.7 搜索框

- 左侧放大镜图标（outline, 1.5px）
- 底色 `surface-3`，radius-sm
- 占位符 "Search..."

---

## 7. 图表规范（ECharts 重皮）

### 7.1 柱状图
- 柱形：**顶部圆角 4px**，底部直角
- 单系列 Revenue：`accent-lavender` `#B4A7D6`（灰紫色，已确认）
- Expense 柱：`#E2E8F0`（浅灰，与底色接近）
- 多系列：图表色板按序取色
- barMaxWidth：28px
- 柱间距：柱宽的 40%
- X 轴标签：`ink-tertiary` 11px，月份缩写
- Y 轴：隐藏轴线和刻度，仅保留横向网格线 `#3E3A37` 1px
- 无入场动画

### 7.2 折线图/面积图
- 线宽：2px，平滑曲线（smooth: true）
- 面积填充：渐变色 opacity 0.15 → 0
- 数据点：默认隐藏，hover 显示 6px 圆点
- Hero 卡片波形：白色曲线 + 白色渐变填充

### 7.3 环形图
- 内径：62%
- 扇区间：2px canvas 色描边（分隔）
- 中心：总金额或百分比（ink-primary mono）
- 图例：右侧竖排，8px 圆点色块 + ink-secondary 12px 文字
- 颜色：图表色板按序

### 7.4 KPI 面积图（波形）
- 白色平滑曲线 2px
- 白色渐变填充（opacity 0.3 → 0）
- 无坐标轴、无标签
- 仅装饰性展示趋势

### 7.5 Tooltip
- 底色：`surface-elevated`
- 边框：1px `#4A4540`
- 阴影：`shadow-elevated`
- 标题：ink-primary 12px
- 数值：JetBrains Mono ink-primary
- 色块：8px 圆形

---

## 8. 动效规范

| 场景 | 动效 | 时长 | 缓动 |
|------|------|------|------|
| 卡片 hover | 底色提亮 3-5% | 150ms | ease |
| 按钮 hover | 底色提亮 10% | 150ms | ease |
| 图表数据更新 | 淡入淡出 | 200ms | linear |
| 筛选器切换 | 图表数据过渡 | 300ms | ease-out |
| 弹窗/下拉出现 | opacity 0→1 + translateY -4px→0 | 200ms | ease-out |
| 页面加载 | 无动画，直接呈现 | 0ms | — |

**禁止**：elastic/bounce 缓动、入场弹性动画、旋转 loading spinner（用骨架屏替代）。

---

## 9. 图标规范

- 家族：Phosphor Icons（outline 风格）
- 尺寸：16px / 20px / 24px
- 线宽：1.5px
- 颜色：`ink-tertiary`（默认）、`ink-secondary`（hover/激活）
- 禁止：emoji 作为功能图标

---

## 10. 边框与分隔线

| Token | 值 | 用途 |
|-------|-----|------|
| `--hairline` | `#3E3A37` | 输入框边框、分隔线 |
| `--hairline-strong` | `#4A4540` | 强调边框 |

大部分组件**无边框**，靠底色差分层。仅在输入框聚焦、分割区域时使用 hairline。

---

## 11. 滚动条

- 宽度：6px
- 滑块：`#4A4540`，圆角
- 轨道：透明
- hover 时滑块提亮

---

## 12. 状态设计

| 状态 | 表现 |
|------|------|
| 加载中 | 骨架屏（surface-1 → surface-2 呼吸动画） |
| 空数据 | 居中 SVG 插图 + ink-tertiary 提示文字 |
| 错误 | 面板内联 hairline 边框 + accent-red 文字 |
| 禁用 | ink-faint 文字 + 降低 opacity 至 50% |

---

## 13. Demo 布局（首屏 1440×900）

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo] Desktop BI          [🔍 Search...]    [Dashboard] [...]  │  ← 顶栏 surface-2
├────────────────────────────┬───────────────┬────────────────────┤
│                            │               │                    │
│  ┌────────────────────┐    │ ┌───────────┐ │  ┌──────────────┐ │
│  │  📊 Total Balance  │    │ │ ↑ Income  │ │  │  💳 My Cards │ │
│  │  $120,456.50       │    │ │ +2,456    │ │  │  [卡1] [卡2] │ │
│  │  ↑ +8.5%           │    │ │ +8.5%     │ │  │              │ │
│  │  ～～波形图～～     │    │ └───────────┘ │  └──────────────┘ │
│  └────────────────────┘    │ ┌───────────┐ │                    │
│                            │ │ ↓ Expense │ │  ┌──────────────┐ │
│  ┌────────────────────┐    │ │ -1,124    │ │  │  📋 订阅     │ │
│  │  Revenue Flow      │    │ │ -2.4%     │ │  │  Netflix     │ │
│  │  [Monthly] [Yearly]│    │ └───────────┘ │  │  Spotify     │ │
│  │  [柱状图]           │    │               │  │  AWS         │ │
│  │                    │    │ ┌───────────┐ │  └──────────────┘ │
│  └────────────────────┘    │ │Expense    │ │                    │
│                            │ │ Split 🍩  │ │                    │
│  ┌────────────────────┐    │ │ [环形图]  │ │                    │
│  │  Recent Activity   │    │ └───────────┘ │                    │
│  │  [交易列表]         │    │               │                    │
│  └────────────────────┘    │               │                    │
├────────────────────────────┴───────────────┴────────────────────┤
│  [明细数据表 — 默认折叠或展开]                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 14. My Cards 磨砂玻璃悬浮堆叠（已锁定）

### 14.1 卡片堆叠结构

三张信用卡 Z 轴层叠 + 旋转错位：

| 卡片 | 位置 | 旋转 | 样式 |
|------|------|------|------|
| Visa（前置） | top:0, left:0 | rotate(-2deg) | 深蓝紫渐变 `#4338CA→#818CF8` |
| MC（中间） | top:22px, left:14px | rotate(1deg) | **磨砂玻璃** rgba(255,255,255,0.45) + backdrop-filter blur(16px) |
| Amex（后置） | top:44px, left:28px | rotate(3deg) | **磨砂玻璃** rgba(255,255,255,0.25) + backdrop-filter blur(20px) |

### 14.2 悬浮扇形展开动效

```css
.card-stack:hover .card-visa  → rotate(-6deg) translateY(-12px) scale(1.02)
.card-stack:hover .card-mc    → rotate(0deg) translateY(0px)
.card-stack:hover .card-amex  → rotate(6deg) translateY(12px)
```

- 过渡：500ms cubic-bezier(0.23, 1, 0.32, 1)
- perspective: 800px

### 14.3 磨砂玻璃 CSS

```css
background: rgba(255,255,255,0.45);
backdrop-filter: blur(16px) saturate(1.8);
-webkit-backdrop-filter: blur(16px) saturate(1.8);
border: 1px solid rgba(255,255,255,0.6);
```

---

## 15. 与参考截图的差异说明

| 维度 | 参考截图 | 本项目 | 原因 |
|------|---------|--------|------|
| 底色 | 冷蓝黑 `#121418` | 冷蓝灰 `#F1F5F9`（浅色） | 主人要求浅色主题 |
| 数据场景 | 金融/信用卡 | 通用 BI（CSV/Excel） | 功能定位不同 |
| 品牌渐变 | 青绿渐变卡片 | 酸性绿渐变 `#34D399→#A7F3D0` | ✅ 一致 |
| 信用卡组件 | 有 | 有（磨砂玻璃堆叠） | ✅ 一致 |

其余所有视觉细节（圆角、阴影、按钮、图表、动效、字体粗壮度）严格复刻参考截图。
