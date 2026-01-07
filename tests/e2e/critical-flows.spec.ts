import { test, expect } from '@playwright/test'

test.describe('Critical User Flows', () => {
  test('homepage loads without errors', async ({ page }) => {
    // Track console errors
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle(/Cold Lava/)

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Verify no console errors
    expect(errors).toHaveLength(0)

    // Verify key elements present
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
  })

  test('cookie banner accepts and persists', async ({ page, context }) => {
    await page.goto('/')

    // Wait for cookie banner
    await page.waitForSelector('text=Cookie Preferences', { timeout: 3000 })

    // Accept cookies
    await page.click('text=Accept All')

    // Verify banner dismissed
    await expect(page.locator('text=Cookie Preferences')).not.toBeVisible()

    // Verify localStorage set
    const consent = await page.evaluate(() =>
      localStorage.getItem('cookie_consent')
    )
    expect(consent).toBe('accepted')

    // Reload - banner should not appear
    await page.reload()
    await page.waitForTimeout(2000)
    const bannerVisible = await page.isVisible('text=Cookie Preferences').catch(() => false)
    expect(bannerVisible).toBe(false)
  })

  test('navigation links work with smooth scroll', async ({ page }) => {
    await page.goto('/')

    // Wait for navigation to be visible
    await expect(page.locator('nav')).toBeVisible()

    // Click services link
    await page.click('a[href="#services"]')

    // Wait for smooth scroll
    await page.waitForTimeout(1500)

    // Verify URL updated
    expect(page.url()).toContain('#services')

    // Verify services section is in viewport
    const servicesSection = page.locator('#services')
    await expect(servicesSection).toBeInViewport()
  })

  test('BOS section is visible and interactive', async ({ page }) => {
    await page.goto('/')

    // Scroll to BOS section
    await page.locator('#bos').scrollIntoViewIfNeeded()

    // Verify BOS title visible
    await expect(page.locator('text=BOS').first()).toBeVisible()
    await expect(page.locator('text=Business Operating System')).toBeVisible()

    // Verify CTA button present
    const ctaButton = page.locator('a[href*="cal.com"]').first()
    await expect(ctaButton).toBeVisible()
  })

  test('ISS tracker displays location', async ({ page }) => {
    await page.goto('/')

    // Wait for ISS tracker to appear
    const tracker = page.locator('text=ISS currently over:')
    await expect(tracker).toBeVisible({ timeout: 10000 })

    // Wait for location to load (not showing placeholder)
    await page.waitForTimeout(8000) // Allow time for API calls

    const locationText = await tracker.textContent()

    // Verify not showing loading state
    expect(locationText).not.toContain('...')
    expect(locationText).not.toContain('—')

    // Should show some location (or fallback)
    expect(locationText).toBeTruthy()
  })

  test('contact section and booking link work', async ({ page }) => {
    await page.goto('/')

    // Navigate to contact
    await page.click('a[href="#contact"]')
    await page.waitForTimeout(1500)

    // Verify contact section visible
    await expect(page.locator('#contact')).toBeInViewport()

    // Verify booking link present and valid
    const bookingLink = page.locator('a[href*="cal.com/coldlava"]')
    await expect(bookingLink).toBeVisible()

    // Verify link has correct attributes
    const href = await bookingLink.getAttribute('href')
    expect(href).toContain('cal.com/coldlava')

    const target = await bookingLink.getAttribute('target')
    expect(target).toBe('_blank')
  })

  test('mobile menu works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Verify mobile menu button visible
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await expect(menuButton).toBeVisible()

    // Open menu
    await menuButton.click()

    // Verify menu opened
    await expect(page.locator('nav a[href="#services"]')).toBeVisible()

    // Click a link
    await page.click('nav a[href="#services"]')

    // Menu should close and scroll
    await page.waitForTimeout(1500)
  })

  test('footer links are accessible', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded()

    // Verify footer links visible
    await expect(page.locator('footer a[href="#process"]')).toBeVisible()
    await expect(page.locator('footer a[href="#services"]')).toBeVisible()
    await expect(page.locator('footer a[href="#bos"]')).toBeVisible()
    await expect(page.locator('footer a[href="/privacy"]')).toBeVisible()
    await expect(page.locator('footer a[href="/terms"]')).toBeVisible()
    await expect(page.locator('footer a[href="/cookies"]')).toBeVisible()
  })
})

test.describe('Error Handling', () => {
  test('handles offline gracefully', async ({ page, context }) => {
    await page.goto('/')

    // Go offline
    await context.setOffline(true)

    // Reload page
    await page.reload().catch(() => {})

    // Should show error page or handle gracefully
    // (This will fail to load, which is expected)

    // Go back online
    await context.setOffline(false)
    await page.reload()

    // Should recover
    await expect(page).toHaveTitle(/Cold Lava/)
  })

  test('private browsing mode works', async ({ browser }) => {
    // Create incognito context (simulates private browsing)
    const context = await browser.newContext({
      permissions: [],
    })
    const page = await context.newPage()

    // Should not crash even if localStorage blocked
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify page loaded
    await expect(page).toHaveTitle(/Cold Lava/)

    // Verify no error visible
    const errorVisible = await page.isVisible('text=Something went wrong').catch(() => false)
    expect(errorVisible).toBe(false)

    await context.close()
  })
})

test.describe('Performance', () => {
  test('page loads quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('images load correctly', async ({ page }) => {
    await page.goto('/')

    // Check logo loaded
    const logo = page.locator('img[alt="Cold Lava"]').first()
    await expect(logo).toBeVisible()

    // Verify image actually loaded (not broken)
    const naturalWidth = await logo.evaluate((img: HTMLImageElement) => img.naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
  })
})
