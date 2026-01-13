# 🔍 页面空白问题详细排查

你已经将 Source 改为 GitHub Actions，但页面仍然空白。按以下步骤排查：

## ✅ 步骤 1：确认 GitHub Actions 已运行

1. **访问 Actions 页面**
   - https://github.com/FishBookStudio/progresslab/actions

2. **检查最新工作流**
   - 应该看到 "Deploy to GitHub Pages" 工作流
   - 点击最新的运行记录

3. **检查状态**
   - ✅ **绿色勾号**：构建和部署成功
   - ❌ **红色叉号**：有错误，点击查看日志
   - ⏳ **黄色圆圈**：正在运行，等待完成

## ✅ 步骤 2：手动触发重新部署

即使 Source 已更改，可能需要手动触发一次：

1. **进入 Actions 页面**
   - https://github.com/FishBookStudio/progresslab/actions

2. **选择工作流**
   - 左侧选择 "Deploy to GitHub Pages"

3. **手动触发**
   - 点击右侧 "Run workflow" 按钮
   - 选择 `main` 分支
   - 点击 "Run workflow"

4. **等待完成**
   - 通常需要 2-5 分钟
   - 等待看到绿色勾号

## ✅ 步骤 3：检查浏览器控制台

这是**最重要**的步骤，可以告诉我们具体问题：

1. **访问网站**
   - https://fishbookstudio.github.io/progresslab/

2. **打开开发者工具**
   - 按 `F12` 或右键 → "检查"
   - Windows/Linux: `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

3. **查看 Console 标签页**
   - 查看是否有红色错误信息
   - **请复制所有错误信息**

4. **查看 Network 标签页**
   - 刷新页面（`F5`）
   - 查看哪些资源加载失败（红色）
   - 特别关注：
     - `index.html` - 应该 200
     - `/progresslab/assets/js/index-xxx.js` - 应该 200
     - `https://cdn.tailwindcss.com` - 应该 200
     - `https://esm.sh/react@^19.2.3` - 应该 200

## 🔧 步骤 4：常见问题及解决方案

### 问题 A：JavaScript 文件 404

**错误信息：**
```
Failed to load resource: the server responded with a status of 404 (Not Found)
/progresslab/assets/js/index-xxx.js
```

**原因：** GitHub Actions 可能没有正确构建或部署

**解决：**
1. 检查 Actions 日志，确认构建成功
2. 手动触发重新部署（步骤 2）
3. 等待 5 分钟后重试

### 问题 B：CORS 错误

**错误信息：**
```
Access to script at 'https://esm.sh/...' from origin 'https://fishbookstudio.github.io' has been blocked by CORS policy
```

**说明：** 这通常**不是问题**，ESM.sh 支持 CORS。检查其他错误。

### 问题 C：模块未找到

**错误信息：**
```
Failed to resolve module specifier "react"
Uncaught TypeError: Failed to resolve module specifier "react"
```

**原因：** importmap 可能有问题，或者浏览器不支持

**解决：**
1. 检查浏览器版本（需要支持 ES Modules）
2. 检查 `index.html` 中的 importmap 是否正确
3. 尝试其他浏览器（Chrome、Firefox、Edge）

### 问题 D：页面加载但内容空白

**现象：** 页面有背景色，但没有内容

**原因：** React 应用可能没有正确挂载

**检查：**
1. 查看 Console，是否有 React 错误
2. 检查 `#root` 元素是否存在
3. 查看 Network，确认所有资源都加载成功

## 🚀 步骤 5：强制清除缓存

有时浏览器缓存会导致问题：

1. **硬刷新**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **清除缓存**
   - 在开发者工具中，右键刷新按钮
   - 选择 "清空缓存并硬性重新加载"

3. **无痕模式测试**
   - 打开无痕/隐私窗口
   - 访问网站测试

## 📋 步骤 6：验证部署文件

检查 GitHub 上实际部署的文件：

1. **访问仓库**
   - https://github.com/FishBookStudio/progresslab

2. **检查 Actions 部署**
   - 进入 Actions 标签页
   - 点击最新的成功部署
   - 查看 "Deploy to GitHub Pages" 步骤
   - 确认部署成功

3. **直接访问文件**
   - 尝试访问：`https://fishbookstudio.github.io/progresslab/index.html`
   - 查看页面源代码（右键 → "查看页面源代码"）
   - 确认 JavaScript 路径是 `/progresslab/assets/js/...`

## 🆘 如果以上都不行

请提供以下信息：

1. **浏览器控制台完整错误信息**（截图或复制文本）
2. **Network 标签页中失败的请求**（截图）
3. **GitHub Actions 最新运行的日志**（如果有错误）
4. **使用的浏览器和版本**

然后我们可以进一步诊断问题。

## 💡 临时解决方案

如果需要快速上线，可以考虑：

1. **使用 Vercel**（推荐，更简单）
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **使用 Netlify**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

这些平台通常比 GitHub Pages 更容易配置和调试。
