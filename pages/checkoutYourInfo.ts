import { expect, Locator, Page, test } from '@playwright/test';

export class CheckoutYourInfoPage {
  readonly page: Page;
  readonly elements: {
    firstNameInput : Locator;
    lastNameInput : Locator;
    zipCodeInput : Locator;
    continueButton : Locator;
    cancelButton : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      firstNameInput: page.locator('[data-test="firstName"]'),
      lastNameInput: page.locator('[data-test="lastName"]'),
      zipCodeInput: page.locator('[data-test="postalCode"]'),
      continueButton: page.getByRole('button', { name: 'CONTINUE' }),
      cancelButton: page.getByRole('link', { name: 'CANCEL' }),
    };
  }


  async navigate() {
    await test.step('Navigate to checkout your info page', async () => {
      await this.page.goto('https://www.saucedemo.com/v1/checkout-step-one.html');
      await this.elements.firstNameInput.waitFor();
    });
  }


  async checkUrl(url: string) {
    await test.step(`Check URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }


  async fillFirstName(firstName: string) {
    await test.step('Fill first name', async () => {
      await this.elements.firstNameInput.waitFor();
      await this.elements.firstNameInput.fill(firstName);
    });
  }


  async fillLastName(lastName: string) {
    await test.step('Fill last name', async () => {
      await this.elements.lastNameInput.waitFor();
      await this.elements.lastNameInput.fill(lastName);
    });
  }


  async fillZipCode(zipCode: string) {
    await test.step('Fill zip code', async () => {
      await this.elements.zipCodeInput.waitFor();
      await this.elements.zipCodeInput.fill(zipCode);
    });
  }


  async clickContinueButton() {
    await test.step('Click continue button', async () => {
      await this.elements.continueButton.waitFor();
      await this.elements.continueButton.click();
    });
  }

}