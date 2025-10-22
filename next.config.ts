import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TEMPLATE NOTE: These are disabled for faster development iteration
  // For production builds, consider enabling these to catch errors early:
  // eslint: { ignoreDuringBuilds: false },
  // typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

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
