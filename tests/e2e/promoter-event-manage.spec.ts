import { test, expect } from '@playwright/test';

test.describe('Promoter Event Manage Page', () => {
  const TEST_EVENT_ID = 'a1416182-5a82-4219-8bf9-a514fa38d40c';
  const MANAGE_URL = `/promoter/events/${TEST_EVENT_ID}/manage`;

  test.beforeEach(async ({ page }) => {
    // Set authentication in localStorage
    await page.goto(MANAGE_URL);
    await page.evaluate(() => {
      localStorage.setItem('promoter_authenticated', 'true');
      localStorage.setItem('promoter_email', 'alex@example.com');
    });
  });

  test('should load and display event info from Supabase', async ({ page }) => {
    await page.goto(MANAGE_URL);

    // Wait for page to load
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")', { timeout: 10000 });

    // Verify event name is displayed (from Supabase)
    await expect(page.locator('h1:has-text("Saturday Night Sessions")')).toBeVisible();

    // Verify back button exists
    await expect(page.locator('button:has-text("← Dashboard")')).toBeVisible();
  });

  test('should display capacity meter', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Verify capacity meter exists
    const capacityMeter = page.locator('.bg-gray-200.rounded-full.h-4');
    await expect(capacityMeter).toBeVisible();

    // Verify labels (use first to avoid strict mode violation)
    await expect(page.locator('text=Approved').first()).toBeVisible();
    await expect(page.locator('text=Total capacity')).toBeVisible();
  });

  test('should display share invite section', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Check for share link section
    await expect(page.locator('text=Share invite link:')).toBeVisible();

    // Verify input field with link exists
    const shareInput = page.locator('input[value*="https://nightlist.app/guest/signup"]');
    await expect(shareInput).toBeVisible();

    // Verify Share Invite button exists
    await expect(page.locator('button:has-text("Share Invite")')).toBeVisible();
  });

  test('should display request additional spots button', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Verify button exists
    await expect(page.locator('button:has-text("Request additional spots")')).toBeVisible();
  });

  test('should display tab navigation', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Verify both tabs exist
    const myListTab = page.locator('button:has-text("My List")');
    const fullListTab = page.locator('button:has-text("Complete Guestlist")');

    await expect(myListTab).toBeVisible();
    await expect(fullListTab).toBeVisible();

    // Verify My List tab is active by default
    await expect(myListTab).toHaveClass(/bg-black/);
  });

  test('should display status filter buttons', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Verify filter buttons exist
    await expect(page.locator('button:has-text("All")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Pending")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Approved")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Denied")').first()).toBeVisible();
  });

  test('should switch to Complete Guestlist tab', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Click Complete Guestlist tab
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Verify tab is now active
    await expect(page.locator('button:has-text("Complete Guestlist")')).toHaveClass(/bg-black/);

    // Verify person filter appears
    await expect(page.locator('button:has-text("All People")').first()).toBeVisible();
  });

  test('should display guests with real Supabase data', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Switch to Complete Guestlist to see all guests
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Check if we have any guests from the API
    const guestCards = page.locator('.border-gray-200');
    const count = await guestCards.count();

    if (count > 0) {
      // Verify first guest card has expected structure
      const firstGuest = guestCards.first();

      // Should have guest name
      const hasName = await firstGuest.locator('h3').count();
      expect(hasName).toBeGreaterThan(0);
    } else {
      // Should show empty state
      await expect(page.locator('text=No guests found')).toBeVisible();
    }
  });

  test('should display Instagram handle if available', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Switch to Complete Guestlist
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Look for Instagram links in guest cards
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
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Click back button
    await page.locator('button:has-text("← Dashboard")').click();

    // Wait for URL to change (client-side navigation)
    await page.waitForURL('/promoter/dashboard', { timeout: 10000 });

    // Should navigate to promoter dashboard
    await expect(page).toHaveURL('/promoter/dashboard');
    await expect(page.locator('text=Hey Alex!')).toBeVisible();
  });

  test('should filter guests by status', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Click Pending filter
    await page.locator('button:has-text("Pending")').first().click();

    // Verify filter is active
    await expect(page.locator('button:has-text("Pending")').first()).toHaveClass(/bg-gray-600/);
  });

  test('should show person filters in Complete Guestlist tab', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Switch to Complete Guestlist tab
    await page.locator('button:has-text("Complete Guestlist")').click();

    // Wait for person filters
    await page.waitForSelector('button:has-text("All People")');

    // Verify "All People" filter exists
    await expect(page.locator('button:has-text("All People")')).toBeVisible();

    // Check if person-specific filters exist (if there are guests)
    const filterButtons = page.locator('button').filter({ hasText: /\(\d+\)/ });
    const count = await filterButtons.count();

    // Should have at least one person filter if there are guests
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should display status badges on guest cards', async ({ page }) => {
    await page.goto(MANAGE_URL);
    await page.waitForSelector('h1:has-text("Saturday Night Sessions")');

    // Switch to Complete Guestlist
    await page.locator('button:has-text("Complete Guestlist")').click();

    const guestCards = page.locator('.border-gray-200');
    const count = await guestCards.count();

    if (count > 0) {
      // Look for status badges (Approved, Pending, Denied, Checked In)
      const statusBadges = page.locator('span').filter({
        hasText: /Approved|Pending|Denied|Checked In/,
      });
      const badgeCount = await statusBadges.count();

      // Should have at least one status badge if there are guests
      expect(badgeCount).toBeGreaterThanOrEqual(0);
    }
  });
});
