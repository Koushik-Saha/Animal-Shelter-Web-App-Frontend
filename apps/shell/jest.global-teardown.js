// Global teardown for Jest testing environment
// This file runs once after all test suites

module.exports = async () => {
  // Clean up any global resources
  
  // Clear all timers
  jest.clearAllTimers()
  
  // Reset environment variables
  delete process.env.TZ
  delete process.env.NEXT_PUBLIC_API_URL
  delete process.env.NEXT_PUBLIC_WS_URL
  
  console.log('🧪 Jest global teardown completed')
}