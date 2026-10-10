# PUSH-GUIDE.md — GitHub 推送与 Windows 测试指南

> 生成时间：2026-10-09
> 用途：指导用户在本地 Windows 环境完成代码推送与安装包测试

---

## Step 1: 在 GitHub 创建仓库

1. 登录 GitHub → New Repository
2. 仓库名：`desktop-bi`（或自定义）
3. 不勾选 "Add a README"（已有）
4. 创建后复制 HTTPS URL：`https://github.com/<username>/desktop-bi.git`

---

## Step 2: 本地推送（在沙箱执行）

```bash
cd /root/.openclaw/workspace/agent:main:uuid-64jm45mgcgrmurs6ga8/projects/desktop-bi

# 添加远程仓库（替换 <username>）
git remote add origin https://github.com/<username>/desktop-bi.git

# 推送
git push -u origin master
```

---

## Step 3: 触发 GitHub Actions 构建

推送后，Actions 不会自动触发（配置为 tag push 或手动 dispatch）。

**方式 A：打 tag 触发**
```bash
git tag v0.1.0
git push origin v0.1.0
```

**方式 B：GitHub 网页手动触发**
1. 进入仓库 → Actions 标签
2. 选择 "Build Desktop BI for Windows"
3. 点击 "Run workflow" → Run

---

## Step 4: Windows 实测清单

下载 Actions 产出的 `.exe` 安装包，在 Windows 10/11 执行：

| 检查项 | 通过标准 |
|:---|:---|
| 安装流程 | 双击 .exe → 正常安装 → 桌面出现 "Desktop BI" 图标 |
| 图标显示 | 桌面图标为自定义绿色图表（非默认 Tauri 图标） |
| 启动 | 双击图标 → 3 秒内打开主窗口 |
| 选择文件夹 | 点击 "Add Data" → 弹出文件夹选择器 → 选择含 CSV/Excel 的文件夹 |
| 文件列表 | 正确列出 CSV/Excel 文件 |
| 加载数据 | 选择文件后 → KPI/图表/表格正确渲染 |
| 筛选器 | 顶部筛选下拉显示真实数据列选项，选择后图表联动更新 |
| 图表联动 | 点击柱状图/环形图 → 其他图表高亮过滤 |
| 文件监听 | 修改文件夹内数据文件 → 看板自动刷新（或手动刷新生效） |
| 安装包大小 | ≤ 100MB |
| 无网络请求 | F12 开发者工具 → Network 标签 → 零外部请求 |

---

## Step 5: 测试数据

项目已包含 `test_data/` 目录，含 4 个测试文件：
- `sample_sales.csv` — 销售数据
- `monthly_finance.xlsx` — 月度财务
- `inventory_items.csv` — 库存数据
- `large_dataset.csv` — 1000 行大数据

---

## 已知限制（测试时关注）

1. **响应式**：<1024px 未适配，右侧列截断
2. **筛选器 mock**：DEV MODE 下无法验证，真实数据加载后确认
3. **图表联动 mock**：同上，真实数据后确认
