import {test, expect} from '../fixtures/testFixtures';
import { LoginPage } from '../pages/LoginPage';


test('valid_login', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('bad_pswd', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'abcd');
  await loginPage.expectErrorVisible();
  await loginPage.expectErrorText('Epic sadface: Username and password do not match any user in this service');
});

test('locked_out', async({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await loginPage.expectErrorVisible();
  await loginPage.expectErrorText('Epic sadface: Sorry, this user has been locked out.');
} );

test('empty_username', async({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('','abcdefg');
  await loginPage.expectErrorVisible();
  await loginPage.expectErrorText('Epic sadface: Username is required');
});

test('empty_password', async({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user','');
  await loginPage.expectErrorVisible();
  await loginPage.expectErrorText('Epic sadface: Password is required');
});

test('logout_returns_to_login', async({loginPage, inventoryPage, page}) => {
  void loginPage;
  await inventoryPage.openMenu();
  await inventoryPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="username"]')).toBeVisible();
})