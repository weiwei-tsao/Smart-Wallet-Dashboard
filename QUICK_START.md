# ⚡ 快速开始指南

## 🎯 5 分钟部署到免费服务器

### 第一步：获取 API 密钥 (2 分钟)

1. 访问 [Etherscan API](https://etherscan.io/apis)
2. 注册免费账户
3. 创建 API 密钥
4. 复制 API 密钥备用

### 第二步：准备项目 (1 分钟)

```bash
# 克隆项目
git clone <your-repo-url>
cd Smart-Wallet-Dashboard

# 安装依赖
npm install

# 创建环境变量文件
echo "VITE_ETHERSCAN_API_KEY=your_api_key_here" > .env.local
```

### 第三步：一键部署 (2 分钟)

#### 选择 Vercel (推荐)

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录并部署
vercel login
vercel

# 设置环境变量
vercel env add VITE_ETHERSCAN_API_KEY
# 输入你的 API 密钥

# 重新部署
vercel --prod
```

#### 选择 Netlify

```bash
# 构建项目
npm run build

# 安装 Netlify CLI
npm install -g netlify-cli

# 登录并部署
netlify login
netlify deploy --prod --dir=dist
```

### 第四步：验证部署 ✅

1. 访问部署的网址
2. 连接 MetaMask 钱包
3. 查看钱包余额和交易历史
4. 测试网络切换功能

## 🚀 更简单的部署方式

### 使用脚本一键部署

```bash
# 部署到 Vercel
npm run deploy:vercel

# 部署到 Netlify
npm run deploy:netlify
```

### 手动上传 (无需 CLI)

1. 运行 `npm run build`
2. 将 `dist` 文件夹拖拽到 [Netlify Drop](https://app.netlify.com/drop)
3. 在站点设置中添加环境变量

## 🔧 故障排除

### 常见问题

**Q: 显示 "API key not configured" 错误**
A: 确保在部署平台设置了 `VITE_ETHERSCAN_API_KEY` 环境变量

**Q: MetaMask 连接失败**
A: 确保网站使用 HTTPS 协议访问

**Q: 构建失败**
A: 检查 Node.js 版本是否为 18+，运行 `node -v` 查看

### 获取帮助

- 查看完整文档: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 检查浏览器控制台错误信息
- 查看部署平台的构建日志

## 🎉 部署完成！

恭喜！你的 Web3 钱包仪表板已经成功部署到免费服务器。

**下一步：**

- 分享你的项目链接
- 添加到简历作品集
- 继续开发新功能

**项目特色：**

- ✅ 现代 React + TypeScript 技术栈
- ✅ 响应式设计，支持移动端
- ✅ MetaMask 钱包集成
- ✅ 多链支持 (Ethereum, BSC, Polygon 等)
- ✅ 实时交易历史查询
- ✅ 代币余额显示
