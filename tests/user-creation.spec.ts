import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { RegisterPage } from '../src/pages/RegisterPage';

test.describe('User Creation Tests', () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
  });

  test('Should create a new user account', async ({ page }) => {
    const baseURL = homePage.baseURL;
    await homePage.goto();
    await homePage.clickSignUp();

    await page.waitForURL(/(.*register)/i, { timeout: 1000 });

    const timestamp = Date.now();
    const testUser = {
      username: `testuser${Math.random().toString(6).substring(2, 8)}`,
      email: `testuser${timestamp}@example.com`,
      password: 'TestPass123',
    };

    await registerPage.fillRegistrationForm(testUser.username, testUser.email, testUser.password);

    await registerPage.clickRegisterButton();
    await page.locator('.menu', { hasText: 'OUR PRODUCTS' }).waitFor();
    const isLoggedIn = await homePage.isUserLoggedIn(testUser.username);
    expect(isLoggedIn).toBeTruthy();
  });
});