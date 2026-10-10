# WINDOWS-BUILD-NO-ADMIN.md — 无管理员权限构建指南

> 适用：公司电脑无管理员权限，无法安装软件到系统目录

---

## 核心原则

所有工具安装到 **用户目录**（`C:\Users\<你的用户名>\`），不写入系统目录。

---

## Step 1: 创建工具目录

打开 PowerShell（无需管理员）：

```powershell
mkdir $env:USERPROFILE\tools
cd $env:USERPROFILE\tools
```

---

## Step 2: 安装 Node.js（便携版）

```powershell
# 下载便携版 Node.js
cd $env:USERPROFILE\tools
Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.17.0/node-v20.17.0-win-x64.zip" -OutFile "nodejs.zip"
Expand-Archive -Path "nodejs.zip" -DestinationPath "."
Rename-Item "node-v20.17.0-win-x64" "nodejs"
Remove-Item "nodejs.zip"
```

添加 PATH（用户级，无需管理员）：
```powershell
$nodePath = "$env:USERPROFILE\tools\nodejs"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$currentPath;$nodePath", "User")
```

**重启 PowerShell**，验证：
```powershell
node --version    # → v20.17.0
```

---

## Step 3: 启用 pnpm（无需全局安装）

Node.js 20 自带 `corepack`：

```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version    # → 9.x.x
```

---

## Step 4: 安装 Rust（默认用户目录）

1. 下载：https://win.rustup.rs/x86_64
2. 双击 `rustup-init.exe`
3. 选择选项 **1**（默认安装）→ 这会安装到 `C:\Users\<你>\.cargo`，不需要管理员
4. **重启 PowerShell**
5. 验证：
```powershell
rustc --version    # → 1.81.0 或更高
cargo --version
```

---

## Step 5: 安装 Tauri CLI

```powershell
cargo install tauri-cli
```

安装到用户目录（`~\.cargo\bin`），无需管理员。

---

## Step 6: 解压项目并构建

```powershell
# 假设 desktop-bi.zip 已下载到桌面
cd $env:USERPROFILE\Desktop
Expand-Archive -Path "desktop-bi.zip" -DestinationPath "$env:USERPROFILE"
cd $env:USERPROFILE\desktop-bi

# 安装前端依赖
pnpm install

# 前端构建
pnpm run build

# Tauri 打包（生成安装包）
cargo tauri build
```

---

## Step 7: 产物位置

构建完成后，安装包位于：

```
$env:USERPROFILE\desktop-bi\src-tauri\target\release\bundle\nsis\
Desktop-BI_0.1.0_x64-setup.exe
```

---

## 安装权限说明

**安装包本身也不需要管理员。**

Tauri NSIS 安装器已配置为 `currentUser` 模式：
- 默认安装到：`C:\Users\<你的用户名>\AppData\Local\Desktop BI`
- 不写入 Program Files
- 桌面快捷方式写入用户桌面
- 公司电脑无管理员权限也能正常安装使用

## 常见问题

**Q: PowerShell 执行策略阻止脚本**
→ 当前用户级放开（无需管理员）：
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**Q: rustup-init.exe 提示需要管理员**
→ 确保你没有勾选 "Add to PATH for all users"。默认安装只影响当前用户。

**Q: cargo tauri build 下载依赖很慢**
→ 设置 Rust 国内镜像（用户级 `~\.cargo\config.toml`）：
```toml
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"
```

**Q: 安装 NSIS 时需要管理员**
→ Tauri 会自动下载 NSIS 到用户目录，不需要你手动安装。如果报错，检查网络是否允许下载。

---

## 权限检查清单

| 操作 | 是否需要管理员 | 实际路径 |
|:---|:---|:---|
| Node.js 便携版 | ❌ 否 | `C:\Users\<你>\tools\nodejs` |
| pnpm (corepack) | ❌ 否 | `C:\Users\<你>\AppData\Local\pnpm` |
| Rust (rustup) | ❌ 否 | `C:\Users\<你>\.cargo` |
| Tauri CLI | ❌ 否 | `C:\Users\<你>\.cargo\bin` |
| 项目构建 | ❌ 否 | `C:\Users\<你>\desktop-bi` |
| 安装包生成 | ❌ 否 | 项目目录内 |
