import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  selectors = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    signInButton: '#sign_in_btn',
    errorMessage: '#signInResultMessage.invalid',
    requiredFieldValidation: 'label.invalid',
  };

  labels = {
    InvalidLogin: 'Incorrect user name or password.',
    EmptyUsernamValidation: 'Username field is required',
    EmptyPasswordValidation: 'Password field is required'
  }

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/#/login');
  }

  async login(username: string, password: string) {
    await this.fill(this.selectors.usernameInput, username);
    await this.fill(this.selectors.passwordInput, password);
    await this.click(this.selectors.signInButton);
    // Wait for navigation after login
    await this.page.waitForURL(/.*/, { timeout: 10000 });
  }

  async ValidateErrorDisplayed(): Promise<void> {
    await this.page.locator(this.selectors.errorMessage).waitFor();
    expect(await this.page.locator(this.selectors.errorMessage).innerText()).toEqual(this.labels.InvalidLogin);
  }

  async loginWithoutFillingForm() {
    await this.fill(this.selectors.usernameInput, '');
    await this.fill(this.selectors.passwordInput, '');
    const signInButton = this.page.locator(this.selectors.signInButton);
    await signInButton.scrollIntoViewIfNeeded();
    await signInButton.click({ force: true });
  }

  async requiredFieldValidation() {
    await expect(this.page.locator(this.selectors.requiredFieldValidation).filter({ hasText: this.labels.EmptyUsernamValidation })).toBeVisible();
    await expect(this.page.locator(this.selectors.requiredFieldValidation).filter({ hasText: this.labels.EmptyPasswordValidation })).toBeVisible();
  }
}
