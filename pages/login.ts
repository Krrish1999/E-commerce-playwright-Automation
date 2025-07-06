import { expect, Locator, Page, test } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly elements: {
    userNameInput : Locator;
    passwordInput : Locator;
    loginButton : Locator;
    errorText : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      userNameInput : page.locator('#user-name'),
      passwordInput : page.locator('#password'),
      loginButton : page.locator('#login-button'),
      errorText : page.locator('[data-test="error"]'),
    };
  }


  async navigate() {
    await test.step('Navigate to login page', async () => {
      await this.page.goto('https://www.saucedemo.com/v1/index.html');
      await this.elements.userNameInput.waitFor();
    });
  }

  async checkUrl(url: string) {
    await test.step(`Check URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  async fillUserName(username) {
    await test.step('Fill username', async () => {
      await this.elements.userNameInput.waitFor();
      await this.elements.userNameInput.fill(username);
    });
  }


  async fillPassword(password) {
    await test.step('Fill password', async () => {
      await this.elements.passwordInput.waitFor();
      await this.elements.passwordInput.fill(password);
    });
  }


  async clickLoginButton() {
    await test.step('Click login button', async () => {
      await this.elements.loginButton.waitFor();
      await this.elements.loginButton.click();
    });
  }


  async checkErrorMessage() {
    await test.step('Check error message', async () => {
      await this.elements.errorText.waitFor();
      await expect(this.elements.errorText).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
  }

}