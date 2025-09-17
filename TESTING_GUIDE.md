# 测试数据获取指南

## 🧪 如何获取测试数据

### ⚠️ 重要提示

**Goerli 测试网已弃用！** 请使用 **Sepolia 测试网** 进行测试。

### 1. 获取测试 ETH

#### 推荐：使用 Sepolia 测试网

1. **切换到 Sepolia 测试网**：

   - 在您的应用中点击网络切换按钮
   - 选择 "Sepolia Testnet"
   - 系统会自动添加网络到 MetaMask

2. **获取测试 ETH**：
   - 访问 [Sepolia 水龙头](https://sepoliafaucet.com/)
   - 输入您的钱包地址
   - 点击 "Send me ETH" 获取 0.1 测试 ETH
   - 等待几分钟到账

#### 其他 Sepolia 水龙头

- **Alchemy 水龙头**：https://sepoliafaucet.com/
- **Chainlink 水龙头**：https://faucets.chain.link/sepolia
- **QuickNode 水龙头**：https://faucet.quicknode.com/ethereum/sepolia

### 2. 创建测试交易

获取测试 ETH 后，您可以：

1. **发送测试交易**：

   - 向另一个地址发送少量测试 ETH
   - 使用测试网上的 DApp 进行交互

2. **接收测试交易**：
   - 让朋友向您的地址发送测试 ETH
   - 使用测试网上的服务

### 3. 使用测试网 DApp

访问一些测试网 DApp 来创建交易：

- **Uniswap V3 (Sepolia)**：https://app.uniswap.org/#/swap
- **1inch (Sepolia)**：https://app.1inch.io/
- **OpenSea (Sepolia)**：https://testnets.opensea.io/

### 4. 网络切换功能

您的应用现在支持一键切换网络：

- **Ethereum Mainnet**：主网，需要真实的 ETH
- **Sepolia Testnet**：测试网，可以获取免费测试 ETH
- **Goerli Testnet**：测试网（如果还支持）

## 🔧 故障排除

### 问题：水龙头不工作

**解决方案：**

1. 确保连接到正确的测试网
2. 检查钱包地址是否正确
3. 尝试不同的水龙头
4. 等待几分钟再试

### 问题：交易不显示

**解决方案：**

1. 确保 API 密钥已配置
2. 检查网络连接
3. 等待区块确认（通常需要几分钟）
4. 刷新页面

### 问题：余额不更新

**解决方案：**

1. 点击刷新按钮
2. 切换网络再切换回来
3. 重新连接钱包

## 📝 测试步骤

1. **连接钱包**到 Sepolia 测试网
2. **获取测试 ETH**（0.1 ETH 足够测试）
3. **发送测试交易**到另一个地址
4. **查看交易历史**是否显示
5. **检查余额**是否正确更新

## 🎯 测试场景

- ✅ 连接/断开钱包
- ✅ 网络切换
- ✅ 余额显示
- ✅ 交易历史
- ✅ 代币余额
- ✅ 错误处理

现在您可以开始测试您的钱包应用了！🎉
