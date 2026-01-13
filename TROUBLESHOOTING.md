# GitHub Pages 部署故障排查指南

## 🔍 问题：页面空白

如果 GitHub Pages 部署后页面显示空白，请按以下步骤排查：

### 1. 检查 GitHub Actions 部署状态

1. 访问：https://github.com/FishBookStudio/progresslab/actions
2. 查看最新的工作流运行状态
3. 如果失败，点击查看详细错误日志

### 2. 检查 GitHub Pages 设置

1. 进入仓库 Settings → Pages
2. 确认 Source 选择的是 **"GitHub Actions"**（不是 "Deploy from a branch"）
3. 确认分支是 `main`
4. 保存设置

### 3. 检查浏览器控制台错误

打开网站后，按 F12 打开开发者工具，查看 Console 标签页：

**常见错误：**

#### 错误 1：资源 404
```
Failed to load resource: the server responded with a status of 404
/progresslab/assets/js/index-xxx.js
```

**解决方案：**
- 确认构建时使用了 `npm run build:gh-pages`
- 检查 `vite.config.ts` 中的 base 配置是否正确

#### 错误 2：CORS 错误
```
Access to script at 'https://esm.sh/...' from origin 'https://fishbookstudio.github.io' has been blocked by CORS policy
```

**解决方案：**
- 这是正常的，ESM.sh 支持 CORS
- 如果确实有问题，可能需要检查网络连接

#### 错误 3：模块加载错误
```
Failed to resolve module specifier "react"
```

**解决方案：**
- 检查 `index.html` 中的 importmap 是否正确
- 确认浏览器支持 ES Modules

### 4. 验证构建产物

在本地运行：
```bash
npm run build:gh-pages
```

检查 `dist/index.html` 中的路径：
- ✅ 应该是：`/progresslab/assets/js/index-xxx.js`
- ❌ 不应该是：`/assets/js/index-xxx.js`

### 5. 清除浏览器缓存

1. 按 `Ctrl+Shift+R` (Windows/Linux) 或 `Cmd+Shift+R` (Mac) 强制刷新
2. 或者在开发者工具中右键刷新按钮 → "清空缓存并硬性重新加载"

### 6. 检查实际部署的文件

访问以下 URL 检查文件是否存在：
- `https://fishbookstudio.github.io/progresslab/`
- `https://fishbookstudio.github.io/progresslab/index.html`
- `https://fishbookstudio.github.io/progresslab/assets/js/index-xxx.js`（替换为实际文件名）

### 7. 手动触发重新部署

如果自动部署失败，可以手动触发：

1. 进入 Actions 标签页
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮
4. 选择 main 分支
5. 点击 "Run workflow"

## 🔧 常见问题解决方案

### 问题 1：GitHub Actions 没有运行

**原因：** 工作流文件可能没有正确提交

**解决：**
```bash
# 检查文件是否存在
ls -la .github/workflows/deploy.yml

# 如果不存在，确保文件已提交
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push origin main
```

### 问题 2：构建失败

**检查日志中的错误：**
- Node.js 版本不兼容
- 依赖安装失败
- 构建脚本错误

**解决：**
```bash
# 本地测试构建
npm ci
npm run build:gh-pages

# 如果失败，检查错误信息
```

### 问题 3：路径不正确

**检查 vite.config.ts：**
```typescript
const base = process.env.GITHUB_PAGES === 'true' ? '/progresslab/' : '/';
```

**确认：**
- 仓库名称是 `progresslab`
- 如果不同，需要修改 base 路径

### 问题 4：CDN 资源加载失败

项目依赖外部 CDN：
- Tailwind CSS: `https://cdn.tailwindcss.com`
- React: `https://esm.sh/react@^19.2.3`
- ESM.sh: `https://esm.sh`

**检查：**
1. 打开浏览器网络标签页
2. 查看是否有资源加载失败
3. 检查网络连接

## 📋 检查清单

部署前确认：
- [ ] `vite.config.ts` 中 base 路径正确
- [ ] `package.json` 中有 `build:gh-pages` 脚本
- [ ] `.github/workflows/deploy.yml` 文件存在
- [ ] GitHub Pages 设置中选择 "GitHub Actions"
- [ ] 代码已推送到 main 分支

部署后检查：
- [ ] GitHub Actions 工作流成功运行
- [ ] GitHub Pages 显示已部署
- [ ] 浏览器控制台无错误
- [ ] 资源文件可以正常加载
- [ ] 页面内容正常显示

## 🆘 仍然无法解决？

如果以上方法都无法解决问题，请提供以下信息：

1. **GitHub Actions 日志**（如果有错误）
2. **浏览器控制台错误信息**
3. **网络请求失败详情**（F12 → Network 标签页）
4. **实际访问的 URL**
5. **本地构建是否正常**（`npm run build:gh-pages`）

然后可以：
- 在 GitHub Issues 中提交问题
- 或者联系技术支持
