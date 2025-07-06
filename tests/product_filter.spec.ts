import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.ts';
import { LoginPage } from '../pages/login.ts';

import { configDotenv } from 'dotenv';

configDotenv();
// Ensure environment variables are loaded from .env file
if (!process.env.STANDARD_USERNAME || !process.env.PASSWORD || !process.env.LOCKED_OUT_USERNAME || !process.env.INVALID_PASSWORD) {
    throw new Error('Environment variables for usernames and passwords are not set. Please check your .env file.');
}


const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}>({
    loginPage: ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: ({ page }, use) => use(new InventoryPage(page))
});

test.describe('Apply Filters', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Login as standard user before filter tests', async () => {
      await loginPage.navigate();
      await loginPage.fillUserName(process.env.STANDARD_USERNAME);
      await loginPage.fillPassword(process.env.PASSWORD);
      await loginPage.clickLoginButton();
      await loginPage.checkUrl('https://www.saucedemo.com/v1/inventory.html');
    });
  });
    /*
    This test case verifies that products can be filtered by name in descending order (Z to A).
    Steps:
    1. Select the filter option 'Name (Z to A)' from the dropdown.
    2. Retrieve the names of all products displayed.
    3. Verify that there are 6 products listed.
    4. Sort the product names in descending order (Z to A) and verify that the displayed order matches the sorted order.
    */
    test('Filter Products by Name - Z to A', {
        tag: ['@purchase', '@filter', '@name' ]
    }, async ({ inventoryPage }) => {
      await test.step('Filter products by name Z to A and validate', async () => {
        await inventoryPage.selectProductFilter('Name (Z to A)');

        const productNames = await inventoryPage.getProductNames();
        expect(productNames).toHaveLength(6);

        const sortedProductNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedProductNames);
      });
    }); 

    /*
    This test case verifies that products can be filtered by price in ascending order (Low to High).
    Steps:
    1. Select the filter option 'Price (low to high)' from the dropdown.
    2. Retrieve the prices of all products displayed.
    3. Verify that there are 6 products listed.
    4. Check that each product price is less than or equal to the next product price to ensure correct sorting.
    */
    test('Filter Products by Price - Low to High', {
        tag: ['@purchase', '@filter', '@price' ]
    }, async ({ inventoryPage }) => {
      await test.step('Filter products by price low to high and validate', async () => {
        await inventoryPage.selectProductFilter('Price (low to high)');

        const productPrices = await inventoryPage.getProductPrices();
        expect(productPrices).toHaveLength(6);

        for (let i = 0; i < productPrices.length - 1; i++) {
          expect(productPrices[i]).toBeLessThanOrEqual(productPrices[i + 1]);
        }
      });
    });
});