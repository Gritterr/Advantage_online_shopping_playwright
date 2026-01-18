import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  selectors = {
    addToCartButton: '[name="save_to_cart"]',
    checkoutPopup: '#checkOutPopUp'
  };

  constructor(page: Page) {
    super(page);
  }

  async addToCart() {
    await this.page.locator(this.selectors.addToCartButton).waitFor();
    const button = this.page.locator(this.selectors.addToCartButton).first();
    await button.click();
    await expect(this.page.locator(this.selectors.checkoutPopup)).toBeVisible({ timeout: 5000 });
  }
}
