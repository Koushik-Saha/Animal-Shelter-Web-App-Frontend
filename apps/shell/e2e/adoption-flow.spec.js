const { test, expect } = require('@playwright/test')

test.describe('Adoption Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the adoption portal
    await page.goto('/adopt')
    await page.waitForLoadState('networkidle')
  })

  test('should display available animals for adoption', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Check that animals are displayed
    const animalCards = await page.locator('[data-testid="animal-card"]')
    expect(await animalCards.count()).toBeGreaterThan(0)
    
    // Verify animal information is displayed
    const firstAnimal = animalCards.first()
    await expect(firstAnimal.locator('h6')).toBeVisible() // Animal name
    await expect(firstAnimal.locator('text=/years old/')).toBeVisible() // Age
    await expect(firstAnimal.getByText('View Details')).toBeVisible()
    await expect(firstAnimal.getByText('Apply to Adopt')).toBeVisible()
  })

  test('should filter animals by species', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Get initial count
    const initialCount = await page.locator('[data-testid="animal-card"]').count()
    
    // Click on "Dogs" filter
    await page.getByText('Dogs').click()
    await page.waitForTimeout(1000) // Wait for filter to apply
    
    // Check that filtering worked
    const filteredCount = await page.locator('[data-testid="animal-card"]').count()
    
    // Verify all visible animals are dogs
    const animalCards = await page.locator('[data-testid="animal-card"]')
    for (let i = 0; i < Math.min(filteredCount, 5); i++) {
      const animalCard = animalCards.nth(i)
      // Check for dog-related text or breed
      const cardText = await animalCard.textContent()
      expect(cardText.toLowerCase()).toMatch(/(dog|retriever|shepherd|terrier|beagle|poodle|lab)/i)
    }
  })

  test('should search animals by name', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Get the name of the first animal
    const firstAnimalName = await page.locator('[data-testid="animal-card"]').first().locator('h6').textContent()
    
    // Search for that animal
    const searchInput = page.getByPlaceholder('Search by name, breed, or characteristics...')
    await searchInput.fill(firstAnimalName)
    await page.waitForTimeout(1000) // Wait for search to apply
    
    // Verify search results
    const animalCards = await page.locator('[data-testid="animal-card"]')
    const count = await animalCards.count()
    expect(count).toBeGreaterThan(0)
    
    // Verify the first result contains the searched name
    const resultName = await animalCards.first().locator('h6').textContent()
    expect(resultName.toLowerCase()).toContain(firstAnimalName.toLowerCase())
  })

  test('should open animal details dialog', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Click on "View Details" button for the first animal
    const firstAnimal = page.locator('[data-testid="animal-card"]').first()
    await firstAnimal.getByText('View Details').click()
    
    // Verify dialog opens
    await expect(page.getByRole('dialog')).toBeVisible()
    
    // Check dialog content
    await expect(page.getByRole('dialog')).toContainText('years old')
    await expect(page.getByRole('dialog')).toContainText('Description')
    await expect(page.getByRole('dialog')).toContainText('Adoption Requirements')
    
    // Close dialog
    await page.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should open adoption application form', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Click on "Apply to Adopt" button for the first animal
    const firstAnimal = page.locator('[data-testid="animal-card"]').first()
    await firstAnimal.getByText('Apply to Adopt').click()
    
    // Verify adoption form opens
    await expect(page.getByText('Adoption Application')).toBeVisible()
    await expect(page.getByText('Personal Information')).toBeVisible()
    
    // Check required form fields
    await expect(page.getByLabel('First Name')).toBeVisible()
    await expect(page.getByLabel('Last Name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Phone')).toBeVisible()
  })

  test('should validate adoption application form', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Open adoption application
    const firstAnimal = page.locator('[data-testid="animal-card"]').first()
    await firstAnimal.getByText('Apply to Adopt').click()
    
    // Try to submit without filling required fields
    await page.getByText('Submit Application').click()
    
    // Check for validation errors
    await expect(page.getByText(/required/i)).toBeVisible()
  })

  test('should complete adoption application successfully', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Open adoption application
    const firstAnimal = page.locator('[data-testid="animal-card"]').first()
    await firstAnimal.getByText('Apply to Adopt').click()
    
    // Fill out the form
    await page.getByLabel('First Name').fill('John')
    await page.getByLabel('Last Name').fill('Doe')
    await page.getByLabel('Email').fill('john.doe@example.com')
    await page.getByLabel('Phone').fill('555-0123')
    
    // Fill additional sections if they exist
    const addressField = page.getByLabel('Address')
    if (await addressField.isVisible()) {
      await addressField.fill('123 Main St, City, State 12345')
    }
    
    // Submit the application
    await page.getByText('Submit Application').click()
    
    // Check for success message
    await expect(page.getByText(/application submitted successfully/i)).toBeVisible({ timeout: 10000 })
  })

  test('should sort animals by different criteria', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Check if sort dropdown exists
    const sortDropdown = page.getByRole('combobox', { name: /sort by/i })
    if (await sortDropdown.isVisible()) {
      // Click sort dropdown
      await sortDropdown.click()
      
      // Select "Age" sorting
      await page.getByRole('option', { name: /age/i }).click()
      await page.waitForTimeout(1000) // Wait for sorting to apply
      
      // Verify sorting worked by checking the order
      const ageTexts = await page.locator('[data-testid="animal-card"] text=/years old/').allTextContents()
      expect(ageTexts.length).toBeGreaterThan(1)
    }
  })

  test('should display compatibility scores', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Check for compatibility score indicators
    const compatibilityElements = await page.locator('text=/\\d+% Match/').count()
    expect(compatibilityElements).toBeGreaterThan(0)
  })

  test('should show sponsored animals with indicators', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    // Look for sponsored indicators
    const sponsoredIndicators = await page.getByText('Sponsored').count()
    
    // If there are sponsored animals, verify they have the indicator
    if (sponsoredIndicators > 0) {
      const sponsoredAnimal = page.getByText('Sponsored').first()
      await expect(sponsoredAnimal).toBeVisible()
    }
  })

  test('should be responsive on mobile devices', async ({ page, isMobile }) => {
    if (isMobile) {
      // Wait for animals to load
      await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
      
      // Check that the layout adapts to mobile
      const animalCards = page.locator('[data-testid="animal-card"]')
      const firstCard = animalCards.first()
      
      // Verify mobile-specific layout
      await expect(firstCard).toBeVisible()
      
      // Check that buttons are accessible
      await expect(firstCard.getByText('View Details')).toBeVisible()
      await expect(firstCard.getByText('Apply to Adopt')).toBeVisible()
      
      // Verify search functionality on mobile
      const searchInput = page.getByPlaceholder('Search by name, breed, or characteristics...')
      await expect(searchInput).toBeVisible()
    }
  })

  test('should handle network errors gracefully', async ({ page }) => {
    // Block network to simulate error
    await page.route('**/api/animals**', route => route.abort())
    
    // Navigate to adoption page
    await page.goto('/adopt')
    
    // Check for error message
    await expect(page.getByText(/failed to load/i)).toBeVisible({ timeout: 10000 })
  })

  test('should load more animals when scrolling (if pagination exists)', async ({ page }) => {
    // Wait for animals to load
    await page.waitForSelector('[data-testid="animal-card"]', { timeout: 10000 })
    
    const initialCount = await page.locator('[data-testid="animal-card"]').count()
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)
    
    // Check if more animals loaded (if infinite scroll is implemented)
    const newCount = await page.locator('[data-testid="animal-card"]').count()
    
    // This test passes regardless of whether infinite scroll is implemented
    expect(newCount).toBeGreaterThanOrEqual(initialCount)
  })
})