import { test, expect } from '../fixtures/testFixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { Products } from '../utils/products';

test('checkout_info_reaches_overview', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;

  const cartPage = new CartPage(page);
  const checkoutInfo = new CheckoutInfoPage(page);

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.checkCartNumber(1);
  await inventoryPage.openCart();

  await cartPage.checkout();
  await checkoutInfo.fillInfo('Paramjot', 'Singh', '110001');
  await checkoutInfo.continue();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
});