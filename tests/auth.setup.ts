import {test as setup, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/credentials';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.context().storageState({ path: authFile });
});
