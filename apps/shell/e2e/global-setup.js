// Global setup for Playwright E2E tests
const { chromium } = require('@playwright/test')

async function globalSetup() {
  console.log('🎭 Setting up Playwright E2E tests...')
  
  // Launch browser for setup
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  
  try {
    // Set up test environment
    console.log('🌐 Checking application availability...')
    
    // Wait for the app to be available
    await page.goto('http://localhost:7007', { waitUntil: 'networkidle' })
    
    // Verify the app loads correctly
    await page.waitForSelector('h1', { timeout: 10000 })
    
    console.log('✅ Application is ready for E2E testing')
    
    // Set up test data if needed
    // You can add API calls here to seed test data
    
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    throw error
  } finally {
    await context.close()
    await browser.close()
  }
}

module.exports = globalSetup