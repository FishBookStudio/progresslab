# GitHub Pages 空白页面快速修复指南

## 🚨 立即检查清单

### 1. 检查 GitHub Actions 是否成功运行

访问：https://github.com/FishBookStudio/progresslab/actions

- ✅ **如果看到绿色勾号**：部署成功，继续下一步
- ❌ **如果看到红色叉号**：点击查看错误日志
- ⏳ **如果正在运行**：等待完成

### 2. 检查 GitHub Pages 设置

访问：https://github.com/FishBookStudio/progresslab/settings/pages

**必须确认：**
- Source: **GitHub Actions**（不是 "Deploy from a branch"）
- Branch: `main`
- Folder: `/ (root)` 或留空

### 3. 检查浏览器控制台

1. 访问：https://fishbookstudio.github.io/progresslab/
2. 按 `F12` 打开开发者工具
3. 查看 **Console** 标签页

**常见错误：**

#### ❌ 错误 1：404 Not Found
```
Failed to load resource: the server responded with a status of 404 (Not Found)
/progresslab/assets/js/index-xxx.js
```

**原因：** GitHub Actions 可能使用了错误的构建命令

**解决：**
1. 检查 `.github/workflows/deploy.yml` 文件
2. 确认使用的是 `npm run build:gh-pages`
3. 重新推送代码触发部署

#### ❌ 错误 2：CORS 错误
```
Access to script at 'https://esm.sh/...' has been blocked by CORS policy
```

**原因：** 通常不是问题，ESM.sh 支持 CORS

**解决：** 忽略此错误，检查其他错误

#### ❌ 错误 3：模块未找到
```
Failed to resolve module specifier "react"
```

**原因：** importmap 可能有问题

**解决：** 检查 `index.html` 中的 importmap 配置

### 4. 检查网络请求

1. 在开发者工具中打开 **Network** 标签页
2. 刷新页面
3. 检查以下资源是否加载成功：
   - `index.html` - 应该返回 200
   - `/progresslab/assets/js/index-xxx.js` - 应该返回 200
   - `https://cdn.tailwindcss.com` - 应该返回 200
   - `https://esm.sh/react@^19.2.3` - 应该返回 200

### 5. 强制重新部署

如果以上都正常但页面仍然空白：

1. 进入 Actions 标签页
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击右上角 "Run workflow"
4. 选择 `main` 分支
5. 点击 "Run workflow"

## 🔧 手动修复步骤

### 步骤 1：确认本地构建正常

```bash
# 清理旧的构建
rm -rf dist

# 使用 GitHub Pages 配置构建
npm run build:gh-pages

# 检查构建产物
ls -la dist/assets/js/
```

### 步骤 2：检查构建后的 HTML

```bash
# 查看 JavaScript 文件路径
grep 'src=' dist/index.html | grep assets
```

**应该看到：**
```html
<script type="module" crossorigin src="/progresslab/assets/js/index-xxx.js"></script>
```

**不应该看到：**
```html
<script type="module" crossorigin src="/assets/js/index-xxx.js"></script>
```

### 步骤 3：提交并推送

```bash
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

### 步骤 4：等待部署完成

1. 访问 Actions 页面查看进度
2. 等待 2-5 分钟
3. 访问网站检查

## 🐛 如果仍然无法解决

请提供以下信息：

1. **浏览器控制台完整错误信息**（截图或复制文本）
2. **Network 标签页中失败的请求**（截图）
3. **GitHub Actions 日志**（如果有错误）
4. **实际访问的 URL**

然后可以：
- 在 GitHub Issues 中提交问题
- 或者联系技术支持

## 📝 临时解决方案

如果急需上线，可以考虑：

1. **使用 Vercel 部署**（更简单）
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **使用 Netlify 部署**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

这些平台通常比 GitHub Pages 更容易配置。
