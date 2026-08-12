/** @type {import('next').NextConfig} */

const nextConfig = {
  // JavaScript / JSX only
  pageExtensions: ['js', 'jsx'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
      },
    ],
  },

  // Ignore ESLint errors during production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore TypeScript errors
  // You are using JS/JSX, so this is generally harmless.
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:5000/socket.io/:path*',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/free-exam',
        destination: '/free-exams',
        permanent: true,
      },
      {
        source: '/free-exam/:slug',
        destination: '/free-exams/:slug',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      'bufferutil',
      'utf-8-validate',
    ];

    config.resolve.extensions = [
      '.js',
      '.jsx',
      '.json',
    ];

    return config;
  },
};

export default nextConfig;
