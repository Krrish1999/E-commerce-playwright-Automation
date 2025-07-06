import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.ts';
import { InventoryPage } from '../pages/inventory.ts';
import { CheckoutYourInfoPage } from '../pages/checkoutYourInfo.ts';
import { CheckoutOverviewPage } from '../pages/checkoutOverview.ts';
import { CheckoutCompletePage } from '../pages/checkoutComplete.ts';
import { configDotenv } from 'dotenv';

configDotenv();
// Ensure environment variables are loaded from .env file
if (!process.env.STANDARD_USERNAME || !process.env.PASSWORD || !process.env.LOCKED_OUT_USERNAME || !process.env.INVALID_PASSWORD) {
    throw new Error('Environment variables for usernames and passwords are not set. Please check your .env file.');
}

const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkOutYourInfoPage: CheckoutYourInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
}>({
    loginPage: ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: ({ page }, use) => use(new InventoryPage(page)),
    checkOutYourInfoPage: ({ page }, use) => use(new CheckoutYourInfoPage(page)),
    checkoutOverviewPage: ({ page }, use) => use(new CheckoutOverviewPage(page)),
    checkoutCompletePage: ({ page }, use) => use(new CheckoutCompletePage(page)),
});

test.describe('Add item and checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.fillUserName(process.env.STANDARD_USERNAME);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();
    await loginPage.checkUrl('https://www.saucedemo.com/v1/inventory.html');
    await inventoryPage.navigate();
  });

    /*
    This test case verifies that the user can add multiple items to the cart and validate the cart contents.
    
    */
    test('Add items to the Cart', async ({ inventoryPage }) => {
        const desiredProducts = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie'];
        
        for (const product of desiredProducts) {
          await inventoryPage.addProductToCart(product);
        }
        await inventoryPage.checkShoppingCartCount(desiredProducts.length);
        await inventoryPage.clickShoppingCart();

        await inventoryPage.checkUrl('https://www.saucedemo.com/v1/cart.html');

        const cartProducts = await inventoryPage.checkCartProducts();
        expect(cartProducts).toHaveLength(desiredProducts.length);
        expect(cartProducts).toEqual(desiredProducts);

    });

    /*
    This test case verifies the checkout process by adding a product to the cart, filling in user information, and completing the checkout.
    */
    test('Perform Checkout', async ({ inventoryPage, checkOutYourInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
      const desiredProduct = ['Sauce Labs Backpack'];
      
      await inventoryPage.addProductToCart(desiredProduct[0]);
      await inventoryPage.checkShoppingCartCount(desiredProduct.length);
      await inventoryPage.clickShoppingCart();

      await inventoryPage.checkUrl('https://www.saucedemo.com/v1/cart.html');

      const cartProducts = await inventoryPage.checkCartProducts();
      expect(cartProducts).toEqual(desiredProduct);

      await inventoryPage.clickCheckout();

      await checkOutYourInfoPage.checkUrl('https://www.saucedemo.com/v1/checkout-step-one.html');

      await checkOutYourInfoPage.fillFirstName('Ram');
      await checkOutYourInfoPage.fillLastName('Bhai');
      await checkOutYourInfoPage.fillZipCode('12345');
      await checkOutYourInfoPage.clickContinueButton();

      await checkOutYourInfoPage.checkUrl('https://www.saucedemo.com/v1/checkout-step-two.html');

      const checkoutProducts = await checkoutOverviewPage.checkCheckoutProducts();
      expect(checkoutProducts).toEqual(desiredProduct);
      await checkoutOverviewPage.clickFinishButton();

      await checkoutCompletePage.checkUrl('https://www.saucedemo.com/v1/checkout-complete.html');
      await checkoutCompletePage.checksubHeader('THANK YOU FOR YOUR ORDER');
  });

});