import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

async expectTitle(name: string) {
  await expect(this.page.locator('.inventory_details_name')).toHaveText(name);
}

  async addToCart() {
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  async backToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }
}