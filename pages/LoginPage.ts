import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async expectErrorVisible() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }

  async expectErrorText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}