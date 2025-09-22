#!/bin/bash

# CI/CD 测试脚本
# 用于本地测试CI/CD流程

set -e

echo "🚀 开始CI/CD测试流程..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查依赖..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose 未安装"
        exit 1
    fi
    
    log_info "所有依赖检查通过 ✅"
}

# 前端检查
test_frontend() {
    log_info "开始前端检查..."
    
    # 安装依赖
    log_info "安装前端依赖..."
    npm ci
    
    # ESLint检查
    log_info "运行ESLint..."
    npm run lint
    
    # TypeScript类型检查
    log_info "运行TypeScript类型检查..."
    npm run type-check
    
    # 构建测试
    log_info "构建前端应用..."
    npm run build
    
    log_info "前端检查完成 ✅"
}

# 后端检查
test_backend() {
    log_info "开始后端检查..."
    
    cd backend
    
    # 安装依赖
    log_info "安装后端依赖..."
    npm ci
    
    # ESLint检查
    log_info "运行后端ESLint..."
    npm run lint
    
    # TypeScript类型检查
    log_info "运行后端TypeScript类型检查..."
    npm run type-check
    
    # 构建测试
    log_info "构建后端应用..."
    npm run build
    
    cd ..
    log_info "后端检查完成 ✅"
}

# Docker构建测试
test_docker_build() {
    log_info "开始Docker构建测试..."
    
    # 构建前端镜像
    log_info "构建前端Docker镜像..."
    docker build -t smart-wallet-dashboard-frontend:test .
    
    # 构建后端镜像
    log_info "构建后端Docker镜像..."
    docker build -t smart-wallet-dashboard-backend:test ./backend
    
    log_info "Docker构建测试完成 ✅"
}

# 数据库测试
test_database() {
    log_info "开始数据库测试..."
    
    # 启动测试数据库
    log_info "启动测试数据库..."
    docker-compose -f docker-compose.test.yml up postgres-test redis-test -d
    
    # 等待数据库启动
    log_info "等待数据库启动..."
    sleep 10
    
    # 运行数据库迁移
    log_info "运行数据库迁移..."
    cd backend
    DATABASE_URL="postgresql://test_user:test_password@localhost:5433/smart_wallet_dashboard_test" npx prisma migrate deploy
    cd ..
    
    # 测试数据库连接
    log_info "测试数据库连接..."
    cd backend
    node -e "
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient({
      datasources: { db: { url: 'postgresql://test_user:test_password@localhost:5433/smart_wallet_dashboard_test' } }
    });
    prisma.\$connect().then(() => {
      console.log('数据库连接成功');
      process.exit(0);
    }).catch((err) => {
      console.error('数据库连接失败:', err);
      process.exit(1);
    });
    "
    cd ..
    
    log_info "数据库测试完成 ✅"
}

# Docker集成测试
test_docker_integration() {
    log_info "开始Docker集成测试..."
    
    # 启动所有服务
    log_info "启动所有服务..."
    docker-compose -f docker-compose.test.yml up -d --build
    
    # 等待服务启动
    log_info "等待服务启动..."
    sleep 30
    
    # 测试服务健康状态
    log_info "测试服务健康状态..."
    
    # 测试前端
    if curl -f http://localhost:3003 > /dev/null 2>&1; then
        log_info "前端服务健康 ✅"
    else
        log_error "前端服务不健康 ❌"
        exit 1
    fi
    
    # 测试后端
    if curl -f http://localhost:3002/health > /dev/null 2>&1; then
        log_info "后端服务健康 ✅"
    else
        log_error "后端服务不健康 ❌"
        exit 1
    fi
    
    # 测试API端点
    if curl -f http://localhost:3002/api/favorites > /dev/null 2>&1; then
        log_info "API端点正常 ✅"
    else
        log_warn "API端点测试失败，但继续执行"
    fi
    
    log_info "Docker集成测试完成 ✅"
}

# 清理函数
cleanup() {
    log_info "清理测试环境..."
    docker-compose -f docker-compose.test.yml down -v
    docker rmi smart-wallet-dashboard-frontend:test smart-wallet-dashboard-backend:test 2>/dev/null || true
    log_info "清理完成 ✅"
}

# 主函数
main() {
    log_info "开始CI/CD测试流程..."
    
    # 设置清理陷阱
    trap cleanup EXIT
    
    # 执行测试步骤
    check_dependencies
    test_frontend
    test_backend
    test_docker_build
    test_database
    test_docker_integration
    
    log_info "🎉 所有CI/CD测试通过！"
}

# 运行主函数
main "$@"
