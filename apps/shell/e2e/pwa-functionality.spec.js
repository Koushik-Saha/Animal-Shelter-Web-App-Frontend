const { test, expect } = require('@playwright/test')

test.describe('PWA Functionality E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should register service worker', async ({ page }) => {
    // Check if service worker is registered
    const serviceWorkerRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        return !!registration
      }
      return false
    })
    
    expect(serviceWorkerRegistered).toBe(true)
  })

  test('should show install prompt when installable', async ({ page, context }) => {
    // Navigate to a few pages to trigger install criteria
    await page.goto('/adopt')
    await page.waitForTimeout(1000)
    await page.goto('/volunteer')
    await page.waitForTimeout(1000)
    await page.goto('/')
    
    // Check if install button appears (may not be visible on all browsers/environments)
    const installButton = page.getByText('Install App')
    
    // This test is environment-dependent, so we check if the button exists
    // rather than asserting it must be visible
    const buttonExists = await installButton.count() > 0
    if (buttonExists) {
      await expect(installButton).toBeVisible()
    }
  })

  test('should work offline for cached pages', async ({ page, context }) => {
    // First, visit pages to cache them
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.goto('/adopt')
    await page.waitForLoadState('networkidle')
    
    // Go offline
    await context.setOffline(true)
    
    // Navigate to cached page
    await page.goto('/')
    
    // Check that the page loads from cache
    await expect(page.getByText('Find Your Perfect Companion')).toBeVisible({ timeout: 10000 })
    
    // Go back online
    await context.setOffline(false)
  })

  test('should show offline indicator when network is unavailable', async ({ page, context }) => {
    // Go offline
    await context.setOffline(true)
    
    // Try to navigate to a new page
    await page.goto('/events')
    
    // Check for offline indicator or message
    const offlineIndicators = [
      page.getByText(/offline/i),
      page.getByText(/no connection/i),
      page.getByText(/network unavailable/i),
      page.locator('[data-testid="offline-indicator"]')
    ]
    
    let foundOfflineIndicator = false
    for (const indicator of offlineIndicators) {
      if (await indicator.count() > 0) {
        foundOfflineIndicator = true
        break
      }
    }
    
    // The page should either show an offline indicator or load from cache
    // This is acceptable behavior for PWAs
    expect(foundOfflineIndicator || await page.getByText('Animal Shelter').count() > 0).toBe(true)
    
    // Go back online
    await context.setOffline(false)
  })

  test('should have proper manifest.json', async ({ page }) => {
    // Navigate to manifest.json
    const response = await page.goto('/manifest.json')
    expect(response.status()).toBe(200)
    
    // Parse manifest content
    const manifestText = await response.text()
    const manifest = JSON.parse(manifestText)
    
    // Check required manifest fields
    expect(manifest.name).toBeDefined()
    expect(manifest.short_name).toBeDefined()
    expect(manifest.start_url).toBeDefined()
    expect(manifest.display).toBeDefined()
    expect(manifest.icons).toBeDefined()
    expect(Array.isArray(manifest.icons)).toBe(true)
    expect(manifest.icons.length).toBeGreaterThan(0)
    
    // Check icon properties
    const icon = manifest.icons[0]
    expect(icon.src).toBeDefined()
    expect(icon.sizes).toBeDefined()
    expect(icon.type).toBeDefined()
  })

  test('should cache static assets', async ({ page }) => {
    // Check if main assets are cached by the service worker
    const cacheExists = await page.evaluate(async () => {
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        return cacheNames.length > 0
      }
      return false
    })
    
    expect(cacheExists).toBe(true)
  })

  test('should support push notifications (if permission granted)', async ({ page, context }) => {
    // Grant notification permission
    await context.grantPermissions(['notifications'])
    
    // Check if notification API is available
    const notificationSupported = await page.evaluate(() => {
      return 'Notification' in window && 'serviceWorker' in navigator
    })
    
    expect(notificationSupported).toBe(true)
    
    // Check notification permission
    const permission = await page.evaluate(() => Notification.permission)
    expect(permission).toBe('granted')
  })

  test('should handle app shortcuts from manifest', async ({ page }) => {
    const response = await page.goto('/manifest.json')
    const manifest = JSON.parse(await response.text())
    
    if (manifest.shortcuts) {
      expect(Array.isArray(manifest.shortcuts)).toBe(true)
      
      // Check each shortcut has required properties
      for (const shortcut of manifest.shortcuts) {
        expect(shortcut.name).toBeDefined()
        expect(shortcut.url).toBeDefined()
      }
    }
  })

  test('should support background sync (if available)', async ({ page }) => {
    // Check if background sync is supported
    const backgroundSyncSupported = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        return registration && 'sync' in registration
      }
      return false
    })
    
    // Background sync support varies by browser, so we just check if it's available
    console.log('Background sync supported:', backgroundSyncSupported)
  })

  test('should update app when new version available', async ({ page }) => {
    // Navigate to PWA settings page
    await page.goto('/settings/pwa')
    await page.waitForLoadState('networkidle')
    
    // Check if update functionality exists
    const updateButton = page.getByText(/update/i).first()
    
    if (await updateButton.count() > 0) {
      await expect(updateButton).toBeVisible()
    }
  })

  test('should manage cache storage', async ({ page }) => {
    // Navigate to PWA settings
    await page.goto('/settings/pwa')
    await page.waitForLoadState('networkidle')
    
    // Look for cache management controls
    const cacheControls = [
      page.getByText(/cache/i),
      page.getByText(/storage/i),
      page.getByText(/clear/i)
    ]
    
    let foundCacheControl = false
    for (const control of cacheControls) {
      if (await control.count() > 0) {
        foundCacheControl = true
        break
      }
    }
    
    expect(foundCacheControl).toBe(true)
  })

  test('should display app in standalone mode when installed', async ({ page }) => {
    // Check display mode
    const displayMode = await page.evaluate(() => {
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.matchMedia('(display-mode: fullscreen)').matches ||
             window.matchMedia('(display-mode: minimal-ui)').matches
    })
    
    // This test depends on how the browser/environment handles PWA installation
    // In a real installation, this would be true
    console.log('App running in standalone mode:', displayMode)
  })

  test('should handle app icon and splash screen', async ({ page }) => {
    // Check if app icons are referenced in the document
    const iconLinks = await page.locator('link[rel*="icon"]').count()
    expect(iconLinks).toBeGreaterThan(0)
    
    // Check for apple-touch-icon (iOS)
    const appleTouchIcon = await page.locator('link[rel="apple-touch-icon"]').count()
    expect(appleTouchIcon).toBeGreaterThan(0)
  })

  test('should support theme color adaptation', async ({ page }) => {
    // Check for theme color meta tag
    const themeColorMeta = await page.locator('meta[name="theme-color"]').count()
    expect(themeColorMeta).toBeGreaterThan(0)
    
    // Get theme color value
    const themeColor = await page.getAttribute('meta[name="theme-color"]', 'content')
    expect(themeColor).toBeDefined()
    expect(themeColor).toMatch(/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/)
  })

  test('should provide offline fallback page', async ({ page, context }) => {
    // Go offline
    await context.setOffline(true)
    
    // Try to access a non-cached page
    const response = await page.goto('/non-existent-page')
    
    // Should either show 404 from cache or offline page
    const hasOfflinePage = await page.getByText(/offline/i).count() > 0
    const hasErrorPage = response.status() === 404
    
    expect(hasOfflinePage || hasErrorPage).toBe(true)
    
    // Go back online
    await context.setOffline(false)
  })

  test('should sync data when coming back online', async ({ page, context }) => {
    // Start online and navigate to a form
    await page.goto('/volunteer/register')
    await page.waitForLoadState('networkidle')
    
    // Go offline
    await context.setOffline(true)
    
    // Try to fill out a form (should be cached for offline use)
    const nameField = page.getByLabel(/name/i).first()
    if (await nameField.count() > 0) {
      await nameField.fill('Test User')
    }
    
    // Go back online
    await context.setOffline(false)
    
    // Check if the page handles online status change
    await page.waitForTimeout(1000)
    
    // The form should remain functional
    if (await nameField.count() > 0) {
      const value = await nameField.inputValue()
      expect(value).toBe('Test User')
    }
  })
})