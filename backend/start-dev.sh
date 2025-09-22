#!/bin/bash

# Smart Wallet Dashboard BFF - Development Startup Script

echo "🚀 Starting Smart Wallet Dashboard BFF Development Environment"
echo "=============================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file and add your ETHERSCAN_API_KEY"
    echo "   You can get a free API key from: https://etherscan.io/apis"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check if database is accessible
echo "🗄️  Checking database connection..."
if ! npx prisma db push --accept-data-loss 2>/dev/null; then
    echo "❌ Database connection failed. Please check your DATABASE_URL in .env"
    echo "   For local development, you can use Docker:"
    echo "   docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=smart_wallet_dashboard -p 5432:5432 -d postgres:15"
    exit 1
fi

echo "✅ Database connection successful"

# Check if Redis is accessible
echo "🔴 Checking Redis connection..."
if ! redis-cli ping 2>/dev/null | grep -q "PONG"; then
    echo "❌ Redis connection failed. Please start Redis server:"
    echo "   For macOS: brew services start redis"
    echo "   For Docker: docker run --name redis -p 6379:6379 -d redis:7"
    exit 1
fi

echo "✅ Redis connection successful"

# Start the development server
echo "🎯 Starting development server..."
echo "   API will be available at: http://localhost:3001"
echo "   Health check: http://localhost:3001/health"
echo "   API docs: http://localhost:3001/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
