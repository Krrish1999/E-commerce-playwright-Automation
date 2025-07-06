import { expect, Locator, Page, test } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly elements: {
    productSortContainer : Locator;
    inventoryItems : Locator;
    productName : Locator;
    productPrice : Locator;
    productAddToCartButton : Locator;
    productRemoveButton : Locator;
    shoppingCart : Locator;
    cartItems : Locator;
    checkoutButton : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      productSortContainer: page.getByRole('combobox'),
      inventoryItems: page.locator('.inventory_item'),
      productName: page.locator('.inventory_item_name'),
      productPrice: page.locator('.inventory_item_price'),
      productAddToCartButton: page.getByRole('button', { name: 'ADD TO CART'}),
      productRemoveButton: page.getByRole('button', { name: 'REMOVE'}),
      shoppingCart: page.locator('#shopping_cart_container'),
      cartItems: page.locator('.inventory_item_name'),
      checkoutButton: page.getByRole('link', { name: 'CHECKOUT' }),
    };
  }


  async navigate() {
    await test.step('Navigate to inventory page', async () => {
      await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
      await this.elements.productSortContainer.waitFor();
    });
  }


  async checkUrl(url: string) {
    await test.step(`Check URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

/**
 * Selects a product filter.
 *
 * @param {string} filter - The filter to be selected.
 * @return {Promise<void>} A Promise that resolves when the filter is selected.
 */

  async selectProductFilter(filter: string) {
    await test.step(`Select product filter: ${filter}`, async () => {
      await this.elements.productSortContainer.waitFor();
      await this.elements.productSortContainer.selectOption(filter);
    });
  }

  /**
   * Retrieves the names of all products displayed.
   *
   * @return {Promise<string[]>} Array of product names
   */

  async getProductNames(): Promise<string[]> {
    return await test.step('Get product names', async () => {
      await this.elements.productName.first().waitFor();
      return await this.elements.productName.allTextContents();
    });
  }


  async getProductPrices(): Promise<number[]> {
    return await test.step('Get product prices', async () => {
      await this.elements.productPrice.first().waitFor();
      const priceStrings = await this.elements.productPrice.allTextContents();
      return priceStrings.map(price => parseFloat(price.replace('$', '')));
    });
  }

  /**
   * Adds the product with the specified name to the cart.
   *
   * @param {string} productName - The name of the product to add to the cart.
   */

  async addProductToCart(productName: string) {
    await test.step(`Add product to cart: ${productName}`, async () => {
      const item = this.elements.inventoryItems.filter({ hasText: productName });
      await item.first().waitFor();
      const addButton = item.locator(this.elements.productAddToCartButton);
      await addButton.first().waitFor();
      await addButton.first().click();
    });
  }

  /**
   * Checks the shopping cart count against the provided count.
   *
   * @param {number} count - The expected count to be checked against the shopping cart count.
   */

  async checkShoppingCartCount(count: number) {
    await test.step(`Check shopping cart count: ${count}`, async () => {
      await this.elements.shoppingCart.waitFor();
      await expect(this.elements.shoppingCart).toHaveText(`${count}`);
    });
  }


  async clickShoppingCart() {
    await test.step('Click shopping cart', async () => {
      await this.elements.shoppingCart.waitFor();
      await this.elements.shoppingCart.click();
    });
  }

  /**
   * Retrieves the text content of all cart items on the page.
   *
   * @return {Promise<string[]>} An array of strings representing the text content of cart items.
   */

  async checkCartProducts(): Promise<string[]> {
    return await test.step('Get cart products', async () => {
      await this.elements.cartItems.first().waitFor();
      return await this.elements.cartItems.allTextContents();
    });
  }


  async clickCheckout() {
    await test.step('Click checkout button', async () => {
      await this.elements.checkoutButton.waitFor();
      await this.elements.checkoutButton.click();
    });
  }

}