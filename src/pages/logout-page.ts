import { Page } from '@playwright/test';

export class LogoutPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    const logoutXPath = '//*[@id="logout_sidebar_link"]';
    await this.page.click(logoutXPath);
  }
}
