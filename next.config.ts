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
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL for optimized images (in seconds)
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
