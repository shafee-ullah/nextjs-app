/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  // Enable server components by default
  experimental: {
    serverComponents: true,
  },
};

export default nextConfig;
