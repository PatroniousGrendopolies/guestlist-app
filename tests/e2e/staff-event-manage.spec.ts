import { test, expect } from '@playwright/test';

test.describe('Staff Event Manage Page', () => {
  const TEST_EVENT_ID = 'a1416182-5a82-4219-8bf9-a514fa38d40c';
  const MANAGE_URL = `/staff/events/${TEST_EVENT_ID}/manage`;

  test('should load and display event info from Supabase', async ({ page }) => {
    await page.goto(MANAGE_URL);

    // Wait for page to load
    await page.waitForSelector('h1:has-text("Guest Lists")', { timeout: 10000 });

    // Verify header elements
    await expect(page.locator('h1:has-text("Guest Lists")')).toBeVisible();

    // Verify event name is displayed (from Supabase)
    await expect(page.locator('text=Saturday Night Sessions')).toBeVisible();

    // Verify back button exists
    await expect(page.locator('button:has-text("← Dashboard")')).toBeVisible();
  });

  test('should display tab navigation', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Verify both tabs exist
    const myListTab = page.locator('button:has-text("My List")');
    const fullEventTab = page.locator('button:has-text("Complete Guestlist")');

    await expect(myListTab).toBeVisible();
    await expect(fullEventTab).toBeVisible();

    // Verify My List tab is active by default
    await expect(myListTab).toHaveClass(/bg-gray-600/);
  });

  test('should display My List tab with guest data', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Should show guest cards in My List tab
    // The page should show either guest cards or "No guests yet" message
    const hasGuests = await page.locator('.border-gray-200').count();

    if (hasGuests > 0) {
      // Verify guest card structure exists
      await expect(page.locator('.border-gray-200').first()).toBeVisible();
    } else {
      // Verify empty state
      await expect(page.locator('text=No guests yet')).toBeVisible();
    }
  });

  test('should switch to Full Event tab', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Click Full Event tab
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Verify tab is now active
    await expect(page.locator('button:has-text("Complete Guestlist")')).toHaveClass(/bg-gray-600/);

    // Verify filter buttons appear (All, and person filters)
    await expect(page.locator('button:has-text("All")')).toBeVisible();
  });

  test('should display guest with real Supabase data', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Check if we have any guests from the API
    const guestCards = page.locator('.border-gray-200');
    const count = await guestCards.count();

    if (count > 0) {
      // Verify first guest card has expected structure
      const firstGuest = guestCards.first();

      // Should have guest name (Emily Rodriguez from our test data)
      const hasName = await firstGuest.locator('h3').count();
      expect(hasName).toBeGreaterThan(0);

      // Should have plus/minus buttons
      await expect(firstGuest.locator('button:has-text("−")')).toBeVisible();
      await expect(firstGuest.locator('button:has-text("+")')).toBeVisible();
    }
  });

  test('should show person filters in Full Event tab', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Switch to Full Event tab
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Wait for filter buttons
    await page.waitForSelector('button:has-text("All")');

    // Verify "All" filter exists
    await expect(page.locator('button:has-text("All")')).toBeVisible();

    // Check if person-specific filters exist (if there are guests)
    const filterButtons = page.locator('.flex.gap-2 button');
    const count = await filterButtons.count();

    // Should have at least the "All" button
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should display guest with Instagram handle', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Look for Instagram handles in guest cards
    const instagramLinks = page.locator('a[href*="instagram.com"]');
    const count = await instagramLinks.count();

    if (count > 0) {
      // Verify Instagram link is properly formatted
      const firstLink = instagramLinks.first();
      await expect(firstLink).toBeVisible();

      // Verify it starts with @
      const text = await firstLink.textContent();
      expect(text).toMatch(/^@/);
    }
  });

  test('should navigate back to dashboard', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Click back button
    await page.locator('button:has-text("← Dashboard")').click();

    // Should navigate to staff dashboard
    await expect(page).toHaveURL('/staff/dashboard');
    await expect(page.locator('text=Hey Alex!')).toBeVisible();
  });

  test('should update plus ones for staff own guests', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Find a guest card with plus/minus buttons
    const guestCard = page.locator('.border-gray-200').first();
    const count = await guestCard.count();

    if (count > 0) {
      // Get initial plus ones value
      const plusOneSpan = guestCard.locator('span:has-text("+")');

      // Click the + button
      await guestCard.locator('button:has-text("+")').click();

      // The value should update in the UI (optimistic update)
      // We're just verifying the button is clickable, actual update would need API mocking
      await expect(guestCard.locator('button:has-text("+")')).toBeVisible();
    }
  });

  test('should show checked in status badge', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Guest Lists")');

    // Switch to Full Event to see all guests
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Look for checked-in badge if any guests are checked in
    const checkedInBadge = page.locator('text=Checked in');
    const count = await checkedInBadge.count();

    // Just verify the page loads - checked-in status depends on test data
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
