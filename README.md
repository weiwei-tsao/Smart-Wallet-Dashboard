# Smart Wallet Dashboard

A modern Web3 wallet dashboard built with React, TypeScript, and Vite. Connect your MetaMask wallet to view your balance, transaction history, and token holdings.

## Features

- 🔗 **MetaMask Integration** - Connect and manage your MetaMask wallet
- 💰 **Balance Display** - View your ETH balance and network information
- 📊 **Transaction History** - Browse your transaction history using Etherscan API
- 🪙 **Token Balances** - View all your ERC-20 token holdings
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, responsive design
- ⚡ **Fast Development** - Powered by Vite for lightning-fast builds

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Web3**: Ethers.js
- **API**: Etherscan API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask browser extension
- Etherscan API key (免费)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Smart-Wallet-Dashboard
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# 创建环境变量文件
cp .env.template .env.local
```

4. Add your Etherscan API key to `.env.local`

```bash
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

5. Start the development server

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## 🚀 快速部署

### 一键部署到 Vercel

```bash
npm run deploy:vercel
```

### 一键部署到 Netlify

```bash
npm run deploy:netlify
```

### 手动构建

```bash
npm run build
# 将 dist 文件夹上传到任何静态托管服务
```

### 详细部署指南

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整的部署说明。

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── wallet/         # Wallet-related components
│   ├── transaction/    # Transaction components
│   └── token/          # Token components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API and Web3 services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # App constants
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable                 | Description            | Required |
| ------------------------ | ---------------------- | -------- |
| `VITE_ETHERSCAN_API_KEY` | Your Etherscan API key | Yes      |
| `VITE_APP_NAME`          | Application name       | No       |
| `VITE_APP_VERSION`       | Application version    | No       |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
