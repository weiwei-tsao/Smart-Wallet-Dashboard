# Smart Wallet Dashboard - 文档索引

## 📚 项目文档概览

本文档索引帮助快速定位所需的技术文档和配置指南。

## 🎯 核心文档

### 1. 项目概述

- **README.md** - 项目主要说明和快速开始
- **SETUP.md** - 详细的环境设置指南
- **TESTING_GUIDE.md** - 测试指南和最佳实践

### 2. 后端 BFF 服务文档

#### 实现文档

- **BACKEND_IMPLEMENTATION.md** - 后端服务完整实现说明
  - 功能概述
  - 技术栈详情
  - API 接口设计
  - Docker 容器化配置
  - 性能优化策略

#### 配置和测试

- **BFF_CONFIGURATION_GUIDE.md** - BFF 配置和测试完整指南
  - Docker 容器启动步骤
  - 环境变量配置
  - API 功能测试
  - 故障排除指南

#### 测试报告

- **BACKEND_TEST_REPORT.md** - 后端服务测试结果报告
  - 功能测试结果
  - 性能测试数据
  - 容器状态验证

### 3. 后端服务目录文档

- **backend/README.md** - 后端服务详细技术文档
  - API 端点说明
  - 开发环境设置
  - Docker 部署指南
  - 架构设计说明

## 🚀 快速开始

### 一键启动脚本

```bash
# 使用快速启动脚本（推荐）
./quick-start.sh
```

### 手动启动步骤

```bash
# 1. 启动 Docker 服务
docker run --name smart-wallet-postgres -e POSTGRES_DB=smart_wallet_dashboard -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
docker run --name smart-wallet-redis -p 6379:6379 -d redis:7

# 2. 启动后端服务
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

## 📋 功能特性

### 已实现功能 ✅

- [x] Express.js + TypeScript 后端框架
- [x] PostgreSQL 数据库 + Prisma ORM
- [x] Redis 缓存层
- [x] Etherscan V2 API 集成
- [x] REST API 接口 (交易、代币、收藏)
- [x] Docker 容器化部署
- [x] 健康检查和监控
- [x] 错误处理和验证
- [x] 速率限制和安全中间件

### API 端点

- `GET /health` - 服务健康状态
- `GET /api/transactions` - 交易列表查询
- `GET /api/tokens` - 代币余额查询
- `POST/GET/PUT/DELETE /api/favorites` - 收藏地址管理

## 🐳 Docker 服务

### 容器配置

- **PostgreSQL**: `smart-wallet-postgres` (端口 5432)
- **Redis**: `smart-wallet-redis` (端口 6379)
- **BFF 服务**: `smart-wallet-bff` (端口 3001)
- **前端应用**: `smart-wallet-web` (端口 3000)

### 管理命令

```bash
# 查看容器状态
docker ps

# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 查看服务日志
docker logs smart-wallet-postgres
docker logs smart-wallet-redis
```

## 🔧 环境配置

### 必需环境变量

```bash
# 后端服务配置
PORT=3001
NODE_ENV=development

# 数据库配置
DATABASE_URL=postgresql://username:password@localhost:5432/smart_wallet_dashboard

# 缓存配置
REDIS_URL=redis://localhost:6379

# Etherscan API
ETHERSCAN_API_KEY=your_actual_api_key_here
ETHERSCAN_BASE_URL=https://api.etherscan.io/v2/api
```

## 🧪 测试指南

### 基础测试

```bash
# 健康检查
curl http://localhost:3001/health

# API 信息
curl http://localhost:3001/

# 收藏地址测试
curl "http://localhost:3001/api/favorites"
```

### 完整测试

```bash
# 运行测试脚本
cd backend
node test-api.js
```

## 📊 项目结构

```
Smart-Wallet-Dashboard/
├── backend/                 # 后端 BFF 服务
│   ├── src/                # 源代码
│   ├── prisma/             # 数据库模式
│   ├── Dockerfile          # Docker 配置
│   └── README.md           # 后端文档
├── docs/                   # 需求文档
├── pages/                  # Next.js 页面
├── src/                    # 前端源代码
├── docker-compose.yml      # Docker Compose 配置
├── quick-start.sh          # 快速启动脚本
└── 文档索引文件...
```

## 🆘 故障排除

### 常见问题

1. **数据库连接失败** - 检查 PostgreSQL 容器状态
2. **Redis 连接失败** - 检查 Redis 容器状态
3. **API 调用失败** - 检查 Etherscan API Key 配置
4. **端口冲突** - 检查端口占用情况

### 获取帮助

- 查看 `BFF_CONFIGURATION_GUIDE.md` 中的故障排除部分
- 检查 `BACKEND_TEST_REPORT.md` 中的测试结果
- 查看容器日志: `docker logs <container-name>`

## 🎉 下一步

1. **前端集成** - 更新前端代码调用 BFF API
2. **生产部署** - 配置生产环境变量
3. **监控设置** - 添加日志和性能监控
4. **安全加固** - 配置 HTTPS 和访问控制

---

**最后更新**: 2025-09-22  
**版本**: v2.0  
**状态**: 后端 BFF 服务开发完成 ✅
