import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async expectTitle(name: string) {
    await expect(this.page.locator('.inventory_details_name')).toHaveText(name);
  }

  async addToCart() {
    // detail page: button is often add-to-cart-sauce-labs-backpack
    await this.page.locator('[data-test^="add-to-cart"]').click();
  }

  async backToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
    await this.page.waitForURL(/inventory\.html/);
  }
}