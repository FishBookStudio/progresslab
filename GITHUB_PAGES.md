# GitHub Pages 部署指南

## 🚀 自动部署（推荐）

项目已配置 GitHub Actions 自动部署，当你推送代码到 `main` 分支时，会自动构建并部署到 GitHub Pages。

### 设置步骤：

1. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

2. **推送代码**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **查看部署状态**
   - 在仓库的 Actions 标签页查看部署进度
   - 部署完成后，访问：`https://fishbookstudio.github.io/progresslab/`

## 📦 手动部署

如果需要手动部署：

### 方法 1：使用 gh-pages 包

1. **安装 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **添加部署脚本到 package.json**
   ```json
   "scripts": {
     "deploy": "npm run build:gh-pages && gh-pages -d dist"
   }
   ```

3. **执行部署**
   ```bash
   npm run deploy
   ```

### 方法 2：手动构建和推送

1. **构建项目**
   ```bash
   npm run build:gh-pages
   ```

2. **切换到 gh-pages 分支并推送**
   ```bash
   git checkout -b gh-pages
   git add dist
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

## ⚙️ 配置说明

### Base 路径配置

项目已配置为 GitHub Pages 子路径部署：
- 仓库名称：`progresslab`
- Base 路径：`/progresslab/`

如果仓库名称不同，需要修改 `vite.config.ts` 中的 base 配置：

```typescript
const base = process.env.GITHUB_PAGES === 'true' ? '/your-repo-name/' : '/';
```

### 使用自定义域名

如果使用自定义域名，需要：

1. **修改 vite.config.ts**
   ```typescript
   const base = '/'; // 使用根路径
   ```

2. **创建 CNAME 文件**
   在 `public/` 目录创建 `CNAME` 文件，内容为你的域名：
   ```
   yourdomain.com
   ```

3. **在 GitHub Pages 设置中添加自定义域名**

## 🔍 故障排查

### 问题：页面空白

**原因**：资源路径不正确

**解决**：
- 确保使用 `npm run build:gh-pages` 构建（不是 `npm run build`）
- 检查浏览器控制台的错误信息
- 确认 GitHub Pages 设置中 Source 选择正确

### 问题：样式丢失

**原因**：CSS 文件路径错误

**解决**：
- 检查构建后的 HTML 中的 CSS 链接路径
- 确保 base 路径配置正确

### 问题：404 错误

**原因**：GitHub Pages 不支持客户端路由

**解决**：
- 本项目是单页应用，所有路由都会指向 index.html
- 如果遇到 404，检查 GitHub Pages 设置

## 📝 注意事项

1. **构建命令**：始终使用 `npm run build:gh-pages` 而不是 `npm run build`
2. **Base 路径**：GitHub Pages 部署在子路径下，必须设置正确的 base
3. **自动部署**：GitHub Actions 会自动处理构建和部署
4. **更新部署**：每次推送代码到 main 分支都会自动重新部署

## 🔗 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
