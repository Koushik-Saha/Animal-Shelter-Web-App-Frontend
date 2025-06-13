// Global teardown for Playwright E2E tests

async function globalTeardown() {
  console.log('🎭 Cleaning up after Playwright E2E tests...')
  
  try {
    // Clean up test data if needed
    // You can add API calls here to clean up test data
    
    console.log('✅ E2E test cleanup completed')
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error)
    // Don't throw here as it might mask test failures
  }
}

module.exports = globalTeardown