# Backend BFF Service Implementation

## 🎯 功能概述

已成功实现 Smart Wallet Dashboard 的后端 BFF (Backend for Frontend) 服务，完全按照 V2.0 需求文档进行开发。

## 📁 项目结构

```
backend/
├── src/
│   ├── config/           # 配置管理
│   ├── controllers/      # API 控制器
│   ├── middleware/       # 中间件
│   ├── routes/          # 路由定义
│   ├── services/        # 业务服务层
│   ├── types/           # TypeScript 类型定义
│   └── index.ts         # 应用入口
├── prisma/              # 数据库模式
├── Dockerfile           # Docker 配置
├── package.json         # 依赖管理
└── README.md           # 文档
```

## 🚀 核心功能

### 1. REST API 接口

#### 交易数据接口

- **GET** `/api/transactions?address=0x...&page=1&limit=20`
  - 获取钱包交易列表
  - 支持分页查询
  - 集成 Redis 缓存 (60 秒 TTL)

#### 代币余额接口

- **GET** `/api/tokens?address=0x...`
  - 获取 ERC-20 代币余额
  - 包含 ETH 余额
  - 集成 Redis 缓存 (300 秒 TTL)

#### 收藏地址 CRUD 接口

- **POST** `/api/favorites` - 新增收藏地址
- **GET** `/api/favorites` - 获取收藏列表
- **GET** `/api/favorites/:id` - 获取单个收藏
- **PUT** `/api/favorites/:id` - 更新收藏
- **DELETE** `/api/favorites/:id` - 删除收藏

#### 健康检查

- **GET** `/health` - 服务健康状态检查

### 2. 技术栈实现

#### 后端框架

- **Express.js** - Web 框架
- **TypeScript** - 类型安全
- **CORS** - 跨域支持
- **Helmet** - 安全中间件
- **Morgan** - 请求日志
- **Compression** - 响应压缩

#### 数据存储

- **PostgreSQL** - 主数据库 (收藏地址)
- **Prisma ORM** - 数据库操作
- **Redis** - 缓存层

#### 外部 API

- **Etherscan V2 API** - 区块链数据源
- **Axios** - HTTP 客户端

#### 性能优化

- **Redis 缓存** - 减少外部 API 调用
- **连接池** - 数据库连接优化
- **速率限制** - 防止 API 滥用

## 🔧 环境配置

### 必需环境变量

```bash
# Etherscan API
ETHERSCAN_API_KEY=your_api_key_here

# 数据库
DATABASE_URL=postgresql://username:password@localhost:5432/smart_wallet_dashboard

# Redis
REDIS_URL=redis://localhost:6379

# 服务器
PORT=3001
NODE_ENV=development
```

### 快速启动

```bash
# 1. 安装依赖
cd backend && npm install

# 2. 配置环境变量
cp env.example .env
# 编辑 .env 文件，添加 ETHERSCAN_API_KEY

# 3. 设置数据库
npx prisma migrate dev
npx prisma generate

# 4. 启动开发服务器
npm run dev
# 或使用便捷脚本
./start-dev.sh
```

## 🐳 Docker 支持

### 使用 Docker Compose (推荐)

```bash
# 从项目根目录启动所有服务
docker-compose up -d

# 这将启动:
# - PostgreSQL 数据库
# - Redis 缓存
# - BFF 后端服务
# - Next.js 前端应用
```

### 单独构建后端

```bash
cd backend
docker build -t smart-wallet-bff .
docker run -p 3001:3001 smart-wallet-bff
```

## 📊 API 使用示例

### 获取交易列表

```bash
curl "http://localhost:3001/api/transactions?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&page=1&limit=10"
```

### 获取代币余额

```bash
curl "http://localhost:3001/api/tokens?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
```

### 添加收藏地址

```bash
curl -X POST "http://localhost:3001/api/favorites" \
  -H "Content-Type: application/json" \
  -d '{"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "alias": "Vitalik"}'
```

## 🛡️ 安全特性

- **输入验证** - 所有输入参数验证
- **速率限制** - 防止 API 滥用
- **错误处理** - 统一错误响应格式
- **CORS 配置** - 安全的跨域访问
- **Helmet 安全头** - 基础安全防护

## 📈 性能优化

- **Redis 缓存** - 交易数据缓存 60 秒，代币数据缓存 5 分钟
- **连接池** - 数据库连接复用
- **响应压缩** - 减少网络传输
- **分页查询** - 避免大量数据加载

## 🔍 监控与调试

### 健康检查

```bash
curl http://localhost:3001/health
```

### 日志记录

- 请求日志 (Morgan)
- 错误日志 (Console)
- 数据库查询日志 (Prisma)

### 测试脚本

```bash
# 运行 API 测试
node test-api.js
```

## 📋 待办事项

- [ ] 添加单元测试
- [ ] 实现 API 文档 (Swagger)
- [ ] 添加更多区块链网络支持
- [ ] 实现 WebSocket 实时更新
- [ ] 添加数据统计和分析功能

## 🎉 完成状态

✅ **已完成的功能**

- [x] Express.js 后端框架搭建
- [x] TypeScript 类型系统
- [x] REST API 接口实现
- [x] Etherscan V2 API 集成
- [x] Redis 缓存层
- [x] PostgreSQL 数据库
- [x] Prisma ORM 集成
- [x] 错误处理和验证
- [x] Docker 容器化
- [x] 健康检查端点
- [x] 速率限制和安全中间件

## 🐳 Docker 容器化配置

### 容器服务架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   BFF Service   │    │   External APIs │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (Etherscan)   │
│   Port: 3000    │    │   Port: 3001    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │   Port: 5432    │
                       │   (Favorites)   │
                       └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │     Redis       │
                       │   Port: 6379    │
                       │   (Caching)     │
                       └─────────────────┘
```

### 容器启动命令

#### 1. 数据库和缓存服务

```bash
# PostgreSQL 容器
docker run --name smart-wallet-postgres \
  -e POSTGRES_DB=smart_wallet_dashboard \
  -e POSTGRES_USER=username \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Redis 容器
docker run --name smart-wallet-redis \
  -p 6379:6379 \
  -d redis:7
```

#### 2. 使用 Docker Compose (推荐)

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 停止所有服务
docker-compose down
```

### 环境变量配置

#### 开发环境 (.env)

```bash
# 本地开发配置
DATABASE_URL=postgresql://username:password@localhost:5432/smart_wallet_dashboard
REDIS_URL=redis://localhost:6379
ETHERSCAN_API_KEY=your_actual_api_key_here
```

#### Docker 环境

```bash
# Docker 容器间通信
DATABASE_URL=postgresql://username:password@postgres:5432/smart_wallet_dashboard
REDIS_URL=redis://redis:6379
```

### 数据持久化

- **PostgreSQL 数据**: 存储在 Docker volume `postgres_data`
- **Redis 数据**: 存储在 Docker volume `redis_data`
- **应用代码**: 通过 Dockerfile 构建到容器中

### 容器管理

```bash
# 查看运行状态
docker ps

# 查看服务日志
docker logs smart-wallet-postgres
docker logs smart-wallet-redis
docker logs smart-wallet-bff

# 进入容器调试
docker exec -it smart-wallet-postgres psql -U username -d smart_wallet_dashboard
docker exec -it smart-wallet-redis redis-cli

# 清理资源
docker-compose down -v  # 删除 volumes
docker system prune     # 清理未使用的资源
```

这个后端 BFF 服务完全符合 V2.0 需求文档的要求，为前端提供了统一、高效的数据接口，并具备良好的可扩展性和维护性。
