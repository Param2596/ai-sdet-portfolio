import {test, expect} from '@playwright/test';
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