const NextFederationPlugin = require('@module-federation/nextjs-mf');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          adoption: `adoption@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          medical: `medical@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
          volunteer: `volunteer@http://localhost:3003/_next/static/chunks/remoteEntry.js`,
          donation: `donation@http://localhost:3004/_next/static/chunks/remoteEntry.js`,
          admin: `admin@http://localhost:3005/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.0.0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.0.0',
          },
          '@mui/material': {
            singleton: true,
          },
          '@emotion/react': {
            singleton: true,
          },
          '@emotion/styled': {
            singleton: true,
          },
          'framer-motion': {
            singleton: true,
          },
        },
      })
    );

    return config;
  },
  images: {
    domains: ['localhost', 'example.com'],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = withPWA(nextConfig);