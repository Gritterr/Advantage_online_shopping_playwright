import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  selectors = {
    addressInput: '[name="address"]',
    countryInput: '[name="countryListbox"]',
    cityInput: 'input[name="city"]',
    stateInput: 'input[name="state_/_province_/_region"]',
    zipCodeInput: '[name="postal_code"]',
    checkoutPopup: '[name="check_out_btn"]',
    checkoutButton: '#checkOutButton[name="check_out_btn"]',
    editShippingDetails: '[translate="Edit_shipping_Details"]',
    nextButton: '#next_btn',
    sp_username: '[name="safepay_username"]',
    sp_password: '[name="safepay_password"]',
    payNow: '#pay_now_btn_SAFEPAY',
    menuCart: '#menuCart'
  };

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    await this.page.locator(this.selectors.menuCart).hover();
    if (await this.page.locator(this.selectors.checkoutPopup).first().isVisible()){
      await this.page.locator(this.selectors.checkoutPopup).first().click();
    } else {
      await this.page.locator(this.selectors.checkoutButton).click();
    }
  }

  async fillShippingAddress(address: string, city: string, state: string, zipCode: string, country: string) {
    await this.page.locator(this.selectors.countryInput).selectOption({ label: country });
    await this.fill(this.selectors.cityInput, city);
    await this.fill(this.selectors.addressInput, address);
    this.page.locator(this.selectors.stateInput).fill(state);
    await this.fill(this.selectors.zipCodeInput, zipCode);
    await this.page.locator(this.selectors.nextButton).last().click();
  }

  async fillPaymentInfo(username: string, password: string) {
    await this.fill(this.selectors.sp_username, username);
    await this.fill(this.selectors.sp_password, password);
    await this.page.locator(this.selectors.payNow).click();
  }

  async editShippingDetails(): Promise<void> {
    await this.page.locator(this.selectors.editShippingDetails).click();
  }
}
