# 设置说明

## Etherscan V2 API 配置

本项目已升级到 [Etherscan V2 API](https://docs.etherscan.io/etherscan-v2)，支持使用单个 API 密钥访问 50+ 条链的数据。

### 1. 创建 .env 文件

在项目根目录创建 `.env` 文件：

```bash
# Etherscan V2 API Key (支持50+条链)
VITE_ETHERSCAN_API_KEY=YourEtherscanV2APIKeyHere

# 默认网络 (mainnet, goerli, sepolia)
VITE_DEFAULT_NETWORK=mainnet

# 开发环境配置
VITE_APP_ENV=development
VITE_DEBUG=true
```

### 2. 获取 Etherscan V2 API 密钥

1. 访问 [Etherscan API 页面](https://etherscan.io/apis)
2. 注册免费账户
3. 创建新的 API 密钥
4. 将 API 密钥复制到 `.env` 文件中的 `VITE_ETHERSCAN_API_KEY`

### 3. V2 API 优势

- ✅ **统一多链支持**：单个 API 密钥支持 50+ 条链
- ✅ **简化配置**：无需为每个链维护不同的 API 密钥
- ✅ **自动链检测**：根据钱包网络自动切换 API 端点

### 4. 支持的链

- **Ethereum Mainnet** (Chain ID: 1)
- **Goerli Testnet** (Chain ID: 5)
- **Sepolia Testnet** (Chain ID: 11155111)
- **BSC** (Chain ID: 56)
- **Polygon** (Chain ID: 137)
- **Arbitrum** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Avalanche** (Chain ID: 43114)

### 5. 测试步骤

1. 确保 MetaMask 已安装并连接到测试网络
2. 设置好环境变量后重启开发服务器
3. 连接钱包
4. 查看交易历史和代币余额

## 常见问题

### 问题：显示 "Failed to load tokens" 或 "Failed to load transactions"

**解决方案：**

1. 检查是否设置了 `VITE_ETHERSCAN_API_KEY`
2. 确认 API 密钥有效
3. 检查网络连接
4. 确认钱包连接到支持的测试网络

### 问题：Ethers.js 格式化错误

**错误信息：**

- `TypeError: invalid unit (argument="unit", value="18", code=INVALID_ARGUMENT)`
- `TypeError: invalid BigNumberish string: Cannot convert 0.0 to a BigInt`

**解决方案：** 已修复 - 确保 `formatUnits` 函数的第二个参数是数字而不是字符串，并添加了输入验证

### 问题：API 返回 "NOTOK" 错误

**可能原因：**

1. API 密钥未设置或无效
2. 网络不支持 V2 API
3. 请求参数错误

**解决方案：**

1. 确保设置了有效的 Etherscan V2 API 密钥
2. 检查钱包连接的网络是否支持
3. 查看浏览器控制台的详细错误信息

### 问题：没有交易数据

**可能原因：**

1. 测试钱包地址没有交易历史
2. 网络不支持（确保连接到支持的链）
3. API 密钥无效

### 问题：代币余额显示为 0

**说明：**
当前版本只显示 ETH 余额。要显示 ERC-20 代币余额，需要：

1. 获取代币合约地址列表
2. 为每个代币调用 `tokenbalance` API
3. 过滤掉余额为 0 的代币

### 问题：环境变量不生效

**解决方案：**

1. 确保 `.env` 文件在项目根目录
2. 重启开发服务器：`npm run dev`
3. 检查变量名是否正确：`VITE_ETHERSCAN_API_KEY`
