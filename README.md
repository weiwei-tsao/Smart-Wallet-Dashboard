# Smart Wallet Dashboard v2.0

A modern Web3 wallet dashboard built with Next.js, React, and TypeScript. Connect your MetaMask wallet to view your balance, transaction history, and token holdings across multiple blockchain networks with full containerized deployment support.

## Features

- 🔗 **MetaMask Integration** - Connect and manage your MetaMask wallet
- 💰 **Multi-Chain Support** - View balances across Ethereum, Polygon, BSC, Arbitrum, and Optimism
- 📊 **Transaction History** - Browse your transaction history using Etherscan V2 API
- 🪙 **Token Balances** - View all your ERC-20 token holdings with real-time data
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, responsive design
- ⚡ **SSR/ISR Support** - Server-side rendering and incremental static generation
- 🚀 **Dynamic Routes** - View any wallet address via `/address/[id]` route
- 🔄 **Redux Integration** - State management with Redux Toolkit and Next.js
- 🐳 **Docker Ready** - Full containerized deployment with Docker Compose
- 🚀 **BFF Architecture** - Backend for Frontend service with caching and data aggregation

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + next-redux-wrapper
- **Web3**: Ethers.js
- **API**: Etherscan V2 API (multi-chain support)
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Deployment**: Docker + Docker Compose
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

- Docker and Docker Compose
- MetaMask browser extension
- Etherscan API key (get one at [etherscan.io](https://etherscan.io/apis))

### Quick Start with Docker (Recommended)

1. Clone the repository

```bash
git clone <repository-url>
cd Smart-Wallet-Dashboard
```

2. Set up environment variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

3. Add your configuration to `.env.local`

```bash
# Etherscan API Key (required)
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Database Configuration (optional - defaults provided)
POSTGRES_DB=smart_wallet_dashboard
POSTGRES_USER=username
POSTGRES_PASSWORD=password

# Redis Configuration (optional - defaults provided)
REDIS_URL=redis://redis:6379

# App Configuration (optional)
APP_NAME=Smart Wallet Dashboard
APP_VERSION=2.0.0
APP_ENV=development
DEBUG=true
```

4. Start all services with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

5. Open your browser and navigate to `http://localhost:3000`

### Manual Development Setup

If you prefer to run services individually:

1. Start the database and cache services

```bash
# Start PostgreSQL and Redis
docker-compose up postgres redis -d
```

2. Install and start the backend

```bash
cd backend
npm install
npm run dev
```

3. Install and start the frontend

```bash
npm install
npm run dev
```

### Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

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
├── src/               # Frontend source code
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
├── backend/           # Backend BFF service
│   ├── src/           # TypeScript source code
│   │   ├── controllers/ # API controllers
│   │   ├── services/  # Business logic services
│   │   ├── routes/    # API routes
│   │   ├── middleware/ # Express middleware
│   │   ├── types/     # TypeScript types
│   │   └── config/    # Configuration files
│   ├── prisma/        # Database schema and migrations
│   ├── Dockerfile     # Backend container configuration
│   └── package.json   # Backend dependencies
├── docker-compose.yml # Multi-service orchestration
├── Dockerfile         # Frontend container configuration
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Available Scripts

### Frontend Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Backend Scripts

- `cd backend && npm run dev` - Start backend development server
- `cd backend && npm run build` - Build backend for production
- `cd backend && npm run start` - Start backend production server
- `cd backend && npm run lint` - Run backend ESLint
- `cd backend && npm run type-check` - Run backend TypeScript type checking

### Docker Scripts

- `docker-compose up --build` - Build and start all services
- `docker-compose up -d` - Start all services in detached mode
- `docker-compose down` - Stop all services
- `docker-compose logs -f` - View logs from all services
- `docker-compose logs -f [service]` - View logs from specific service

## Environment Variables

### Frontend (.env.local)

| Variable                   | Description             | Required | Default                   |
| -------------------------- | ----------------------- | -------- | ------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL    | Yes      | http://localhost:3001/api |
| `APP_NAME`                 | Application name        | No       | Smart Wallet Dashboard    |
| `APP_VERSION`              | Application version     | No       | 2.0.0                     |
| `APP_ENV`                  | Application environment | No       | development               |
| `DEBUG`                    | Enable debug mode       | No       | true                      |

### Backend (.env)

| Variable             | Description                  | Required | Default                                                             |
| -------------------- | ---------------------------- | -------- | ------------------------------------------------------------------- |
| `ETHERSCAN_API_KEY`  | Your Etherscan API key       | Yes      | -                                                                   |
| `ETHERSCAN_BASE_URL` | Etherscan V2 API base URL    | No       | https://api.etherscan.io/v2/api                                     |
| `DATABASE_URL`       | PostgreSQL connection string | Yes      | postgresql://username:password@postgres:5432/smart_wallet_dashboard |
| `REDIS_URL`          | Redis connection string      | Yes      | redis://redis:6379                                                  |
| `PORT`               | Backend server port          | No       | 3001                                                                |
| `CORS_ORIGIN`        | Allowed CORS origins         | No       | http://localhost:3000                                               |
| `NODE_ENV`           | Node environment             | No       | development                                                         |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
