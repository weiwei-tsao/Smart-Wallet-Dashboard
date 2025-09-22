#!/bin/bash

# Smart Wallet Dashboard - 快速启动脚本
# 此脚本将启动所有必要的服务并验证功能

echo "🚀 Smart Wallet Dashboard - 快速启动"
echo "====================================="

# 检查 Docker 是否运行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker 未运行，请先启动 Docker"
    exit 1
fi

echo "✅ Docker 正在运行"

# 1. 启动数据库和缓存服务
echo ""
echo "📊 启动数据库和缓存服务..."

# 检查容器是否已存在
if docker ps -a --format "table {{.Names}}" | grep -q "smart-wallet-postgres"; then
    echo "🔄 重启 PostgreSQL 容器..."
    docker start smart-wallet-postgres
else
    echo "🆕 创建 PostgreSQL 容器..."
    docker run --name smart-wallet-postgres \
      -e POSTGRES_DB=smart_wallet_dashboard \
      -e POSTGRES_USER=username \
      -e POSTGRES_PASSWORD=password \
      -p 5432:5432 \
      -d postgres:15
fi

if docker ps -a --format "table {{.Names}}" | grep -q "smart-wallet-redis"; then
    echo "🔄 重启 Redis 容器..."
    docker start smart-wallet-redis
else
    echo "🆕 创建 Redis 容器..."
    docker run --name smart-wallet-redis \
      -p 6379:6379 \
      -d redis:7
fi

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 验证服务状态
echo ""
echo "🔍 验证服务状态..."
if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "smart-wallet-postgres.*Up"; then
    echo "✅ PostgreSQL 运行正常"
else
    echo "❌ PostgreSQL 启动失败"
    exit 1
fi

if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "smart-wallet-redis.*Up"; then
    echo "✅ Redis 运行正常"
else
    echo "❌ Redis 启动失败"
    exit 1
fi

# 2. 设置后端服务
echo ""
echo "⚙️  设置后端服务..."

cd backend

# 检查环境变量文件
if [ ! -f .env ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env
    echo "⚠️  请编辑 .env 文件并添加 ETHERSCAN_API_KEY"
fi

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
npx prisma generate

# 运行数据库迁移
echo "🗄️  运行数据库迁移..."
npx prisma migrate dev --name init

# 3. 启动后端服务
echo ""
echo "🚀 启动后端服务..."
echo "   服务将在 http://localhost:3001 运行"
echo "   健康检查: http://localhost:3001/health"
echo "   API 文档: http://localhost:3001/"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 启动开发服务器
npm run dev
