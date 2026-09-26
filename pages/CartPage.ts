import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async checkout() {
    await this.page.locator('[data-test = "checkout"]').click();
    await this.page.waitForURL(/checkout-step-one\.html/);
  }
  async continueShopping() {
    await this.page.locator('[data-test = "continue-shopping"]').click();
    await this.page.waitForURL('**/inventory.html');
  }
  
async removeItem(productname: string) {
  await this.page.locator(`[data-test="remove-${productname}"]`).click();
}

}