import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    const itemXPath = `//*[@id="add-to-cart-${itemName}"]`;
    await this.page.click(itemXPath);
  }

  async removeItemFromCart(itemName: string) {
    const itemXPath = `//*[@id="remove-${itemName}"]`;
    await this.page.click(itemXPath);
  }

  async getCartBadgeCount() {
    const cartBadge = await this.page.locator('.shopping_cart_badge');
    return await cartBadge.textContent();
  }

  async goToCart() {
    await this.page.click('#shopping_cart_container a');
  }
}
