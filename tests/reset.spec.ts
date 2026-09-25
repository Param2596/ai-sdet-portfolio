import { test, expect } from '../fixtures/testFixtures';
import { Products } from '../utils/products';

test('reset_app_state_clears_cart', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.addToCart(Products.bikeLight);
  await inventoryPage.checkCartNumber(2);

  await inventoryPage.resetAppState();
  await inventoryPage.closeMenu();
  await inventoryPage.checkCartNumber(0);

  await page.reload();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await expect(
    page.locator(`[data-test="add-to-cart-${Products.backpack}"]`),
  ).toBeVisible();
  await expect(
    page.locator(`[data-test="add-to-cart-${Products.bikeLight}"]`),
  ).toBeVisible();
});