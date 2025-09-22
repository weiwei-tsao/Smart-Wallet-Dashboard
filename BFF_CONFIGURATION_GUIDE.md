# BFF 后端服务配置和测试指南

## 🎯 概述

本指南详细说明如何配置和测试 Smart Wallet Dashboard 的 BFF (Backend for Frontend) 服务，包括 Docker 容器环境设置、API 配置和完整的功能测试。

## 📋 前置条件

- Docker 已安装并运行
- Node.js 18+ 已安装
- 已获取 Etherscan API Key

## 🐳 第一步：启动 Docker 容器服务

### 1.1 启动 PostgreSQL 和 Redis 容器

```bash
# 启动 PostgreSQL 容器
docker run --name smart-wallet-postgres \
  -e POSTGRES_DB=smart_wallet_dashboard \
  -e POSTGRES_USER=username \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# 启动 Redis 容器
docker run --name smart-wallet-redis \
  -p 6379:6379 \
  -d redis:7
```

### 1.2 验证容器状态

```bash
# 查看运行中的容器
docker ps

# 预期输出应该包含：
# smart-wallet-postgres (postgres:15)
# smart-wallet-redis (redis:7)
```

### 1.3 测试容器连接

```bash
# 测试 PostgreSQL 连接
docker exec -it smart-wallet-postgres psql -U username -d smart_wallet_dashboard -c "SELECT 1;"

# 测试 Redis 连接
docker exec -it smart-wallet-redis redis-cli ping
# 应该返回: PONG
```

## ⚙️ 第二步：配置 BFF 服务

### 2.1 进入后端目录

```bash
cd backend
```

### 2.2 安装依赖

```bash
npm install
```

### 2.3 配置环境变量

编辑 `.env` 文件，确保包含以下配置：

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/smart_wallet_dashboard

# Etherscan API Configuration (重要：需要真实的 API Key)
ETHERSCAN_API_KEY=your_actual_etherscan_api_key_here
ETHERSCAN_BASE_URL=https://api.etherscan.io/v2/api

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 2.4 运行数据库迁移

```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init
```

预期输出：

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "smart_wallet_dashboard", schema "public" at "localhost:5432"

Applying migration `20250922171654_init`
The following migration(s) have been created and applied from new schema changes:
migrations/
  └─ 20250922171654_init/
    └─ migration.sql

Your database is now in sync with your schema.
```

## 🚀 第三步：启动 BFF 服务

### 3.1 启动开发服务器

```bash
npm run dev
```

预期输出：

```
Starting Smart Wallet Dashboard BFF...
✅ Redis connected
✅ Database connected
🚀 Server running on port 3001
📊 Health check: http://localhost:3001/health
🔗 API Base URL: http://localhost:3001/api
```

### 3.2 验证服务启动

在另一个终端中测试服务：

```bash
# 测试健康检查
curl http://localhost:3001/health
```

预期响应：

```json
{
  "status": "ok",
  "timestamp": "2025-09-22T17:19:08.216Z",
  "services": {
    "redis": "healthy",
    "database": "healthy",
    "etherscan": "healthy"
  }
}
```

## 🧪 第四步：API 功能测试

### 4.1 基础 API 测试

```bash
# 测试根端点
curl http://localhost:3001/

# 预期响应：API 信息和服务列表
```

### 4.2 收藏地址功能测试

```bash
# 1. 获取收藏列表（应该为空）
curl "http://localhost:3001/api/favorites"

# 2. 添加收藏地址
curl -X POST "http://localhost:3001/api/favorites" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "alias": "Vitalik Buterin"
  }'

# 3. 再次获取收藏列表（应该包含刚添加的地址）
curl "http://localhost:3001/api/favorites"

# 4. 更新收藏地址
curl -X PUT "http://localhost:3001/api/favorites/{id}" \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "Vitalik - Ethereum Founder"
  }'

# 5. 删除收藏地址
curl -X DELETE "http://localhost:3001/api/favorites/{id}"
```

### 4.3 区块链数据功能测试

```bash
# 测试交易查询（需要有效的 Etherscan API Key）
curl "http://localhost:3001/api/transactions?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&page=1&limit=5"

# 测试代币余额查询
curl "http://localhost:3001/api/tokens?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
```

### 4.4 错误处理测试

```bash
# 测试无效地址
curl "http://localhost:3001/api/transactions?address=invalid_address"

# 测试缺少参数
curl "http://localhost:3001/api/transactions"

# 测试无效的收藏地址格式
curl -X POST "http://localhost:3001/api/favorites" \
  -H "Content-Type: application/json" \
  -d '{"address": "invalid_address", "alias": "Test"}'
```

## 🔍 第五步：完整功能测试脚本

创建一个测试脚本 `test-bff-api.js`：

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function runFullTest() {
  console.log('🧪 开始 BFF API 完整功能测试...\n');

  try {
    // 1. 健康检查
    console.log('1. 测试健康检查...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ 健康状态:', health.data.status);
    console.log('   服务状态:', health.data.services);
    console.log('');

    // 2. 收藏地址 CRUD 测试
    console.log('2. 测试收藏地址功能...');

    // 添加收藏
    const addResponse = await axios.post(`${BASE_URL}/api/favorites`, {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      alias: 'Vitalik Buterin',
    });
    console.log('✅ 添加收藏:', addResponse.data.message);

    // 获取收藏列表
    const listResponse = await axios.get(`${BASE_URL}/api/favorites`);
    console.log('✅ 收藏列表:', listResponse.data.data.length, '个地址');

    // 3. 区块链数据测试
    console.log('3. 测试区块链数据功能...');

    try {
      const txResponse = await axios.get(`${BASE_URL}/api/transactions`, {
        params: {
          address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          page: 1,
          limit: 3,
        },
      });
      console.log(
        '✅ 交易查询:',
        txResponse.data.data?.transactions?.length || 0,
        '笔交易'
      );
    } catch (error) {
      console.log(
        '⚠️  交易查询:',
        error.response?.data?.message || '需要配置 Etherscan API Key'
      );
    }

    try {
      const tokenResponse = await axios.get(`${BASE_URL}/api/tokens`, {
        params: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
      });
      console.log(
        '✅ 代币查询:',
        tokenResponse.data.data?.tokens?.length || 0,
        '个代币'
      );
    } catch (error) {
      console.log(
        '⚠️  代币查询:',
        error.response?.data?.message || '需要配置 Etherscan API Key'
      );
    }

    console.log('\n🎉 所有测试完成！');
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

runFullTest();
```

运行测试脚本：

```bash
# 安装 axios（如果未安装）
npm install axios

# 运行测试
node test-bff-api.js
```

## 🐛 故障排除

### 常见问题及解决方案

#### 1. 数据库连接失败

```bash
# 检查 PostgreSQL 容器状态
docker ps | grep postgres

# 检查容器日志
docker logs smart-wallet-postgres

# 重启容器
docker restart smart-wallet-postgres
```

#### 2. Redis 连接失败

```bash
# 检查 Redis 容器状态
docker ps | grep redis

# 检查容器日志
docker logs smart-wallet-redis

# 重启容器
docker restart smart-wallet-redis
```

#### 3. Etherscan API 错误

- 检查 `.env` 文件中的 `ETHERSCAN_API_KEY` 是否正确
- 验证 API Key 是否有效：访问 https://etherscan.io/apis
- 检查 API 调用限制

#### 4. 端口冲突

```bash
# 检查端口占用
lsof -i :3001
lsof -i :5432
lsof -i :6379

# 停止占用端口的进程
kill -9 <PID>
```

## 📊 性能监控

### 监控命令

```bash
# 查看容器资源使用
docker stats

# 查看后端服务日志
cd backend && npm run dev

# 监控 API 响应时间
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:3001/health"
```

### 创建 curl 格式文件

```bash
cat > curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

## 🎯 下一步

1. **前端集成**: 更新前端代码调用 BFF API
2. **生产部署**: 使用 Docker Compose 部署完整应用
3. **监控设置**: 添加日志监控和性能指标
4. **安全加固**: 配置 HTTPS 和访问控制

## 📝 总结

通过本指南，你应该能够：

- ✅ 成功启动 PostgreSQL 和 Redis Docker 容器
- ✅ 配置并启动 BFF 后端服务
- ✅ 运行完整的 API 功能测试
- ✅ 验证数据持久化和缓存功能
- ✅ 排查常见问题

BFF 服务现在已经完全就绪，可以支持前端应用的所有数据需求！🚀
