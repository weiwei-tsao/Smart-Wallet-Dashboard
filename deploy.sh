#!/bin/bash

# Smart Wallet Dashboard 快速部署脚本
# 使用方法: ./deploy.sh [vercel|netlify]

set -e

echo "🚀 Smart Wallet Dashboard 部署脚本"
echo "=================================="

# 检查参数
if [ $# -eq 0 ]; then
    echo "使用方法: ./deploy.sh [vercel|netlify]"
    echo "示例: ./deploy.sh vercel"
    exit 1
fi

PLATFORM=$1

# 检查 Node.js 版本
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请访问 https://nodejs.org 安装 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  警告: Node.js 版本过低 (当前: $(node -v))"
    echo "推荐使用 Node.js 18+"
fi

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo "⚠️  警告: 未找到 .env.local 文件"
    echo "请创建 .env.local 文件并设置 VITE_ETHERSCAN_API_KEY"
    echo ""
    echo "示例内容:"
    echo "VITE_ETHERSCAN_API_KEY=your_api_key_here"
    echo "VITE_DEFAULT_NETWORK=mainnet"
    echo "VITE_APP_ENV=production"
    echo "VITE_DEBUG=false"
    echo ""
    read -p "是否继续部署? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建结果
if [ ! -d "dist" ]; then
    echo "❌ 错误: 构建失败，未生成 dist 目录"
    exit 1
fi

echo "✅ 构建成功!"

# 根据平台执行部署
case $PLATFORM in
    "vercel")
        echo "🚀 部署到 Vercel..."
        
        # 检查 Vercel CLI
        if ! npx vercel --version &> /dev/null; then
            echo "📦 安装 Vercel CLI..."
            npm install -g vercel
        fi
        
        # 登录检查
        if ! npx vercel whoami &> /dev/null; then
            echo "🔐 请先登录 Vercel..."
            npx vercel login
        fi
        
        # 部署
        npx vercel --prod --yes
        
        echo "✅ Vercel 部署完成!"
        echo "💡 记得在 Vercel 控制台设置环境变量 VITE_ETHERSCAN_API_KEY"
        ;;
        
    "netlify")
        echo "🚀 部署到 Netlify..."
        
        # 检查 Netlify CLI
        if ! command -v netlify &> /dev/null; then
            echo "📦 安装 Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        # 登录检查
        if ! netlify status &> /dev/null; then
            echo "🔐 请先登录 Netlify..."
            netlify login
        fi
        
        # 部署
        netlify deploy --prod --dir=dist
        
        echo "✅ Netlify 部署完成!"
        echo "💡 记得在 Netlify 控制台设置环境变量 VITE_ETHERSCAN_API_KEY"
        ;;
        
    *)
        echo "❌ 错误: 不支持的平台 '$PLATFORM'"
        echo "支持的平台: vercel, netlify"
        exit 1
        ;;
esac

echo ""
echo "🎉 部署完成!"
echo "📖 查看完整部署指南: DEPLOYMENT.md"
echo "🔧 故障排除: 检查浏览器控制台和平台日志"
