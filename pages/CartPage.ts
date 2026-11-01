
import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly removeBackpackButton: Locator;
  readonly cartBadge: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.removeBackpackButton = page.locator(
   '[data-test="remove-sauce-labs-backpack"]');
   this.cartBadge = page.locator(
   '[data-test="shopping-cart-badge"]');
   this.continueShoppingButton = page.locator(
   '[data-test="continue-shopping"]');
   this.checkoutButton = page.locator(
   '[data-test="checkout"]');
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
