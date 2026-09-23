import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  async expectItemVisible(name: string) {
    await expect(this.page.locator('.inventory_item_name')).toHaveText(name);
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
    await this.page.waitForURL(/checkout-complete\.html/);
  }
}