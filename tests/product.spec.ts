import { test, expect } from '../fixtures/testFixtures';
import { ProductPage } from '../pages/ProductPage';
import { Products_cart } from '../utils/products';

test('product_detail_shows_title', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;
  const productPage = new ProductPage(page);

  await inventoryPage.openProduct('item-4-title-link');
  await productPage.expectTitle(Products_cart.backpack);
});

test('product_detail_add_to_cart', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;
  const productPage = new ProductPage(page);

  await inventoryPage.openProduct('item-4-title-link');
  await productPage.expectTitle(Products_cart.backpack);
  await productPage.addToCart();
  await inventoryPage.checkCartNumber(1);

  await productPage.backToProducts();
  await inventoryPage.checkCartNumber(1);
});