import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from your domain and external sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.spotify.com',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      // Add other domains as needed
    ],
    // Optimize images by default
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
