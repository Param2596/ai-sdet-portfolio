import { test, expect } from '../fixtures/testFixtures';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/credentials';

test('inventory_loads_when_images_aborted', async ({ page }) => {
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'image') {
      await route.abort();
    } else {
      await route.continue();
    }
  });

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_item_name').first()).toHaveText(
    'Sauce Labs Backpack',
  );
});