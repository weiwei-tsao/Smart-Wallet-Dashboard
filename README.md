# Smart Wallet Dashboard v2.0

A modern Web3 wallet dashboard built with Next.js, React, and TypeScript. Connect your MetaMask wallet to view your balance, transaction history, and token holdings with server-side rendering support.

## Features

- 🔗 **MetaMask Integration** - Connect and manage your MetaMask wallet
- 💰 **Balance Display** - View your ETH balance and network information
- 📊 **Transaction History** - Browse your transaction history using Etherscan API
- 🪙 **Token Balances** - View all your ERC-20 token holdings
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, responsive design
- ⚡ **SSR/ISR Support** - Server-side rendering and incremental static generation
- 🚀 **Dynamic Routes** - View any wallet address via `/address/[id]` route
- 🔄 **Redux Integration** - State management with Redux Toolkit and Next.js

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + next-redux-wrapper
- **Web3**: Ethers.js
- **API**: Etherscan API (via BFF service)
- **Rendering**: SSR (Server-Side Rendering) + ISR (Incremental Static Generation)

## SSR vs ISR Comparison

This project supports both Server-Side Rendering (SSR) and Incremental Static Generation (ISR) for optimal performance and SEO.

| Feature            | **SSR (getServerSideProps)**                | **ISR (getStaticProps + revalidate)**          |
| ------------------ | ------------------------------------------- | ---------------------------------------------- |
| **Data Freshness** | Always fresh data on each request           | Periodic updates (e.g., every 60 seconds)      |
| **Build Time**     | Builds once, pages generated at runtime     | Pages pre-generated at build time or on-demand |
| **Server Load**    | Higher load (computation on each request)   | Significantly reduced load (cached pages)      |
| **Best Use Case**  | Real-time data, user dashboards, live feeds | Blog posts, product listings, wallet rankings  |
| **SEO**            | Excellent (always fresh content)            | Excellent (pre-generated content)              |
| **Performance**    | Good (server-side processing)               | Excellent (cached static content)              |

### Implementation

- **SSR**: Used in `/address/[id]` route for real-time wallet data
- **ISR**: Available as alternative (commented in code) for high-traffic scenarios
- **Hybrid**: Can switch between SSR and ISR based on requirements

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- MetaMask browser extension

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
# Copy the example environment file
cp .env.example .env.local
```

4. Add your configuration to `.env.local`

```bash
# Etherscan API Key
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# BFF Service URL (for SSR data fetching)
BFF_BASE_URL=http://localhost:3001

# App Configuration (optional)
APP_NAME=Smart Wallet Dashboard
APP_VERSION=2.0.0
APP_ENV=development
DEBUG=true

# Network Configuration (optional)
DEFAULT_NETWORK=mainnet
SUPPORTED_NETWORKS=mainnet,goerli,sepolia
```

5. Start the development server

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

### Available Routes

- `/` - Home page with wallet connection
- `/address/[id]` - Dynamic route for any wallet address (SSR enabled)

## Project Structure

```
├── pages/              # Next.js pages (routing)
│   ├── _app.tsx       # Global app configuration
│   ├── _document.tsx  # HTML document structure
│   ├── index.tsx      # Home page
│   └── address/       # Dynamic routes
│       └── [id].tsx   # Wallet address page (SSR)
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Basic UI components
│   │   ├── transaction/ # Transaction components
│   │   └── token/     # Token components
│   ├── pages/         # Page components (shared)
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and Web3 services
│   ├── store/         # Redux store and slices
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── constants/     # App constants
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

| Variable             | Description                          | Required      | Default                |
| -------------------- | ------------------------------------ | ------------- | ---------------------- |
| `ETHERSCAN_API_KEY`  | Your Etherscan API key               | Yes           | -                      |
| `BFF_BASE_URL`       | Backend for Frontend service URL     | Yes (for SSR) | http://localhost:3001  |
| `APP_NAME`           | Application name                     | No            | Smart Wallet Dashboard |
| `APP_VERSION`        | Application version                  | No            | 2.0.0                  |
| `APP_ENV`            | Application environment              | No            | development            |
| `DEBUG`              | Enable debug mode                    | No            | true                   |
| `DEFAULT_NETWORK`    | Default network                      | No            | mainnet                |
| `SUPPORTED_NETWORKS` | Supported networks (comma-separated) | No            | mainnet,goerli,sepolia |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
