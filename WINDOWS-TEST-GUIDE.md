# Windows 本地测试指南

## 环境要求

### 必需软件

1. **Node.js** ≥ 18（推荐 20 LTS）
   - 下载：https://nodejs.org/
   - 验证：`node -v`

2. **pnpm** ≥ 8
   - 安装：`npm install -g pnpm`
   - 验证：`pnpm -v`

3. **Rust** ≥ 1.70
   - 下载：https://rustup.rs/
   - 验证：`rustc --version`

4. **WebView2 Runtime**（Windows 10/11 通常已内置）
   - 验证：设置 → 应用 → 搜索 "WebView2"
   - 下载：https://developer.microsoft.com/en-us/microsoft-edge/webview2/

### 可选软件

5. **Visual Studio Build Tools**（Rust 编译可能需要）
   - 下载：https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - 安装时勾选 "C++ build tools"

---

## 测试步骤

### Step 1: 下载项目

将项目文件夹复制到 Windows 环境：

```bash
# 方式 1：Git clone（如果已推送）
git clone <repository-url>
cd desktop-bi

# 方式 2：直接复制文件夹
# 将 agent:main:uuid-64jm45mgcgrmurs6ga8/projects/desktop-bi 整个文件夹复制到 Windows
```

### Step 2: 安装依赖

```bash
cd desktop-bi
pnpm install
```

**预期输出**：
```
Packages: +246
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 246, reused 246, downloaded 0, added 246, done
```

### Step 3: 启动开发模式

```bash
pnpm tauri dev
```

**预期行为**：
1. Vite 启动开发服务器（http://localhost:1420）
2. Rust 编译（首次约 2-3 分钟）
3. 自动打开 Desktop BI 窗口

**首次运行检查点**：
- [ ] 窗口正常打开，标题显示 "Desktop BI"
- [ ] 界面显示浅色主题（冷蓝灰背景）
- [ ] 顶部导航栏显示 "Dashboard" / "Transactions" / "Analytics"
- [ ] Hero KPI 卡片显示酸性绿渐变

### Step 4: 功能测试

#### 4.1 文件夹选择

1. 点击右上角 **"📁 选择文件夹"** 按钮
2. 选择一个包含 CSV/Excel 文件的文件夹
3. **检查点**：
   - [ ] 文件夹选择对话框正常弹出
   - [ ] 选择后显示文件列表
   - [ ] 文件图标区分 CSV 和 Excel

#### 4.2 数据加载

1. 点击任意数据文件（如 `sales_data.csv`）
2. **检查点**：
   - [ ] 看板自动渲染
   - [ ] KPI 数值显示正确
   - [ ] 图表无空白或错误

**准备测试数据**：创建 `test_data/sample.csv`
```csv
Date,Category,Amount,Status
2026-01-05,Food,25.50,Completed
2026-01-06,Transport,12.00,Completed
2026-01-07,Shopping,89.99,Completed
2026-01-08,Income,2500.00,Completed
2026-01-10,Food,32.75,Completed
2026-01-12,Entertainment,45.00,Completed
2026-01-15,Income,850.00,Completed
2026-01-18,Utilities,120.00,Completed
2026-01-20,Food,18.50,Completed
2026-01-22,Transport,8.50,Completed
```

#### 4.3 筛选与联动

1. 点击柱状图的某一根柱子
2. **检查点**：
   - [ ] 其他图表同步过滤
   - [ ] 筛选栏显示当前筛选条件
   - [ ] 点击 "Clear All" 清除筛选

3. 点击环形图的扇区
4. **检查点**：
   - [ ] 跨图联动生效
   - [ ] 数据表同步过滤

#### 4.4 自动刷新

1. 勾选 **"Auto Refresh"**
2. 用文本编辑器修改 CSV 文件（新增一行）
3. 保存文件
4. **检查点**：
   - [ ] 500ms 后看板自动更新
   - [ ] KPI 数值变化
   - [ ] 无报错或闪烁

#### 4.5 性能测试（1000 行数据）

1. 生成 1000 行测试数据：

```python
# generate_test_data.py
import csv
import random
from datetime import datetime, timedelta

categories = ['Food', 'Transport', 'Shopping', 'Income', 'Entertainment', 'Utilities']
statuses = ['Completed', 'Pending']

with open('large_dataset.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Date', 'Category', 'Amount', 'Status'])
    
    base_date = datetime(2026, 1, 1)
    for i in range(1000):
        date = base_date + timedelta(days=i % 365)
        category = random.choice(categories)
        amount = round(random.uniform(5, 500), 2)
        status = random.choice(statuses)
        writer.writerow([date.strftime('%Y-%m-%d'), category, amount, status])
```

2. 加载 `large_dataset.csv`
3. **检查点**：
   - [ ] 加载时间 < 2 秒
   - [ ] 图表渲染流畅（无卡顿）
   - [ ] 滚动数据表流畅
   - [ ] 筛选响应 < 500ms

### Step 5: 打包测试（可选）

```bash
pnpm tauri build
```

**预期输出**：
```
Bundling [==================================================>] 100%
Finished 2 targets(s) in 45.23s
```

**安装包位置**：
```
src-tauri/target/release/bundle/nsis/Desktop-BI_0.1.0_x64-setup.exe
```

**安装包测试**：
1. 双击安装包
2. **检查点**：
   - [ ] 安装向导正常显示
   - [ ] 选择中文/英文语言
   - [ ] 安装完成后桌面出现快捷方式
   - [ ] 快捷方式图标为自定义图标（非默认）
   - [ ] 开始菜单有 "Desktop BI" 项
   - [ ] 启动后功能正常

**安装包体积检查**：
```bash
# 在文件资源管理器中查看
# 预期：< 20MB
```

---

## 常见问题排查

### Q1: `pnpm tauri dev` 报错 "WebView2 not found"

**解决**：
1. 下载 WebView2 Runtime：https://developer.microsoft.com/en-us/microsoft-edge/webview2/
2. 安装 Evergreen Bootstrapper
3. 重启终端

### Q2: Rust 编译报错 "link.exe not found"

**解决**：
1. 安装 Visual Studio Build Tools
2. 勾选 "C++ build tools"
3. 重启终端

### Q3: 窗口空白或白屏

**排查**：
1. 打开 DevTools：`Ctrl + Shift + I`
2. 检查 Console 错误
3. 检查 Network 是否有资源加载失败
4. 确认 Vite 服务器正常运行（访问 http://localhost:1420）

### Q4: 文件选择对话框不弹出

**排查**：
1. 检查 Tauri 权限：`src-tauri/capabilities/default.json`
2. 确认包含 `"dialog:default"`
3. 重新编译：`pnpm tauri dev`

### Q5: 自动刷新不生效

**排查**：
1. 确认勾选了 "Auto Refresh"
2. 检查 `folder_watch.rs` 日志
3. 确认文件系统支持 `notify` 监听（NTFS/FAT32 支持，网络驱动器可能不支持）

---

## 测试报告模板

完成测试后，填写以下报告：

```markdown
## Desktop BI Windows 测试报告

**测试环境**：
- Windows 版本：[如 Windows 11 23H2]
- Node.js 版本：[如 v20.10.0]
- pnpm 版本：[如 8.15.0]
- Rust 版本：[如 1.75.0]

**测试结果**：

| 测试项 | 结果 | 备注 |
|--------|------|------|
| 窗口启动 | ✅/❌ | |
| 界面渲染 | ✅/❌ | |
| 文件夹选择 | ✅/❌ | |
| 数据加载 | ✅/❌ | |
| 筛选联动 | ✅/❌ | |
| 自动刷新 | ✅/❌ | |
| 性能（1000行） | ✅/❌ | |
| 打包体积 | ✅/❌ | [实际体积] MB |
| 安装测试 | ✅/❌ | |

**发现问题**：
1. [问题描述]
2. ...

**建议优化**：
1. [优化建议]
2. ...
```

---

## 下一步

测试通过后：
1. 推送到 GitHub
2. 触发 CI 构建
3. 发布 Release

测试发现问题：
1. 记录问题详情
2. 优先修复阻塞性问题
3. 非阻塞性问题记录到 TODO
