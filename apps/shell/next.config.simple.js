/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Simple configuration without module federation
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  // Disable SWC minification for faster builds in development
  swcMinify: process.env.NODE_ENV === 'production',
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig