#!/bin/bash

echo "🔍 GitHub Pages 部署检查工具"
echo "================================"
echo ""

# 检查仓库名称
REPO_NAME=$(basename -s .git $(git remote get-url origin 2>/dev/null) 2>/dev/null || echo "progresslab")
echo "📦 仓库名称: $REPO_NAME"
echo "🌐 预期 URL: https://fishbookstudio.github.io/$REPO_NAME/"
echo ""

# 检查构建配置
echo "📋 检查构建配置..."
if grep -q "GITHUB_PAGES.*true" package.json; then
    echo "✅ build:gh-pages 脚本存在"
else
    echo "❌ build:gh-pages 脚本不存在"
fi

if grep -q "progresslab" vite.config.ts; then
    echo "✅ vite.config.ts 包含 progresslab base 路径"
else
    echo "❌ vite.config.ts base 路径可能不正确"
fi

# 检查工作流文件
echo ""
echo "📋 检查 GitHub Actions 工作流..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ deploy.yml 工作流文件存在"
    if grep -q "build:gh-pages" .github/workflows/deploy.yml; then
        echo "✅ 工作流使用正确的构建命令"
    else
        echo "❌ 工作流可能使用了错误的构建命令"
    fi
else
    echo "❌ deploy.yml 工作流文件不存在"
fi

# 检查本地构建
echo ""
echo "📋 检查本地构建..."
if [ -d "dist" ]; then
    echo "✅ dist 目录存在"
    if [ -f "dist/index.html" ]; then
        echo "✅ dist/index.html 存在"
        # 检查路径
        if grep -q "/progresslab/assets" dist/index.html; then
            echo "✅ 构建产物包含正确的 base 路径"
        else
            echo "⚠️  构建产物可能没有正确的 base 路径"
            echo "   运行: npm run build:gh-pages"
        fi
    else
        echo "❌ dist/index.html 不存在"
    fi
else
    echo "⚠️  dist 目录不存在，运行: npm run build:gh-pages"
fi

echo ""
echo "📋 下一步操作："
echo "1. 检查 GitHub Actions: https://github.com/FishBookStudio/$REPO_NAME/actions"
echo "2. 检查 GitHub Pages 设置: https://github.com/FishBookStudio/$REPO_NAME/settings/pages"
echo "3. 访问网站: https://fishbookstudio.github.io/$REPO_NAME/"
echo ""
echo "如果页面空白，请："
echo "- 打开浏览器开发者工具 (F12)"
echo "- 查看 Console 标签页的错误信息"
echo "- 查看 Network 标签页，检查资源是否加载失败"
