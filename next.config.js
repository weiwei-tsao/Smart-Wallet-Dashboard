/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 在构建时进行类型检查
    ignoreBuildErrors: false,
  },
  eslint: {
    // 在构建时进行 ESLint 检查
    ignoreDuringBuilds: false,
  },
  // 配置环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  },
  // 配置重写规则，用于 API 代理
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // 代理到 BFF 服务
      },
    ];
  },
};

module.exports = nextConfig;
