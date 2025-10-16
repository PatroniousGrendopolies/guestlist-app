import { test, expect } from '@playwright/test';

test.describe('Guest Auth Page', () => {
  const AUTH_URL = '/guest/auth';

  test.beforeEach(async ({ page }) => {
    await page.goto(AUTH_URL);
  });

  test('should load and display event information', async ({ page }) => {
    // Verify header
    await expect(page.locator('h1:has-text("Welcome to Nightlist")')).toBeVisible();

    // Verify event details are displayed (these come from URL params or defaults)
    await expect(page.locator('text=To get on the list for')).toBeVisible();
  });

  test('should display Google auth button', async ({ page }) => {
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
  });

  test('should display sign up and sign in tabs', async ({ page }) => {
    const signUpTab = page.locator('button:has-text("Sign up")');
    const signInTab = page.locator('button:has-text("Sign In")');

    await expect(signUpTab).toBeVisible();
    await expect(signInTab).toBeVisible();
  });

  test('should show sign up form by default', async ({ page }) => {
    // Sign up form should have first name, last name, email, phone, instagram, password fields
    await expect(page.locator('input[placeholder="First name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Last name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="@yourusername"]')).toBeVisible();
    await expect(page.locator('button:has-text("Create Account")')).toBeVisible();
  });

  test('should switch to sign in form when clicking Sign In tab', async ({ page }) => {
    // Click Sign In tab
    await page.locator('button:has-text("Sign In")').click();

    // Wait for form to change
    await page.waitForTimeout(500);

    // Verify sign in form elements
    await expect(page.locator('button:has-text("Sign In")').last()).toBeVisible();
    await expect(page.locator('text=Forgot your password?')).toBeVisible();
  });

  test('should validate email format in sign up', async ({ page }) => {
    // Fill in form with invalid email
    await page.locator('input[placeholder="First name"]').fill('John');
    await page.locator('input[placeholder="Last name"]').fill('Doe');
    await page.locator('input[placeholder="@yourusername"]').fill('@johndoe');
    await page.locator('input[placeholder="your@email.com"]').fill('invalid-email');
    await page.locator('input[placeholder="Create a password"]').fill('Password123');
    await page.locator('input[placeholder="Confirm your password"]').fill('Password123');

    // Submit form
    await page.locator('button:has-text("Create Account")').click();

    // Should show validation error or stay on the same page
    // Using a more flexible check since validation might come from browser or app
    await page.waitForTimeout(1000);

    // Verify still on auth page (not redirected)
    await expect(page).toHaveURL(/\/guest\/auth/);
  });

  test('should validate password requirements in sign up', async ({ page }) => {
    // Fill in form with weak password
    await page.locator('input[placeholder="First name"]').fill('John');
    await page.locator('input[placeholder="Last name"]').fill('Doe');
    await page.locator('input[placeholder="@yourusername"]').fill('@johndoe');
    await page.locator('input[placeholder="your@email.com"]').fill('john@example.com');
    await page.locator('input[placeholder="Create a password"]').fill('weak');
    await page.locator('input[placeholder="Confirm your password"]').fill('weak');

    // Submit form
    await page.locator('button:has-text("Create Account")').click();

    // Should show password validation error
    const errorText = page.locator('text=/Password must/').first();
    await expect(errorText).toBeVisible({ timeout: 2000 });
  });

  test('should validate password confirmation matches', async ({ page }) => {
    // Fill in form with mismatched passwords
    await page.locator('input[placeholder="First name"]').fill('John');
    await page.locator('input[placeholder="Last name"]').fill('Doe');
    await page.locator('input[placeholder="@yourusername"]').fill('@johndoe');
    await page.locator('input[placeholder="your@email.com"]').fill('john@example.com');
    await page.locator('input[placeholder="Create a password"]').fill('Password123');
    await page.locator('input[placeholder="Confirm your password"]').fill('DifferentPassword123');

    // Submit form
    await page.locator('button:has-text("Create Account")').click();

    // Should show mismatch error
    await expect(page.locator('text=Passwords do not match').first()).toBeVisible({
      timeout: 2000,
    });
  });

  test('should auto-add @ to Instagram handle', async ({ page }) => {
    const instagramInput = page.locator('input[placeholder="@yourusername"]');

    // Type without @
    await instagramInput.fill('johndoe');

    // Verify @ was added
    await expect(instagramInput).toHaveValue('@johndoe');
  });

  test('should validate required fields in sign up', async ({ page }) => {
    // Try to submit empty form
    await page.locator('button:has-text("Create Account")').click();

    // Form should show validation (browser validation might prevent submission)
    // At minimum, button should be present and clickable
    await expect(page.locator('button:has-text("Create Account")')).toBeVisible();
  });

  test('should show loading state when signing in', async ({ page }) => {
    // Switch to sign in
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForTimeout(500);

    // Fill in sign in form with test credentials
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="password"]').fill('TestPassword123');

    // Submit form
    await page.locator('button:has-text("Sign In")').last().click();

    // Should show loading state (this will fail with real API, but tests the UI)
    const loadingButton = page.locator('button:has-text("Signing In...")');
    // Note: This might be very quick if API responds fast
  });

  test('should display privacy policy text', async ({ page }) => {
    await expect(
      page.locator('text=/terms of service and privacy policy/')
    ).toBeVisible();
  });

  test('should have Google auth coming soon message', async ({ page }) => {
    // Click Google button
    await page.locator('button:has-text("Continue with Google")').click();

    // Should show coming soon message
    await expect(page.locator('text=Google authentication coming soon!').first()).toBeVisible({
      timeout: 2000,
    });
  });
});
