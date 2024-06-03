import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private loginPageTextXPath = '//*[@id="root"]/div/div[1]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async verifyLoginPageText() {
    const element = await this.page.locator(this.loginPageTextXPath);
    const text = await element.textContent();
    return text?.trim() || '';
  }
}
