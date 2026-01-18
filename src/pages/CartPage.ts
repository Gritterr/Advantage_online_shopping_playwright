import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  selectors = {
    cartItems: '.productName',
    cartTotal: '.cart-total, .total, [class*="total"]',
    menuCart: '#menuCart',
    shoppingCart: '#shoppingCart'
  };

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    const menuCart = this.page.locator(this.selectors.menuCart);
    const shoppingCart = this.page.locator(this.selectors.shoppingCart);
  
    await expect(menuCart).toBeVisible();
    await expect(menuCart).toBeEnabled();
    await menuCart.click();
  
    await expect(shoppingCart).toBeVisible({ timeout: 10000 });
  }

  async getCartTotal(): Promise<string> {
    try {
      return await this.getText(this.selectors.cartTotal);
    } catch {
      return '';
    }
  }

  async getCartItems() {
    return await this.page.locator(this.selectors.cartItems).count();
  }
}
