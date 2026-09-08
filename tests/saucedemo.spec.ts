import { test, expect } from '@playwright/test';

test('valid_login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('bad_pswd', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('abcd');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service'))
});


// test('test', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.locator('[data-test="username"]').click();
//   await page.locator('[data-test="username"]').fill('standard_user');
//   await page.locator('[data-test="username"]').press('Tab');
//   await page.locator('[data-test="password"]').fill('secret_sauce');
//   await page.locator('div').nth(4).click();
//   await page.locator('[data-test="login-button"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
//   await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="shopping-cart-link"]').click();
//   await page.locator('[data-test="checkout"]').click();
//   await page.locator('[data-test="firstName"]').click();
//   await page.locator('[data-test="firstName"]').fill('test');
//   await page.locator('[data-test="firstName"]').press('Tab');
//   await page.locator('[data-test="lastName"]').fill('final');
//   await page.locator('[data-test="lastName"]').press('Tab');
//   await page.locator('[data-test="postalCode"]').fill('213');
//   await page.locator('[data-test="continue"]').click();
//   await page.locator('[data-test="finish"]').click();
//   const downloadPromise = page.waitForEvent('download');
//   await page.locator('[data-test="generate-pdf-order"]').click();
//   const download = await downloadPromise;
// });
