# Desktop BI 方向决策

> 品味总监产出。方法论：ui-ux-pro-max（第一步检索）→ taste-skill → awesome-design-md。
> 用户选定方向前，禁止产出 DESIGN-SPEC 和任何界面代码。
> Brief 锁定美学家族：**Tableau 暗色**。本文档不推翻它，只在其内部做出"有品味"与"平庸"的区分。

---

## 1. ui-ux-pro-max 检索记录

| # | 查询词 | 命中 | 采纳与否 |
|---|--------|------|----------|
| 1 | `BI dashboard data analytics dark desktop Tableau --design-system --variance 3 --motion 2 --density 8` | Dials 3/2/8；Pattern "Enterprise Gateway"；Style "Minimalism & Swiss"；色板 蓝#1E40AF+琥珀（浅色）；字体 Fira Sans/Fira Code；效果 subtle hover 200-250ms；AVOID "Ornate design + No filtering" | Dials ✅ 全盘采纳；Pattern ❌（落地页模式，不适用桌面工具）；Style ✅ Swiss/极简是 Tableau 暗色的正确骨架；色板 ❌（浅色系，与已锁定的暗色 brief 冲突）；Fira Code ⚠️ 部分采纳——"数据工具用 mono 数字"的思路采纳，字体家族不采纳（Fira 气质偏 coder-quirky，见 §7）；hover 时长 ✅；AVOID ✅ |
| 2 | `dark analytics dashboard observability charts data-dense developer tool --density 9` | Analytics Dashboard → "Data-Dense Dashboard" + "Drill-Down Analytics + Comparative"；色板倾向 Cool→Hot 渐变 + 中性灰；Developer Tool → Dark OLED + Swiss + Terminal 风 | "Data-Dense + Drill-Down" ✅（正是本项目筛选→联动→明细表的路径）；渐变 ❌（brief 明令禁止）；中性灰 ✅；"Terminal 气质" ⚠️ 概念采纳（mono 数字 = 仪表感），不做终端拟态 |
| 3 | `dark mode OLED dashboard minimal swiss`（style 域） | dark-mode-oled：#000/#121212/Midnight Blue #0A0E27，neon accent + glow | 主体 ❌（neon/glow 违反 brief 零装饰）；Midnight Blue 色族 ⚠️ 仅转给备选 C 作底座参考 |

charts.csv 定点采纳（写入方向合同）：柱形图**按值降序排列**；**不得仅靠色相区分系列**（直接标注/线型辅助）；<1000 点 SVG、≥1000 点 Canvas（ECharts 默认 Canvas，满足）。

## 2. Design Read + 三刻度盘

**Design Read（一行）**：
Reading this as: a personal desktop analytics instrument for an engineer/architect, with a restrained "graphite instrument" language inside the locked Tableau-dark family, leaning toward Swiss minimalism + hairline-first hierarchy + monospaced numerals + fully reskinned ECharts.

**三刻度盘**：

| 刻度 | 值 | 推断依据 |
|------|-----|----------|
| DESIGN_VARIANCE | **3** | brief 锁定预设固定布局（KPI 顶部横排 + 网格图表），不做拖拽；变化只允许发生在质感层（色阶/发丝线/字体分工），不允许发生在结构层 |
| MOTION_INTENSITY | **2** | brief 只保留 tooltip 与过渡；数据刷新用 200ms 淡入淡出，禁入场动画花活 |
| VISUAL_DENSITY | **8** | brief 要求 DENSITY 8+；与主人跨项目统一范式（10-03 内网看板：高密度、克制圆角、无阴影）一致；触发 taste-skill 4.4 条款——**DENSITY>7 时禁止通用卡片盒容器**（这条直接否掉了草案的 KPI 卡片盒，见 §2.1） |

与 ui-ux-pro-max 检索 #1 的 `--variance 3 --motion 2 --density 8` 完全对齐，两套数值无冲突。

### 2.1 ARCHITECTURE 草案批判（brief 三问的正面回答）

**问 1：Tableau 默认暗色的问题在哪？草案里哪些是"AI 默认脸"？**

| 草案项 | 诊断 |
|--------|------|
| `#1e1e1e` 底 + `#2d2d2d` 卡 + `#3d3d3d` 边框 | 这不是 Tableau 的脸，是 **VS Code 默认暗色的脸**——LLM 生成"暗色工具"时的第一默认值。三层灰阶等距跳跃、处处 1px 边框，每个表面都在喊"我是卡片"，结果没有层次只有盒子套盒子，即 generic BI dashboard 既视感的最大来源 |
| KPI"卡片"横排 | DENSITY 8 下盒子化 KPI 卡是品类默认脸；taste-skill 明令 DENSITY>7 禁通用卡片容器。仪表盘的专业感来自**发丝线分隔的仪表条**，不来自一排圆角盒子 |
| 文字只有两档（`#f0f0f0`/`#a0a0a0`） | 两档不够撑起高密度界面的层次；且 `#f0f0f0` 在暗底上偏亮，8 小时阅读有光晕感（halation）。专业暗色系统至少三档文字灰阶 + 一档禁用态，主文字应压到 `#E8` 左右 |
| 强调色 `#4e79a7` 全局使用 | Tableau 蓝做 UI 强调本身正确（Tableau Desktop 就这么干），但**如果按钮、链接、选中态、图表系列全用同一支蓝，chrome 和数据就糊在一起**——这正是"平庸 Tableau 暗色"的典型病灶 |
| 图表色板直接上 Tableau 10 原值 | Tableau 10 是为浅底设计的；搬到暗底后各色的**感知亮度不齐**（`#edc948` 黄炸眼、`#4e79a7` 蓝偏沉、`#bab0ac` 灰与暗底对比不足），系列之间视觉权重失衡。需要一套暗底亮度校正 |
| 完全没写 ECharts 主题 | **最大的隐性默认脸**：ECharts 出厂主题的网格线、图例胶囊、白底阴影 tooltip、入场弹性动画，会瞬间把任何精心调的配色打回"generic 图表库 demo"。方向合同必须包含 ECharts 重皮条款 |

**问 2：如何保持 Tableau 专业感又不 generic？**
三条原则（进入主推方向合同）：① **色彩只属于数据**——chrome 全石墨灰阶，Tableau 蓝只出现在交互态，图表色板绝不下放给按钮/标签；② **层次靠发丝线与留白，不靠底色跳变和阴影**；③ **等宽数字做身份签名**——KPI 值、表格数字、轴标签全部 mono + tabular，这是"测量仪器"气质的来源，也是一眼区别于 AI 平均脸的细节。

**问 3：字体保留还是换？**
**保留 Inter + Noto Sans SC 做 UI/body，新增一支 mono 专职数字。** 理由：taste-skill 禁的是 Inter-as-display，本界面没有 display 场景（最大字号 = KPI 数值，由 mono 承担）；Inter 作中性工具 body 属于显式豁免（neutral/Linear-style override）；IBM Plex 在禁用清单里（且 Pier FM 已用过，家族须轮换）；Space Grotesk/Space Mono 同禁。唯一实质缺口是草案没有 mono——数据工具没有等宽数字，列不对齐、值会跳动，专业感直接塌一半。

---

## 3. 主推方向：「石墨仪器 / Graphite Instrument」（完整方向合同）

> Tableau 暗色的骨架，暖石墨的肤色，测量仪器的气质。
> 参考档案底座：ClickHouse（近黑画布 + 发丝线层次，弃其黄色电压）、Linear.app（四层暗表面 + 三档 hairline + "accent 永不装饰性使用"的纪律）；同时对齐主人 10-03 统一内网看板范式（暖石墨、克制圆角、无阴影、DENSITY 8）。

### THESIS
这个表面独占的一个想法：**"色彩是数据的属性，不是界面的属性"**。整个 chrome（背景、面板、筛选器、表头、按钮）是一套暖调石墨灰阶，全界面唯一的彩色来源是 Tableau 10（暗底校正版）绘制的图形元素，以及交互态里克制出现的 Tableau 蓝。它拒绝的品类默认：彩色顶边的 KPI 卡片盒、蓝色大按钮、图例胶囊、发光霓虹暗色主题。删掉所有数据内容后，剩下的应该像一台关机状态的仪器——安静、精密、无一处装饰。

### OWN-WORLD（配色与组件语言）

**表面体系（四层暖石墨，层间 ΔL 刻意小于草案，靠发丝线而非底色跳变分层）**：

| Token | 值 | 用途 |
|-------|-----|------|
| canvas | `#1B1A19` | 主背景（比草案 #1e1e1e 微暖微深，脱离 VS Code 脸） |
| surface-1 | `#222120` | 图表面板、明细表容器 |
| surface-2 | `#292725` | 顶栏、筛选栏、表头、tooltip |
| surface-elevated | `#302E2C` | 下拉菜单、弹窗（全界面最高层，仅此两处） |
| hairline | `#34312E` | 面板边框、分隔线 |
| hairline-strong | `#45413C` | 输入框聚焦前边框、KPI 竖分隔线 |

**文字四档（对齐 Linear 的 ink 梯度，亮度压低防光晕）**：

| Token | 值 | 用途 |
|-------|-----|------|
| ink | `#E8E6E1` | KPI 值、面板标题、正文强调 |
| ink-muted | `#B5B1A9` | 正文、表格内容 |
| ink-subtle | `#8A867E` | 轴标签、KPI 标签、次级信息 |
| ink-faint | `#5F5B54` | 禁用态、占位符、单位后缀 |

**chrome 交互色（唯一例外区）**：Tableau 蓝 `#4E79A7` 仅用于——筛选器激活态文字与 1px 下划线、焦点环（1px，offset 2px）、图表联动选中高亮、当前排序指示。**不用于**：按钮底色（主按钮 = surface-elevated + ink 文字 + hairline 边框）、链接下划线装饰、任何大面积填充。

**语义色（从 Tableau 10 内部取，保证单一色彩世界）**：成功/正向 delta `#59A14F`，警告 `#F28E2B`，错误/负向 delta `#E15759`。禁用红绿箭头之外的任何 delta 装饰（无胶囊底色、无徽章）。

**图表系列色板（Tableau 10 暗底亮度校正，保持色相识别度）**：
`#5F8AB8`(蓝·提亮) `#F28E2B`(橙·原值) `#E66B6D`(红·微提) `#76B7B2`(青·原值) `#6BAE62`(绿·微提) `#EDC948`(黄·原值) `#BD8CB0`(紫·微提) `#FF9DA7`(粉·原值) `#AC8672`(棕·微提) `#A8A29C`(灰·暖化)。
规则：系列数 ≤8；序列顺序固定；单系列图恒用第一位蓝；折线多系列须叠加点线型区分（采纳 charts.csv"不得仅靠色相"条款）；柱形恒按值降序。**此校正表待主人确认**（改动幅度克制，也可退回 Tableau 10 原值——但原值在暗底的亮度失衡是事实，退回需知情）。

**ECharts 重皮条款（合同级，不可省略）**：
- 画布透明，继承面板 surface-1；
- 网格线：仅横向 splitLine，`#34312E` 1px 实线（禁用 ECharts 默认虚线灰白）；坐标轴线、刻度线全部隐藏；
- 轴标签：ink-subtle，11px，数值轴用 mono；
- 图例：纯文字 11px ink-muted + 8px 方形色块（禁 ECharts 默认圆角胶囊/圆形图标），置面板标题行右侧；
- tooltip：surface-2 底 + hairline 1px 边框 + **零阴影**，标题 ink 12px，数值 mono ink，色块 8px 方形；
- 柱形：直角（0 圆角），单系列蓝，多系列用色板，barMaxWidth 28px；
- 折线：2px，无数据点符号（hover 才显形），面积填充仅限单系列且 opacity ≤0.12；
- 饼/环：环内径 62%，扇区间 1px canvas 色描边，标签引线 hairline 色，**环心默认不放大字**；
- 动画：初始入场 0ms（直接呈现，仪器不开机表演），数据更新 200ms linear 淡入淡出；禁 elastic/bounce 缓动。

**组件语言**：
- KPI 条：**非卡片**。canvas 上一条通栏 surface-1 容器，内部以 1px hairline-strong 竖线分格；每格 = 标签（11px ink-subtle，含聚合方式如 "SUM · 销售额"）+ 值（JetBrains Mono 26px 600 ink，tabular-nums）+ delta（mono 12px 语义色 + 内联 SVG 三角，无底色）；
- 图表面板：surface-1 + 1px hairline + 4px 圆角，标题行 13px ink 左置、图例右置，内边距 12px；
- 明细表：表头 surface-2 sticky，行分隔 hairline（禁斑马纹），行 hover surface-2，数字列右对齐 mono，字符串列 Inter，排序 caret 用 ink-subtle；
- 筛选器栏：surface-2 通栏，下拉触发器 = 透明底 + hairline 边框 + 3px 圆角，激活筛选器文字转 Tableau 蓝 + 左侧 8px 方块色标，可一键清除；
- 圆角锁定（一套规则贯彻）：容器 4px / 控件 3px / 图表内部与色块 0px，无第五种圆角；
- 阴影：**全界面零阴影**，elevated 层也只靠底色与 hairline；
- 图标：Phosphor 单一家族，16px，stroke 1.5，ink-subtle 色；禁 emoji 当图标（ARCHITECTURE 线框图里的 📁🔄 必须换成 SVG）；
- 滚动条：8px，滑块 hairline-strong，轨道透明。

**状态设计**（taste-skill 4.5 全周期条款）：加载 = 匹配最终布局的发丝线骨架块（surface-1 上 4% 亮度呼吸，禁圆形 spinner）；空态 = 居中构图，仪器轮廓 SVG + mono 一行提示（"选择文件夹以开始"）；错误 = 面板内联 hairline 边框 + `#E15759` 文字，禁 toast 弹错误。

### STORY
工程师打开它，理解的是：**"我的本地文件被装进了一台测量仪器"**——没有欢迎页、没有引导气泡，数据一进来指针就动。他相信的是：数字精确（等宽对齐、不跳动、无四舍五入装饰）、界面不会骗他（无动画夸大变化、无颜色暗示不存在的优先级）。他会做的动作链：选文件夹 → 扫 KPI 条 → 拉筛选器 → 点柱子触发联动 → 到明细表验证行级数据。整条链路上 chrome 保持沉默，只有数据在说话。

### FIRST VIEWPORT（1440×900 精确构图）
- 0-44px 顶栏：surface-2，左 = 16px 几何 logo + "Desktop BI"（13px 500 ink），右 = "选择文件夹"（hairline 边框按钮）+ 刷新图标按钮；当前文件路径以 mono 11px ink-subtle 显示在中间偏左；
- 44-84px 筛选栏：surface-2 与顶栏同层，之间 1px hairline；左置字段下拉 ×3（每个 max-width 180px），右置"清除全部"（激活时 Tableau 蓝）；
- 84-164px KPI 条：surface-1 通栏容器（左右 16px 页边距），6 格等分，竖 hairline 分隔；每格内：标签行 11px → mono 值 26px → delta 12px；
- 164px 起图表网格：3 列 × 12px gutter，首行 = 柱形图（跨 2 列）+ 环图（1 列），次行 = 折线（2 列）+ 散点（1 列），末行 = 明细表通栏（默认高度 320px，内部滚动）；
- 全局页边距 16px，无任何 hero/装饰区，首屏即满屏数据。

### 诚实风险
1. **暖石墨 vs 正宗 Tableau 冷灰**：暖偏移（约 +3° 色温）是与"教科书 Tableau 暗色"的可感知差异，恰好也是与主人 Pier FM/统一范式对齐的点——但若主人要的是像素级 Tableau 复刻，此方向偏了，应改选备选 B。**待确认**。
2. **发丝线层次不如盒子卡片直观**：对非工程师用户可能显得"平"；本受众是工程师/架构师本人，判定可接受。
3. **双字体系统需要纪律**：mono 一旦泄漏到非数字场景（如面板标题）就会滑向 terminal-cosplay；合同已用"数字专属"条款锁死，实现阶段需评审员盯防。
4. Tableau 10 暗底校正表是品味判断非官方值，若主人坚持原值，联动/选中态的高亮对比度需重新校核。

---

## 4. 备选 A / 备选 B

### 备选 A：「经典 Tableau 画布 / Faithful Canvas」
**简版合同**：完全忠实草案——冷中性 `#1e1e1e`/`#2d2d2d`/`#3d3d3d`，KPI 用盒子卡片（4px 圆角 + hairline），chrome 允许 Tableau 蓝做主按钮底色，文字两档 `#f0f0f0`/`#a0a0a0`，Inter 单字体 + `font-variant-numeric: tabular-nums`（不引入第二字体家族），ECharts 重皮条款照旧执行（这条不因方向而妥协）。
**与主推差异**：零暖偏、零新字体、盒子卡片回归——最接近"官方 Tableau 暗色"的复刻。
**诚实风险**：这就是品类默认脸（VS Code 灰阶 + 卡片盒），generic BI dashboard 既视感无法避免；两档文字在 DENSITY 8 下层次吃紧。它存在的意义是给主人一个"最保守、最可预期"的选项。

### 备选 B：「午夜驾驶舱 / Midnight Cockpit」
**简版合同**：冷午夜蓝画布 `#14171C`（dark-mode-oled 检索的 Midnight Blue 色族），表面 `#1B1F26`/`#222733`，hairline `#2A3038`，ink `#E6E9EF`；Tableau 10 原值不校正（冷深底上对比度天然更高，是本方向最大卖点）；数字用 Geist Mono；chrome 交互色仍限 Tableau 蓝。
**与主推差异**：更冷、更深、更接近监控驾驶舱气质；图表色彩的"电压"最高。
**诚实风险**：冷蓝暗色距 AI 默认脸②（midnight blue + neon glow）只有半步之遥——合同必须铁腕禁 glow/neon/发光边缘，一旦实现走样就成 slop；且与主人既有暖石墨系（Pier FM、weimi-workorder）家族不连续，跨项目视觉资产不互通。

---

## 5. 采纳的参考（awesome-design-md）

| 条目 | 采纳点 | 改造/拒绝点 |
|------|--------|-------------|
| **clickhouse** | 近黑画布 + 发丝线分层（canvas #0a0a0a / hairline #2a2a2a 的"层次靠线不靠跳变"手法）；数据工具的专业冷静气质 | 拒绝其电光黄品牌电压——本项目色彩主权归 Tableau 10；其纯冷黑改为暖石墨 |
| **linear.app** | 四层暗表面梯度（surface-1~4）、三档 hairline、四档 ink（#f7f8f8→#62666d 的完整梯度压缩改造为本文四档）、"accent 只出现在 focus/选中/极少数 CTA，永不装饰"的纪律 | 拒绝其薰衣草蓝主色与 80px display 大字场景——桌面无 landing，最大字号是 mono KPI 值 |
| **posthog / sentry**（检索后弃用） | — | PostHog 暖奶油浅色、Sentri 紫午夜 + 插画人格，均与 Tableau 暗色锁定方向冲突，仅作反面坐标（确认本项目不要"品牌人格化"，要"仪器匿名性"） |

## 6. 饱和风格自检记录

- **主推「石墨仪器」**：品类默认猜测是"冷灰 #1e1e1e + 卡片盒 + 蓝按钮"或"near-black + 霓虹"。本方向是暖石墨 + 发丝线分层 + 无卡片 KPI 条 + 色彩只属于数据 + mono 数字签名——仅凭"暗色 BI"品类猜不中，仅凭"回避暗色 BI 默认"也猜不中（回避者通常会猜向浅色或玻璃拟态）。不撞三大 AI 默认脸（无 cream+serif、无霓虹发光、无报纸编辑风）。与上一项目家族（weimi-workorder 的 Starbucks 暖奶油期已废弃、Pier FM 的 IBM Plex）不重复字体家族。✅
- **备选 A「经典 Tableau」**：**有意为之的品类默认**，作为保守选项存在，已如实标注其 generic 风险，不冒充有品味。⚠️ 合格但需知情选择。
- **备选 B「午夜驾驶舱」**：距 AI 默认脸②半步，合同以"铁腕禁 glow/neon"划清界限；冷午夜蓝 + 无发光 + Geist Mono 的组合在参考库中无同脸（最接近的 composio/voltagent 均带霓虹电压，本方向明确不带）。✅ 但风险已如实登记。

## 7. 字体候选

| 方向 | display | body/UI | CJK | 数字/代码 mono | 理由 |
|------|---------|---------|-----|----------------|------|
| 主推「石墨仪器」 | **无**（界面最大字 = KPI mono 值，不存在 display 场景） | Inter 400/500/600 | Noto Sans SC 400/500/700 | **JetBrains Mono 400/500/700**（tabular，KPI 值/表格数字列/轴标签/tooltip 数值/路径显示专用） | Inter 作中性工具 body 属 taste-skill 显式豁免，且与 Tableau 自身的中性无衬线气质同源；JetBrains Mono 不在禁用清单、数字字形辨识度高（0 带点斜杠划清 0/O）、OFL 可离线打包；IBM Plex/Space Mono/Space Grotesk 均禁；Fira Code（检索 #1 推荐）连字花哨偏 coder 玩具感，仪表场景弃用 |
| 备选 A「经典 Tableau」 | 无 | Inter | Noto Sans SC | 无第二家族：Inter + `tabular-nums` | 最小字体资产（2 个 woff2 家族），代价是数字气质平庸、大字号 KPI 值缺乏仪器感 |
| 备选 B「午夜驾驶舱」 | 无 | Geist 400/500/600 | Noto Sans SC | Geist Mono 400/500 | Geist 家族自带配套 mono，冷气质与午夜蓝底座同频；OFL 可离线；与主推形成清晰差异 |

通用条款：全部 woff2 自托管（brief 硬约束，禁 CDN/Google Fonts link）；`font-display: swap`；中文回落链 Noto Sans SC → system CJK；mono 恒开 `font-variant-numeric: tabular-nums` + `font-feature-settings: "zero"`（JetBrains Mono 的斜线零）。

---

## 附：待确认清单（交主人裁定）

1. **方向选择**：主推「石墨仪器」 / 备选 A「经典 Tableau」 / 备选 B「午夜驾驶舱」？
2. 主推项下：暖石墨偏移（#1B1A19 系）是否接受，还是要严格冷中性？
3. Tableau 10 暗底亮度校正表（§3）是否接受，还是用原值？
4. 数字 mono 字体：JetBrains Mono 是否认可？
5. KPI 条"去卡片化"（发丝线分格）是否接受？此为 DENSITY 8 条款的直接推论，但改变了 ARCHITECTURE 草案中"KPI 卡片"的字面形态。
