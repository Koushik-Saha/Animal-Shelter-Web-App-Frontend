/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV === 'production',
  
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  // Simplified configuration without module federation
  env: {
    CUSTOM_KEY: 'adoption-value',
  },
}

module.exports = nextConfig