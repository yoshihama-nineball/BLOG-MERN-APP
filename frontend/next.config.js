/** @type {import('next').NextConfig} */
const nextConfig = {
  // ホットリロードを確実にするための設定
  webpack: (config, { dev }) => {
    if (dev) {
      // ファイル監視の設定を最適化
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules|\.next/,
      }
    }
    return config
  },

  // 開発サーバーの設定
  experimental: {
    // ファイルベースのルーティングを最適化
    fileBasedRoutingWarning: 'off',
    serverComponentsExternalPackages: ['@hookform/resolvers', 'zod'],
  },

  // ビルド時の設定
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLintの設定
  eslint: {
    ignoreDuringBuilds: true,
  },

  // React Strict Modeを有効化
  reactStrictMode: true,
}

module.exports = nextConfig
