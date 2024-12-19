import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cinema-images.pawelkrml.com',
      },
    ],
  },
};

export default nextConfig;
