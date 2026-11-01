
import { Page, Locator } from '@playwright/test';

export class ProductsPage {

  readonly page: Page;
  readonly pageTitle: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly removeButton: Locator;
  readonly bikeLightButton: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly productNames: Locator;
  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');this.removeButton = page.locator(
    '[data-test="remove-sauce-labs-backpack"]');
    this.bikeLightButton = page.locator( '[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');

  }

}

