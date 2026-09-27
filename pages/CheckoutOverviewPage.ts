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

  /** Sum of every line-item price on the overview. */
  async sumLinePrices(): Promise<number> {
    const prices = this.page.locator('.cart_item .inventory_item_price');
    await expect(prices.first()).toBeVisible();
    const texts = await prices.allTextContents();
    expect(texts.length).toBeGreaterThan(0);
    return round2(texts.reduce((sum, t) => sum + parseMoney(t), 0));
  }

  async expectTotalsMatch() {
    await expect(this.page.locator('[data-test="subtotal-label"]')).toBeVisible();

    const lineSum = await this.sumLinePrices();
    const itemTotal = parseMoney(
      await this.page.locator('[data-test="subtotal-label"]').innerText(),
    );
    const tax = parseMoney(
      await this.page.locator('[data-test="tax-label"]').innerText(),
    );
    const total = parseMoney(
      await this.page.locator('[data-test="total-label"]').innerText(),
    );

    expect(itemTotal).toBe(lineSum);
    expect(tax).toBe(round2(itemTotal * 0.08));
    expect(total).toBe(round2(itemTotal + tax));
  }
}

function parseMoney(text: string): number {
  const match = text.match(/\$([\d.]+)/);
  if (!match) throw new Error(`No money in: ${text}`);
  return Number(match[1]);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}