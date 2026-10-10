# WINDOWS-BUILD.md — Windows 本地构建指南

> 适用：无法使用 GitHub Actions 时，在 Windows 10/11 本地构建 Desktop BI 安装包

---

## 前置条件

- Windows 10/11
- 网络连接（下载依赖）

---

## Step 1: 安装依赖

### 1.1 安装 Node.js
1. 下载：https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi
2. 双击安装，全部默认下一步
3. 验证：`node --version` → `v20.17.0`

### 1.2 安装 pnpm
```powershell
npm install -g pnpm
pnpm --version
```

### 1.3 安装 Rust
1. 下载：https://win.rustup.rs/x86_64
2. 双击 `rustup-init.exe`
3. 选择选项 1（默认安装）
4. 重启 PowerShell
5. 验证：`rustc --version` → `1.81.0` 或更高

### 1.4 安装 Tauri CLI
```powershell
cargo install tauri-cli
```

### 1.5 安装 WebView2（Windows 11 已自带）
- Windows 10 用户下载：https://developer.microsoft.com/microsoft-edge/webview2/
- 选择 "Evergreen Standalone Installer"

---

## Step 2: 解压项目

1. 下载 `desktop-bi.zip` 到桌面
2. 右键 → 全部解压缩 → 选择 `C:\Users\<你的用户名>\desktop-bi`

---

## Step 3: 安装前端依赖

```powershell
cd C:\Users\<你的用户名>\desktop-bi
pnpm install
```

---

## Step 4: 构建

### 4.1 前端生产构建
```powershell
pnpm run build
```

### 4.2 Tauri 打包（生成安装包）
```powershell
cargo tauri build
```

等待 5-10 分钟，产物位于：
```
src-tauri\target\release\bundle\nsis\Desktop-BI_0.1.0_x64-setup.exe
```

---

## Step 5: 测试安装包

1. 双击 `.exe` 安装
2. 检查桌面是否出现 "Desktop BI" 图标
3. 双击图标启动
4. 点击 "Add Data" → 选择 `test_data/` 文件夹
5. 验证：KPI 卡片、图表、筛选器、表格是否正常

---

## 安装权限说明

**无需管理员权限。**

NSIS 安装器已配置为 `currentUser` 模式：
- 默认安装到：`C:\Users\<你的用户名>\AppData\Local\Desktop BI`
- 不写入 Program Files
- 桌面快捷方式写入用户桌面
- 卸载不残留系统目录文件

## 常见问题

**Q: cargo tauri build 报错 "could not find cargo.toml"**
→ 确保你在项目根目录（含 `src-tauri/` 文件夹的目录）

**Q: 构建时下载依赖很慢**
→ 设置 Rust 国内镜像（如中科大的）：
```powershell
$env:CARGO_HTTP_TIMEOUT = "300"
```

**Q: 安装包超过 100MB**
→ 正常。Tauri 包含 WebView2 运行时，安装包通常 50-80MB。

**Q: 图标还是默认 Tauri 图标**
→ 检查 `icons/` 目录是否有自定义图标文件，或运行 `pnpm tauri icon` 重新生成。
