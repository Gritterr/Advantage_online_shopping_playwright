import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { createNewUser } from '../src/utils/CreateUser';

test.describe('Authentication Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let testUser: { email: string; password: string; loginName: string, success?: boolean };

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    testUser = await createNewUser();
    expect(testUser.success).toBeTruthy();
    console.log('Test user created:', testUser);
  });


  test('Should login with valid credentials', async ({ page }) => {
    await homePage.goto();
    await homePage.OpenUserMenu();
    await loginPage.login(testUser.loginName, testUser.password);
    await page.locator(homePage.selectors.createNewAccount).waitFor({ state: 'hidden' });
    const isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    expect(isLoggedIn).toBeTruthy();
  });

  test('Should logout successfully', async ({ page }) => {
    await homePage.goto();
    await homePage.OpenUserMenu();
    await loginPage.login(testUser.loginName, testUser.password);
    await page.locator(homePage.selectors.createNewAccount).waitFor({ state: 'hidden' });
    expect((await page.locator(homePage.selectors.userMenu).innerText()).trim()).toEqual(testUser.loginName);
    let isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    await page.locator(homePage.selectors.userMenu).first().click();
    expect(isLoggedIn).toBeTruthy();

    await homePage.logout();
    await page.locator(homePage.selectors.UserMenuList).waitFor({ state: 'hidden' });
    isLoggedIn = await homePage.isUserLoggedIn(testUser.loginName);
    expect(isLoggedIn).toBeFalsy();
  });

  test('Should display error for invalid login credentials', async ({ page }) => {
    await homePage.goto();
    await homePage.OpenUserMenu();
    // Attempt login with invalid credentials
    await loginPage.login('invalidusername', 'wrongpassword');
    await loginPage.ValidateErrorDisplayed();
  });

  test('Should show validation errors for empty login form', async ({ page }) => {
    await homePage.goto();
    // await homePage.page.locator(homePage.selectors.categoryTile).first().waitFor();
    await homePage.OpenUserMenu();
    await page.locator(homePage.selectors.createNewAccount).waitFor();
    await loginPage.loginWithoutFillingForm();
    await loginPage.requiredFieldValidation();
  });
});
