// Configuration utilities for the Animal Shelter Management System

module.exports = {
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
  wsUrl: process.env.WS_URL || 'ws://localhost:3001',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  features: {
    web3: true,
    pwa: true,
    analytics: true,
  }
}