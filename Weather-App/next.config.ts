import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performans optimizasyonları
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
    // Modern browser desteği için ES6+ kullan
    esmExternals: true,
  },
  
  // Modern browser desteği
  compiler: {
    // Modern JavaScript özelliklerini koru
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Resim optimizasyonu
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer için
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Modern browser desteği için ES6+ koru
      config.target = ['web', 'es2020'];
      
      // Tree shaking optimizasyonu
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
      
      // Legacy polyfill'leri kaldır
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/bg-images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
