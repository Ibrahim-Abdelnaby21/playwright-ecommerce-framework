
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;
  readonly overviewProductName: Locator;
  readonly overviewProductPrice: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('[data-test="complete-header"]');
    this.overviewProductName = page.locator(
   '[data-test="inventory-item-name"]');
    this.overviewProductPrice = page.locator(
   '[data-test="inventory-item-price"]');
   this.subtotalLabel = page.locator(
  '[data-test="subtotal-label"]');
   this.taxLabel = page.locator(
  '[data-test="tax-label"]');
   this.totalLabel = page.locator(
  '[data-test="total-label"]');
  }
  
async fillCustomerInformation(
  firstName: string,
  lastName: string,
  postalCode: string
) {
  await this.firstNameInput.fill(firstName);
  await this.lastNameInput.fill(lastName);
  await this.postalCodeInput.fill(postalCode);
  await this.continueButton.click();
}

}
