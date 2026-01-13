# 生产环境部署指南

## 📦 构建产物

构建完成后，所有生产文件位于 `dist/` 目录：

```
dist/
├── index.html              # 主 HTML 文件（已优化 SEO）
├── assets/
│   └── js/
│       └── [name]-[hash].js  # JavaScript 文件（已压缩和混淆）
├── robots.txt             # 搜索引擎爬虫规则
├── sitemap.xml            # 网站地图
└── site.webmanifest       # PWA 清单文件
```

## 🚀 部署步骤

### 1. 构建项目

```bash
npm run build
```

构建完成后，`dist/` 目录包含所有生产文件。

### 2. 部署到静态托管服务

#### Vercel（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

或者通过 Vercel Dashboard：
1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置输出目录：`dist`
4. 部署

#### Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

或者通过 Netlify Dashboard：
1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`
4. 部署

#### GitHub Pages

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 在 package.json 中添加脚本
# "deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

#### 其他静态托管服务

将 `dist/` 目录的内容上传到任何静态托管服务：
- Cloudflare Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- 阿里云 OSS
- 腾讯云 COS

### 3. 环境变量配置

如果使用环境变量（如 `GEMINI_API_KEY`），需要在部署平台配置：

**Vercel:**
- 项目设置 → Environment Variables

**Netlify:**
- Site settings → Build & deploy → Environment variables

### 4. 域名配置

部署后，更新以下文件中的域名：

1. **index.html** - 所有 URL 引用
2. **sitemap.xml** - 网站地图 URL
3. **robots.txt** - Sitemap URL

或者使用环境变量动态生成。

### 5. 验证部署

部署后检查：

- [ ] 网站可以正常访问
- [ ] 所有资源加载正常（CSS、JS、图片）
- [ ] SEO meta 标签正确显示
- [ ] Open Graph 预览正常（使用 https://www.opengraph.xyz/）
- [ ] 移动端显示正常
- [ ] HTTPS 已启用

## 📊 构建优化说明

### 已应用的优化

1. **代码压缩**
   - 使用 Terser 进行 JavaScript 压缩
   - 移除 console 和 debugger 语句
   - CSS 自动压缩

2. **资源优化**
   - 文件名包含 hash，支持长期缓存
   - 资源文件分类存放（images、fonts、js）

3. **性能优化**
   - 预连接外部资源（preconnect）
   - DNS 预解析（dns-prefetch）
   - 代码分割（CSS code splitting）

### 构建配置

主要配置在 `vite.config.ts`：

```typescript
build: {
  outDir: 'dist',
  sourcemap: false,        // 生产环境不生成 sourcemap
  minify: 'terser',        // 使用 terser 压缩
  terserOptions: {
    compress: {
      drop_console: true,  // 移除 console
      drop_debugger: true, // 移除 debugger
    },
  },
  cssCodeSplit: true,      // CSS 代码分割
}
```

## 🔍 本地预览生产构建

部署前可以在本地预览生产构建：

```bash
npm run preview
```

这将启动一个本地服务器预览 `dist/` 目录的内容。

## 📝 注意事项

1. **CDN 依赖**
   - 项目使用 ESM CDN（importmap）加载 React 等依赖
   - 确保部署环境可以访问 `esm.sh` 和 `cdn.tailwindcss.com`

2. **图片资源**
   - 记得上传 favicon、og-image 等图片到 `public/` 目录
   - 这些文件会自动复制到 `dist/` 目录

3. **HTTPS**
   - 确保生产环境使用 HTTPS
   - 这对 SEO 和安全性都很重要

4. **缓存策略**
   - 静态资源（JS、CSS）使用长期缓存（文件名包含 hash）
   - HTML 文件使用短期缓存或 no-cache

## 🐛 常见问题

### 构建失败

- 检查 Node.js 版本（需要 Node 20.19.0+ 或 22.12.0+）
- 清除 node_modules 和重新安装：`rm -rf node_modules package-lock.json && npm install`

### 部署后资源 404

- 检查构建输出目录是否正确
- 检查服务器配置（如需要配置 SPA 路由重写）

### SEO 标签不生效

- 确保部署的是 `dist/index.html`（不是开发版本）
- 检查 meta 标签是否正确生成

## 📈 性能监控

部署后建议：

1. 使用 Google PageSpeed Insights 测试性能
2. 使用 Lighthouse 检查 SEO、性能、可访问性
3. 在 Google Search Console 提交 sitemap
4. 监控网站加载速度和错误率
