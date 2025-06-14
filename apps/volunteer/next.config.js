/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV === 'production',
  
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  env: {
    CUSTOM_KEY: 'volunteer-value',
  },
}

module.exports = nextConfig
