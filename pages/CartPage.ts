import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
    await this.page.waitForURL(/checkout-step-one\.html/);
  }
}