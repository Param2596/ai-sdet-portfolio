import { Page, expect } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private readonly page: Page) {}

  async fillInfo(first: string, last: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
  }

  async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async continue() {
    await this.clickContinue();
    await this.page.waitForURL(/checkout-step-two\.html/);
  }

  async expectErrorVisible() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }

  async expectErrorText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
  async cancelCheckout(){
    await this.page.locator('[data-test = "cancel"]').click();
    await this.page.waitForURL('**/cart.html');
  }
}