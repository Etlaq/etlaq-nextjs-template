import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TEMPLATE NOTE: TypeScript errors are ignored for faster development iteration
  // For production builds, consider enabling: typescript: { ignoreBuildErrors: false }
  // Note: eslint configuration is now managed via eslint.config.js (deprecated in next.config)
  typescript: { ignoreBuildErrors: true },

  // Allow external images from Pexels API
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },

  // CORS headers for development (allows local dev with external tools)
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
