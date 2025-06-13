// Global setup for Jest testing environment
// This file runs once before all test suites

module.exports = async () => {
  // Set timezone to UTC for consistent date testing
  process.env.TZ = 'UTC'
  
  // Increase timeout for CI environments
  if (process.env.CI) {
    jest.setTimeout(30000)
  }
  
  // Mock environment variables for testing
  process.env.NODE_ENV = 'test'
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001'
  process.env.NEXT_PUBLIC_WS_URL = 'ws://localhost:3001'
  
  console.log('🧪 Jest global setup completed')
}