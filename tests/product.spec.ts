import { test, expect } from '../fixtures/testFixtures';
import { ProductPage } from '../pages/ProductPage';
import { Products_cart } from '../utils/products';

test('product_detail_shows_title', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;
  const productPage = new ProductPage(page);

await inventoryPage.openProduct('item-4-title-link'); // backpack
await productPage.expectTitle(Products_cart.backpack);
});