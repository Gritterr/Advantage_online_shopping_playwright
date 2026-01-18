import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { ProductPage } from '../src/pages/ProductPage';
import { createNewUser } from '../src/utils/CreateUser';

test.describe.parallel('Shopping and Checkout Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let productPage: ProductPage;
  let testUser: { email: string; password: string; loginName: string, success?: boolean };

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    productPage = new ProductPage(page);
    testUser = await createNewUser();
    expect(testUser.success).toBeTruthy();
    console.log('Test user created:', testUser);
  });

  test('Should add product to cart for logged-out user', async ({ page }) => {
    await homePage.goto();

    const isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    if (isLoggedIn) {
      await homePage.OpenUserMenu();
      await homePage.logout();
      await homePage.goto();
    }

    await homePage.selectFirstProduct();

    await productPage.addToCart();
    await cartPage.goto();
    const cartItemCount = await cartPage.getCartItems();
    expect(cartItemCount).toBeGreaterThan(0);
  });

  test('Should add product to cart for logged-in user', async ({ page }) => {
    await homePage.goto();
    await homePage.OpenUserMenu();
    await loginPage.login(testUser.loginName, testUser.password);
    await page.locator(homePage.selectors.createNewAccount).waitFor({ state: 'hidden' });
    const isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    expect(isLoggedIn).toBeTruthy();

    await homePage.selectFirstProduct();
    await productPage.addToCart();
    await cartPage.goto();
    const cartItemCount = await cartPage.getCartItems();
    expect(cartItemCount).toBeGreaterThan(0);
  });

  test('Should redirect to login when logged-out user proceeds to checkout', async ({ page }) => {
    await homePage.goto();

    const isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    if (isLoggedIn) {
      await homePage.OpenUserMenu();
      await homePage.logout();
      await homePage.goto();
    }

    await homePage.selectFirstProduct();

    await productPage.addToCart();
    await cartPage.goto();
    const cartItemCount = await cartPage.getCartItems();
    expect(cartItemCount).toBeGreaterThan(0);

    // Try to checkout
    await checkoutPage.proceedToCheckout();

    // Wait for redirect
    await page.waitForURL(/.*/, { timeout: 10000 });
    await homePage.validateUserLoginOnCheckout();

    // Should be redirected to login
    const currentUrl = page.url();
    expect(currentUrl.toLowerCase()).toMatch(/login|signin/);
  });

  test('Should complete checkout flow for logged-in user', async ({ page }) => {
    test.setTimeout(0);
    await homePage.goto();
    await homePage.OpenUserMenu();
    await loginPage.login(testUser.loginName, testUser.password);
    await page.locator(homePage.selectors.createNewAccount).waitFor({ state: 'hidden' });
    const isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    expect(isLoggedIn).toBeTruthy();

    await homePage.selectFirstProduct();
    await productPage.addToCart();
    await cartPage.goto();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.editShippingDetails()
    await checkoutPage.fillShippingAddress(
      '123 Main St',
      'New York',
      'NY',
      '10001',
      'United States'
    );
    await checkoutPage.fillPaymentInfo('Test123', 'Test123')
  });
});
