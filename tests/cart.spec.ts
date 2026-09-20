import { test, expect } from '../fixtures/testFixtures';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { Products, Products_cart } from '../utils/products';

test('cart_count', async ({ loginPage, inventoryPage, page }) => {
  // loginPage fixture already logged you in — keep it in the args so it runs
  void loginPage;

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.addToCart(Products.onesie);
  await inventoryPage.addToCart(Products.bikeLight);
  await inventoryPage.addToCart(Products.redTshirt);
  await inventoryPage.checkCartNumber(4);
  await inventoryPage.openCart();
  await inventoryPage.checkProductsInCart([
    Products_cart.backpack,
    Products_cart.onesie,
    Products_cart.bikeLight,
    Products_cart.redTshirt,
  ]);
});

test('remove_updates_badge', async ({loginPage, inventoryPage, page}) => {
  void loginPage;

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.addToCart(Products.redTshirt);

  await inventoryPage.checkCartNumber(2);

  await inventoryPage.removefromCart(Products.redTshirt);
  await inventoryPage.checkCartNumber(1);
  await inventoryPage.removefromCart(Products.backpack);
  await inventoryPage.checkCartNumber(0);

  for (const slug of Object.values(Products)) {
    await inventoryPage.addToCart(slug);
  }

  await inventoryPage.checkCartNumber(6);
  await inventoryPage.removefromCart(Products.jacket);
  await inventoryPage.removefromCart(Products.tshirt);
  await inventoryPage.checkCartNumber(4);
});



