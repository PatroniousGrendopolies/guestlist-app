import { test, expect } from '@playwright/test';

test.describe('Promoter Dashboard', () => {
  const TEST_EVENT_ID = 'a1416182-5a82-4219-8bf9-a514fa38d40c';

  test.beforeEach(async ({ page }) => {
    // Set authentication in localStorage
    await page.goto('/promoter/dashboard');
    await page.evaluate(() => {
      localStorage.setItem('promoter_authenticated', 'true');
      localStorage.setItem('promoter_email', 'alex@example.com');
    });
  });

  test('should load and display promoter name', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!', { timeout: 10000 });

    // Verify header is displayed
    await expect(page.locator('h1')).toContainText('Hey Alex!');
    await expect(page.locator('p:has-text("Nightlist")').first()).toBeVisible();
  });

  test('should display logout button', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    await expect(page.locator('button:has-text("Logout")')).toBeVisible();
  });

  test('should display upcoming events section', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Check for the section title
    await expect(page.locator('h2:has-text("Upcoming Events")')).toBeVisible();
  });

  test('should display event card with real data', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Wait for event card to appear
    await page.waitForSelector('.border-gray-200', { timeout: 10000 });

    // Verify event name is displayed (from Supabase)
    await expect(page.locator('text=Saturday Night Sessions')).toBeVisible({ timeout: 5000 });

    // Verify capacity meter exists
    const capacityMeter = page.locator('.bg-gray-200.rounded-full.h-4');
    await expect(capacityMeter).toBeVisible();
  });

  test('should display share invite link', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Check for share link section
    await expect(page.locator('text=Share invite link:')).toBeVisible();

    // Verify input field with link exists
    const shareInput = page.locator('input[value*="https://nightlist.app/guest/signup"]');
    await expect(shareInput).toBeVisible();

    // Verify Copy and Share buttons exist
    await expect(page.locator('button:has-text("Copy")')).toBeVisible();
    await expect(page.locator('button:has-text("Share")')).toBeVisible();
  });

  test('should have Review guestlist button that navigates to manage page', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Find and verify Review guestlist button (could be "Review pending guests" or "Review guestlist")
    const reviewButton = page
      .locator('button:has-text("Review")')
      .filter({ hasText: /Review (pending guests|guestlist)/ })
      .first();
    await expect(reviewButton).toBeVisible();

    // Click button and verify navigation
    await reviewButton.click();

    // Should navigate to manage page
    await expect(page).toHaveURL(new RegExp(`/promoter/events/${TEST_EVENT_ID}/manage`));
  });

  test('should display Request additional spots button', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Verify Request additional spots button exists
    const requestButton = page.locator('button:has-text("Request additional spots")');
    await expect(requestButton.first()).toBeVisible();
  });

  test('should navigate to capacity request page', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Click Request additional spots button
    await page.locator('button:has-text("Request additional spots")').first().click();

    // Should navigate to capacity page
    await expect(page).toHaveURL(new RegExp(`/promoter/events/${TEST_EVENT_ID}/capacity`));
  });

  test('should copy share link to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Click Copy button
    await page.locator('button:has-text("Copy")').first().click();

    // Verify "Copied!" message appears
    await expect(page.locator('text=Copied!')).toBeVisible({ timeout: 2000 });

    // Verify it disappears after delay
    await expect(page.locator('text=Copied!')).not.toBeVisible({ timeout: 3000 });
  });

  test('should handle logout', async ({ page }) => {
    await page.goto('/promoter/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Click Logout button
    await page.locator('button:has-text("Logout")').click();

    // Should redirect to login page
    await expect(page).toHaveURL('/promoter/login');
  });
});
