import { test, expect } from '@playwright/test';

test.describe('Staff Dashboard', () => {
  const TEST_EVENT_ID = 'a1416182-5a82-4219-8bf9-a514fa38d40c';

  test('should load and display event data from Supabase', async ({ page }) => {
    // Navigate to Staff Dashboard
    await page.goto('/staff/dashboard');

    // Wait for loading to complete
    await page.waitForSelector('text=Hey Alex!', { timeout: 10000 });

    // Verify header is displayed
    await expect(page.locator('h1')).toContainText('Hey Alex!');
    await expect(page.locator('p:has-text("Nightlist")').first()).toBeVisible();

    // Verify logout button exists
    await expect(page.locator('button:has-text("Logout")')).toBeVisible();
  });

  test('should display upcoming events section', async ({ page }) => {
    await page.goto('/staff/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Check for the section title
    await expect(page.locator('h2:has-text("Datcha\'s Upcoming Events")')).toBeVisible();

    // Check subtitle
    await expect(
      page.locator('text=Invite friends to come by on your next shift')
    ).toBeVisible();
  });

  test('should display event card with real data', async ({ page }) => {
    await page.goto('/staff/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Wait for event card to appear
    await page.waitForSelector('.border-gray-200', { timeout: 10000 });

    // Verify event name is displayed (from Supabase)
    await expect(
      page.locator('text=Saturday Night Sessions')
    ).toBeVisible({ timeout: 5000 });

    // Verify capacity meter exists
    const capacityMeter = page.locator('.bg-gray-200.rounded-full.h-4');
    await expect(capacityMeter).toBeVisible();
  });

  test('should display share invite link', async ({ page }) => {
    await page.goto('/staff/dashboard');
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

  test('should have Review Lists button that navigates to manage page', async ({ page }) => {
    await page.goto('/staff/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Find and verify Review Lists button
    const reviewButton = page.locator('button:has-text("Review Lists")').first();
    await expect(reviewButton).toBeVisible();

    // Click button and verify navigation
    await reviewButton.click();

    // Should navigate to manage page
    await expect(page).toHaveURL(new RegExp(`/staff/events/${TEST_EVENT_ID}/manage`));
  });

  test('should display Request Additional Spots button', async ({ page }) => {
    await page.goto('/staff/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Verify Request Additional Spots button exists
    const requestButton = page.locator('button:has-text("Request Additional Spots")');
    await expect(requestButton.first()).toBeVisible();
  });

  test('should handle capacity request interaction', async ({ page }) => {
    await page.goto('/staff/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Click Request Additional Spots button
    await page.locator('button:has-text("Request Additional Spots")').first().click();

    // Verify request form appears
    await expect(page.locator('text=Request additional spots:')).toBeVisible();

    // Verify dropdown and reason input exist
    await expect(page.locator('select')).toBeVisible();
    await expect(page.locator('input[placeholder*="Reason"]')).toBeVisible();

    // Verify Send Request and Cancel buttons
    await expect(page.locator('button:has-text("Send Request")')).toBeVisible();
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible();

    // Click Cancel
    await page.locator('button:has-text("Cancel")').click();

    // Form should be hidden
    await expect(page.locator('text=Request additional spots:')).not.toBeVisible();
  });

  test('should copy share link to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/staff/dashboard');
    await page.waitForSelector('text=Hey Alex!');

    // Click Copy button
    await page.locator('button:has-text("Copy")').first().click();

    // Verify "Copied!" message appears
    await expect(page.locator('text=Copied!')).toBeVisible({ timeout: 2000 });

    // Verify it disappears after delay
    await expect(page.locator('text=Copied!')).not.toBeVisible({ timeout: 3000 });
  });
});
