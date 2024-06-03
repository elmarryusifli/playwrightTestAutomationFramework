import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { CheckoutPage } from '../pages/checkout-page';
import { LogoutPage } from '../pages/logout-page';

test.describe('UI end-to-end tests', () => {
  test('should login, add items to cart, checkout, and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const logoutPage = new LogoutPage(page);

    // Step 1: Visit the webpage
    await loginPage.navigate();

    // Step 3: Login with predefined username and password
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert that the user is redirected to the products page
    await expect(page).toHaveURL(/.*inventory.html/);

    // Step 7: Add items to the cart
    await homePage.addItemToCart('sauce-labs-fleece-jacket');
    await homePage.addItemToCart('sauce-labs-bike-light');
    await homePage.addItemToCart('sauce-labs-backpack');

    // Assert that the cart badge shows 3 items
    const cartCount = await homePage.getCartBadgeCount();
    expect(cartCount).toBe('3');

    // Step 8: Remove an item from the cart
    await homePage.removeItemFromCart('sauce-labs-bike-light');

    // Assert that the cart badge shows 2 items
    const updatedCartCount = await homePage.getCartBadgeCount();
    expect(updatedCartCount).toBe('2');

    // Step 9: Proceed to checkout
    await homePage.goToCart();
    await checkoutPage.proceedToCheckout();

    // Step 10: Fill in the checkout information
    await checkoutPage.fillCheckoutInfo('Elmar', 'Yusifli', '12345');

    // Assert that the overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // Step 12: Finish the checkout process
    await checkoutPage.finishCheckout();

    // Step 13: Get the completion message from the CheckoutPage
    const completionMessage = await checkoutPage.getCompletionMessage();
    expect(completionMessage).toBe('Thank you for your order!');

    // Step 15: Navigate back to the products page
    await page.click('#back-to-products');

    // Assert that the user is redirected to the products page
    await expect(page).toHaveURL(/.*inventory.html/);

    // Step 16: Open the menu and log out
    await logoutPage.logout();

    // Assert that the user is redirected to the login page
    const loginPageText = await loginPage.verifyLoginPageText();
    expect(loginPageText).toBe('Swag Labs');
  });
});
