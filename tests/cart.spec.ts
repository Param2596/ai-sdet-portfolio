import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Products, Products_cart } from '../utils/products';


test('cart_count', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.addToCart(Products.onesie);
    await inventoryPage.addToCart(Products.bikeLight);
    await inventoryPage.addToCart(Products.redTshirt);
    await inventoryPage.checkCartNumber(4);
    await inventoryPage.openCart();
    await inventoryPage.checkProductInCart(Products_cart.backpack);
    await inventoryPage.checkProductsInCart([
        Products_cart.backpack,
        Products_cart.onesie,
        Products_cart.bikeLight,
        Products_cart.redTshirt
    ] );

});

