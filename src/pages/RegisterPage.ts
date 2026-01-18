import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  selectors = {
    usernameField: '[name="usernameRegisterPage"]',
    emailField: '[name="emailRegisterPage"]',
    passwordField: '[name="passwordRegisterPage"]',
    confirmPasswordField: '[name="confirm_passwordRegisterPage"]',
    firstName: '[name="first_nameRegisterPage"]',
    lastName: '[name="last_nameRegisterPage"]',
    iAgreeCheckbox: '[name="i_agree"]',
    registerButton: '#register_btn',
  };

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/#/register');
  }

  async fillUsername(username: string) {
    const userField = this.page.locator(this.selectors.usernameField).first();
    await userField.fill(username);
  }

  async fillEmail(email: string) {
    const emailFields = this.page.locator('input[type="email"], input[name*="email" i]');
    const count = await emailFields.count();
    // Usually the first email field is for login, second for register
    if (count > 1) {
      await emailFields.nth(1).fill(email);
    } else {
      await emailFields.first().fill(email);
    }
  }

  async fillPassword(password: string) {
    const passwordFields = this.page.locator('input[type="password"], input[name*="password" i]');
    const count = await passwordFields.count();
    // First password field
    if (count >= 2) {
      await passwordFields.nth(0).fill(password);
    } else {
      await passwordFields.first().fill(password);
    }
  }

  async fillConfirmPassword(confirmPassword: string) {
    const passwordFields = this.page.locator('input[type="password"], input[name*="password" i]');
    const count = await passwordFields.count();
    // Last password field (confirm password)
    if (count >= 2) {
      await passwordFields.nth(count - 1).fill(confirmPassword);
    }
  }

  async clickRegisterButton() {
    const button = this.page.locator(this.selectors.registerButton);
    await button.click();
  }

  async fillRegistrationForm(username: string, email: string, password: string, firstName?: string, lastName?: string) {
    await this.fill(this.selectors.usernameField, username);
    await this.fill(this.selectors.emailField, email);
    await this.fill(this.selectors.passwordField, password);
    await this.fill(this.selectors.confirmPasswordField, password);
    if (firstName)
        await this.fill(this.selectors.firstName, firstName);
    if (lastName)
        await this.fill(this.selectors.lastName, lastName);
    await this.page.locator(this.selectors.iAgreeCheckbox).click();
  }
}
