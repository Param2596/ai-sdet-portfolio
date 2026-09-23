import { test, expect } from '../fixtures/testFixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
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

test('checkout_finishes_order', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;

  const cartPage = new CartPage(page);
  const checkoutInfo = new CheckoutInfoPage(page);
  const overview = new CheckoutOverviewPage(page);
  const complete = new CheckoutCompletePage(page);

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutInfo.fillInfo('Paramjot', 'Singh', '110001');
  await checkoutInfo.continue();

  await overview.expectItemVisible('Sauce Labs Backpack');
  await overview.finish();
  await complete.expectThankYou();
  await expect(page).toHaveURL(/checkout-complete\.html/);
});

test('checkout_empty_first_name', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;

  const cartPage = new CartPage(page);
  const checkoutInfo = new CheckoutInfoPage(page);

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutInfo.fillInfo('', 'Singh', '110001');
  await checkoutInfo.clickContinue();

  await checkoutInfo.expectErrorVisible();
  await checkoutInfo.expectErrorText('Error: First Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('checkout_empty_last_name', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;

  const cartPage = new CartPage(page);
  const checkoutInfo = new CheckoutInfoPage(page);

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutInfo.fillInfo('Paramjot', '', '110001');
  await checkoutInfo.clickContinue();

  await checkoutInfo.expectErrorVisible();
  await checkoutInfo.expectErrorText('Error: Last Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('checkout_empty_postal_code', async ({ loginPage, inventoryPage, page }) => {
  void loginPage;

  const cartPage = new CartPage(page);
  const checkoutInfo = new CheckoutInfoPage(page);

  await inventoryPage.addToCart(Products.backpack);
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutInfo.fillInfo('Paramjot', 'Singh', '');
  await checkoutInfo.clickContinue();

  await checkoutInfo.expectErrorVisible();
  await checkoutInfo.expectErrorText('Error: Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});