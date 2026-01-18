import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  selectors = {
    userIcon: "#hrefUserIcon",
    createNewAccount: ".create-new-account",
    userMenu: '[aria-label="UserMenu"]',
    categoryTile: '.categoryCell',
    UserMenuList: '[id="loginMiniTitle"]',
    productNameList: '.productName',
    loginClostBtn: '.loginPopUpCloseBtn',
    speakerTile: '[aria-label="SpeakersCategoryTxt"]',
    buyNowButton: '[name="buy_now"]',
    userNameInCheckoutPage: '[name="usernameInOrderPayment"]',
    registerButton: '#registration_btn'
  };

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate("/");
  }

  async logout() {
    await this.page.locator(this.selectors.categoryTile).first().waitFor();
    await this.page.locator(this.selectors.userMenu).first().click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('label', { hasText: 'Sign out' }).last().click({ force: true });
  }

  async OpenUserMenu() {
    await this.page.locator(this.selectors.userMenu).first().click();
  }

  async clickSignUp() {
    await this.click(this.selectors.userIcon);
    await this.click(this.selectors.createNewAccount);
  }

  async isUserLoggedIn(loginName: string): Promise<boolean> {
    await this.page.locator(this.selectors.userMenu).first().click();
    const isLoggedIn = await this.page.locator('label', { hasText: 'Sign out' }).last().isVisible();
    const loginCloseBtn = this.page.locator(this.selectors.loginClostBtn);
    if (await loginCloseBtn.count() > 0 && await loginCloseBtn.isVisible()){
      await loginCloseBtn.click();
      await this.page.locator(this.selectors.createNewAccount).waitFor({state: 'hidden'})
    }
    return isLoggedIn;
  }

  async selectFirstProduct() {
    const firstProduct = this.page.locator(this.selectors.speakerTile);
    await firstProduct.click();
    await this.page.waitForLoadState();
    await this.page.locator(this.selectors.buyNowButton).waitFor();
    await this.page.locator(this.selectors.productNameList).first().click()
  }

  async validateUserLoginOnCheckout() {
    await expect(this.page.locator('label', { hasText: 'Already have an account?'})).toBeVisible();
    await expect(this.page.locator(this.selectors.userNameInCheckoutPage)).toBeVisible();
    await expect(this.page.locator('label', { hasText: 'New user?'})).toBeVisible();
    await expect(this.page.locator(this.selectors.registerButton)).toBeVisible();
  }
}
