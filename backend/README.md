# Smart Wallet Dashboard BFF

Backend for Frontend (BFF) service for the Smart Wallet Dashboard application.

## Features

- **REST API** for wallet data aggregation
- **Redis Caching** for improved performance
- **PostgreSQL** for data persistence
- **Etherscan V2 API** integration
- **TypeScript** for type safety
- **Docker** support

## API Endpoints

### Transactions
- `GET /api/transactions?address=0x...&page=1&limit=20` - Get transaction list
- `GET /api/transactions/:hash` - Get transaction by hash

### Tokens
- `GET /api/tokens?address=0x...` - Get token balances
- `GET /api/tokens/specific?address=0x...&tokenAddress=0x...` - Get specific token

### Favorites
- `POST /api/favorites` - Create favorite address
- `GET /api/favorites` - Get all favorites
- `GET /api/favorites/:id` - Get favorite by ID
- `PUT /api/favorites/:id` - Update favorite
- `DELETE /api/favorites/:id` - Delete favorite

### Health Check
- `GET /health` - Service health status

## Environment Variables

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Required variables:
- `ETHERSCAN_API_KEY` - Your Etherscan API key
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string

## Development

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

3. Set up database:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Start development server:
```bash
npm run dev
```

## Docker

### Using Docker Compose (Recommended)

From the project root:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
- Redis cache
- BFF service
- Frontend application

### Manual Docker Build

```bash
# Build image
docker build -t smart-wallet-bff .

# Run container
docker run -p 3001:3001 \
  -e ETHERSCAN_API_KEY=your_key \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  smart-wallet-bff
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   BFF Service   │    │   External APIs │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (Etherscan)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │   (Favorites)   │
                       └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │     Redis       │
                       │   (Caching)     │
                       └─────────────────┘
```

## Error Handling

The service includes comprehensive error handling:
- Input validation
- Rate limiting
- Database error handling
- External API error handling
- Graceful shutdown

## Performance

- Redis caching reduces external API calls
- Rate limiting prevents abuse
- Compression reduces response size
- Connection pooling for database
