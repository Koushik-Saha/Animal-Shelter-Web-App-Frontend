const NextFederationPlugin = require('@module-federation/nextjs-mf');

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
        name: 'adoption',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './AdoptionBrowser': './src/components/AdoptionBrowser',
          './MatchingWizard': './src/components/MatchingWizard',
          './ApplicationForm': './src/components/ApplicationForm',
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

module.exports = nextConfig;