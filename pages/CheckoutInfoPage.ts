import { Page } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private readonly page: Page) {}

  async fillInfo(first: string, last: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
  }

  async continue() {
    await this.page.locator('[data-test="continue"]').click();
    await this.page.waitForURL(/checkout-step-two\.html/);
  }
}