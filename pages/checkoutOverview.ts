import { expect, Locator, Page, test } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly elements: {
    cartItems : Locator;
    productPrice : Locator;
    productQuantity : Locator;
    totalPrice : Locator;
    finishButton : Locator;
    cancelButton : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      cartItems: page.locator('.inventory_item_name'),
      productPrice: page.locator('.inventory_item_price'),
      productQuantity: page.locator('.summary_quantity'),
      totalPrice: page.locator('.summary_subtotal_label'),
      finishButton: page.getByRole('link', { name: 'FINISH'}),
      cancelButton: page.getByRole('link', { name: 'CANCEL'}),
    };
  }

  /**
   * Checks if the current page URL matches the provided URL.
   *
   * @param {string} url - The URL to compare with the current page URL.
   */
  async checkUrl(url: string) {
    await test.step(`Check URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  /**
   * Retrieves the text content of all cart items on the page.
   *
   * @return {Promise<string[]>} An array of strings representing the text content of cart items.
   */
  async checkCheckoutProducts(): Promise<string[]> {
    return await test.step('Get checkout products', async () => {
      await this.elements.cartItems.first().waitFor();
      return await this.elements.cartItems.allTextContents();
    });
  }
  /**
   * Clicks the finish button on the page.
   *
   * @return {Promise<void>} A promise that resolves when the finish button is clicked.
   */

  async clickFinishButton() {
    await test.step('Click finish button', async () => {
      await this.elements.finishButton.waitFor();
      await this.elements.finishButton.click();
    });
  }

}