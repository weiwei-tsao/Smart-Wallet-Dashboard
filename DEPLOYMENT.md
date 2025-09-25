# 🚀 Smart Wallet Dashboard 部署指南

## 📋 部署方案概述

本项目采用**纯前端部署**方案，使用 Vercel 或 Netlify 作为免费托管平台。

### 🎯 推荐平台

1. **Vercel** (推荐) - 自动部署、全球 CDN、HTTPS
2. **Netlify** (备选) - 拖拽部署、表单处理

## 🔧 部署前准备

### 1. 获取 Etherscan API 密钥

1. 访问 [Etherscan API 页面](https://etherscan.io/apis)
2. 注册免费账户
3. 创建新的 API 密钥
4. 记录 API 密钥备用

### 2. 环境变量配置

创建 `.env.local` 文件（本地开发）：

```bash
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
VITE_DEFAULT_NETWORK=mainnet
VITE_APP_NAME=Smart Wallet Dashboard
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
VITE_DEBUG=true
```

## 🚀 Vercel 部署步骤

### 方法一：通过 Vercel CLI

1. **安装 Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**

   ```bash
   vercel login
   ```

3. **部署项目**

   ```bash
   vercel
   ```

4. **设置环境变量**

   ```bash
   vercel env add VITE_ETHERSCAN_API_KEY
   # 输入你的 Etherscan API 密钥
   ```

5. **重新部署**
   ```bash
   vercel --prod
   ```

### 方法二：通过 Vercel 网站

1. **连接 GitHub**

   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账户登录
   - 点击 "New Project"

2. **导入项目**

   - 选择你的 GitHub 仓库
   - 选择分支（通常是 main 或 master）
   - 框架预设选择 "Vite"

3. **配置环境变量**

   - 在项目设置中添加环境变量：
     - `VITE_ETHERSCAN_API_KEY`: 你的 Etherscan API 密钥
     - `VITE_DEFAULT_NETWORK`: mainnet
     - `VITE_APP_ENV`: production
     - `VITE_DEBUG`: false

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成

## 🌐 Netlify 部署步骤

### 方法一：拖拽部署

1. **构建项目**

   ```bash
   npm run build
   ```

2. **拖拽部署**

   - 访问 [netlify.com](https://netlify.com)
   - 将 `dist` 文件夹拖拽到部署区域

3. **设置环境变量**
   - 在站点设置中添加环境变量
   - 重新部署

### 方法二：Git 集成

1. **连接仓库**

   - 在 Netlify 中连接 GitHub 仓库
   - 设置构建命令：`npm run build`
   - 设置发布目录：`dist`

2. **配置环境变量**
   - 在站点设置中添加环境变量

## 🔍 部署后验证

### 1. 功能测试

- [ ] 页面正常加载
- [ ] MetaMask 连接功能
- [ ] 钱包地址显示
- [ ] ETH 余额显示
- [ ] 交易历史加载
- [ ] 网络切换功能
- [ ] 错误处理

### 2. 性能检查

- [ ] 页面加载速度
- [ ] 移动端适配
- [ ] 控制台无错误
- [ ] 网络请求正常

## 🛠️ 故障排除

### 常见问题

1. **API 密钥未生效**

   - 检查环境变量名称：`VITE_ETHERSCAN_API_KEY`
   - 确保重新部署了项目
   - 检查 API 密钥是否有效

2. **CORS 错误**

   - 确保使用 HTTPS 访问
   - 检查 MetaMask 网络设置

3. **构建失败**
   - 检查 Node.js 版本（推荐 18+）
   - 清除 node_modules 重新安装
   - 检查 TypeScript 错误

### 调试技巧

1. **本地预览生产构建**

   ```bash
   npm run build
   npm run preview
   ```

2. **检查环境变量**
   ```javascript
   console.log(import.meta.env.VITE_ETHERSCAN_API_KEY);
   ```

## 📱 移动端优化

- 确保 MetaMask 移动端支持
- 测试触摸交互
- 检查响应式布局

## 🔒 安全注意事项

- 不要在前端代码中硬编码 API 密钥
- 使用环境变量管理敏感信息
- 定期轮换 API 密钥

## 📊 监控和分析

### 推荐工具

1. **Vercel Analytics** - 性能监控
2. **Google Analytics** - 用户行为分析
3. **Sentry** - 错误监控

## 🎉 部署完成

部署成功后，你将获得：

- 一个可访问的 HTTPS 网址
- 自动的全球 CDN 加速
- 自动的 HTTPS 证书
- 简单的域名管理

## 📞 技术支持

如果遇到问题，可以：

1. 检查本文档的故障排除部分
2. 查看浏览器控制台错误信息
3. 检查 Vercel/Netlify 的部署日志
