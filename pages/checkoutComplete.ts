import { expect, Locator, Page, test } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly elements: {
    subHeader: Locator;
    successImage: Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      subHeader: page.locator('.complete-header'),
      successImage: page.locator('.pony_express').first(),
    };
  }


  async checkUrl(url: string) {
    await test.step(`Check URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }


  async checksubHeader(text: string){
    return await test.step('Check sub header', async () => {
      await this.elements.subHeader.waitFor();
      return expect(this.elements.subHeader).toContainText(text);
    });
  }


  async checkSuccessImage(){
    return await test.step('Check success image', async () => {
      await this.elements.successImage.waitFor();
      return expect(this.elements.successImage).toBeVisible();
    });
  }

}