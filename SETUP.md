# 设置说明

## 快速开始 (Docker 推荐)

### 1. 环境准备

确保已安装以下软件：

- Docker 和 Docker Compose
- Git

### 2. 克隆项目

```bash
git clone <repository-url>
cd Smart-Wallet-Dashboard
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
# Etherscan V2 API Key (必需)
ETHERSCAN_API_KEY=YourEtherscanV2APIKeyHere

# 数据库配置 (可选，使用默认值)
POSTGRES_DB=smart_wallet_dashboard
POSTGRES_USER=username
POSTGRES_PASSWORD=password

# Redis 配置 (可选，使用默认值)
REDIS_URL=redis://redis:6379

# 应用配置 (可选)
APP_NAME=Smart Wallet Dashboard
APP_VERSION=2.0.0
APP_ENV=development
DEBUG=true
```

### 4. 一键启动

```bash
# 构建并启动所有服务
docker-compose up --build

# 或在后台运行
docker-compose up -d --build
```

### 5. 访问应用

- 前端：http://localhost:3000
- 后端 API：http://localhost:3001/api
- 数据库：localhost:5432
- Redis：localhost:6379

## Etherscan V2 API 配置

本项目已升级到 [Etherscan V2 API](https://docs.etherscan.io/etherscan-v2)，支持使用单个 API 密钥访问 50+ 条链的数据。

### 获取 Etherscan V2 API 密钥

1. 访问 [Etherscan API 页面](https://etherscan.io/apis)
2. 注册免费账户
3. 创建新的 API 密钥
4. 将 API 密钥复制到 `.env.local` 文件中的 `ETHERSCAN_API_KEY`

### V2 API 优势

- ✅ **统一多链支持**：单个 API 密钥支持 50+ 条链
- ✅ **简化配置**：无需为每个链维护不同的 API 密钥
- ✅ **自动链检测**：根据钱包网络自动切换 API 端点
- ✅ **更好的性能**：优化的 API 响应时间和稳定性

### 支持的链

- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111)
- **BSC** (Chain ID: 56)
- **Polygon** (Chain ID: 137)
- **Arbitrum** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Avalanche** (Chain ID: 43114)
- **Base** (Chain ID: 8453)

## 手动开发设置

如果你不想使用 Docker，可以手动设置开发环境：

### 1. 启动数据库服务

```bash
# 只启动 PostgreSQL 和 Redis
docker-compose up postgres redis -d
```

### 2. 设置后端

```bash
cd backend
npm install
npm run dev
```

### 3. 设置前端

```bash
npm install
npm run dev
```

## 测试步骤

1. 确保 MetaMask 已安装并连接到支持的网络
2. 设置好环境变量后启动服务
3. 连接钱包
4. 查看交易历史和代币余额
5. 测试多链切换功能

## 常见问题

### Docker 相关问题

#### 问题：Docker 容器启动失败

**解决方案：**

1. 检查 Docker 和 Docker Compose 是否已安装
2. 确保端口 3000、3001、5432、6379 未被占用
3. 查看容器日志：`docker-compose logs -f [service_name]`
4. 重新构建镜像：`docker-compose up --build --force-recreate`

#### 问题：数据库连接失败

**解决方案：**

1. 确保 PostgreSQL 容器正在运行：`docker-compose ps`
2. 检查数据库连接字符串是否正确
3. 等待数据库完全启动（健康检查通过）
4. 查看数据库日志：`docker-compose logs postgres`

#### 问题：Redis 连接失败

**解决方案：**

1. 确保 Redis 容器正在运行
2. 检查 Redis URL 配置
3. 查看 Redis 日志：`docker-compose logs redis`

### API 相关问题

#### 问题：显示 "Failed to load tokens" 或 "Failed to load transactions"

**解决方案：**

1. 检查是否设置了 `ETHERSCAN_API_KEY`
2. 确认 API 密钥有效
3. 检查网络连接
4. 确认钱包连接到支持的网络
5. 查看后端日志：`docker-compose logs bff`

#### 问题：API 返回 "NOTOK" 错误

**可能原因：**

1. API 密钥未设置或无效
2. 网络不支持 V2 API
3. 请求参数错误

**解决方案：**

1. 确保设置了有效的 Etherscan V2 API 密钥
2. 检查钱包连接的网络是否支持
3. 查看浏览器控制台的详细错误信息
4. 检查后端服务状态

### 前端相关问题

#### 问题：前端无法连接后端

**解决方案：**

1. 确保后端服务正在运行
2. 检查 `NEXT_PUBLIC_API_BASE_URL` 环境变量
3. 确认 CORS 配置正确
4. 查看网络请求是否被阻止

#### 问题：钱包连接失败

**解决方案：**

1. 确保 MetaMask 已安装并解锁
2. 检查网络连接
3. 尝试刷新页面
4. 检查浏览器控制台错误

### 数据相关问题

#### 问题：没有交易数据

**可能原因：**

1. 测试钱包地址没有交易历史
2. 网络不支持（确保连接到支持的链）
3. API 密钥无效
4. 缓存问题

**解决方案：**

1. 使用有交易历史的钱包地址
2. 切换到支持的网络
3. 清除 Redis 缓存：`docker-compose exec redis redis-cli FLUSHALL`
4. 重启服务

#### 问题：代币余额显示为 0

**说明：**
当前版本支持 ERC-20 代币余额显示。如果显示为 0，可能原因：

1. 钱包确实没有代币余额
2. 代币合约地址不在支持列表中
3. API 调用失败

**解决方案：**

1. 检查钱包是否真的有代币
2. 查看后端日志确认 API 调用状态
3. 尝试手动添加代币合约地址

### 环境变量问题

#### 问题：环境变量不生效

**解决方案：**

1. 确保 `.env.local` 文件在项目根目录
2. 重启所有服务：`docker-compose down && docker-compose up --build`
3. 检查变量名是否正确
4. 确认变量值没有多余的空格或引号

### 性能问题

#### 问题：应用运行缓慢

**解决方案：**

1. 检查系统资源使用情况
2. 增加 Docker 内存限制
3. 优化 Redis 缓存配置
4. 检查网络连接速度
