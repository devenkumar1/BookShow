/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'c7.alamy.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
    ],
  },
};

export default nextConfig;