import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    await this.page.click('#checkout');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    await this.page.click('#continue');
  }

  async finishCheckout() {
    await this.page.click('#finish');
  }

  async getCompletionMessage() {
    const completeMessageXPath = '//*[@id="checkout_complete_container"]/h2';
    const completeMessageElement = await this.page.locator(completeMessageXPath);
    const textContent = await completeMessageElement.textContent();
    return textContent?.trim() || '';
  }
}
