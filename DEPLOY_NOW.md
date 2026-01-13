# 🚀 立即部署指南

## 方法 1：GitHub Pages 自动部署（推荐）

### 步骤 1：提交并推送代码

```bash
# 查看更改的文件
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "Add Google Analytics and fix console errors"

# 推送到 GitHub
git push origin main
```

### 步骤 2：等待自动部署

1. **访问 Actions 页面**
   - https://github.com/FishBookStudio/progresslab/actions

2. **查看部署进度**
   - 推送代码后，GitHub Actions 会自动运行
   - 点击最新的工作流查看进度
   - 等待看到绿色勾号（通常 2-5 分钟）

3. **访问网站**
   - 部署完成后访问：https://fishbookstudio.github.io/progresslab/

### 步骤 3：验证部署

- ✅ 网站可以正常访问
- ✅ 页面内容正常显示
- ✅ Google Analytics 正常工作（检查控制台）

## 方法 2：手动触发部署

如果自动部署没有触发，可以手动触发：

1. **访问 Actions 页面**
   - https://github.com/FishBookStudio/progresslab/actions

2. **手动运行工作流**
   - 点击左侧 "Deploy to GitHub Pages"
   - 点击右侧 "Run workflow"
   - 选择 `main` 分支
   - 点击 "Run workflow"

3. **等待完成**
   - 通常需要 2-5 分钟
   - 看到绿色勾号表示成功

## 📋 部署前检查清单

- [ ] 代码已提交到本地仓库
- [ ] GitHub Pages Source 设置为 "GitHub Actions"
- [ ] `.github/workflows/deploy.yml` 文件存在
- [ ] `package.json` 中有 `build:gh-pages` 脚本
- [ ] `vite.config.ts` 中 base 路径配置正确

## 🔍 如果部署失败

### 检查 GitHub Actions 日志

1. 进入 Actions 页面
2. 点击失败的工作流
3. 查看错误信息

### 常见问题

**问题 1：构建失败**
- 检查 Node.js 版本
- 检查依赖是否正确安装

**问题 2：部署失败**
- 检查 GitHub Pages 设置
- 确认 Source 选择 "GitHub Actions"

**问题 3：页面空白**
- 检查浏览器控制台错误
- 确认资源路径正确

## 🎯 快速部署命令

```bash
# 一键部署（提交并推送）
git add . && git commit -m "Deploy updates" && git push origin main
```

然后访问 Actions 页面查看部署进度。
