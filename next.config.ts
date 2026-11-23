import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Doğrulama build'lerini çalışan dev sunucunun .next klasöründen ayırmak için
  distDir: process.env.NEXT_DIST_DIR || '.next',

  experimental: {
    // Tailwind CSS'i HTML'e gömer: render-blocking CSS isteğini ortadan kaldırır
    inlineCss: true,
  },

  // Production'da console çağrılarını temizle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Compression
  compress: true,
  
  // Headers for caching
  async headers() {
    return [
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
