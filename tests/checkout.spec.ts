
import { test, expect } from '../fixtures/baseTest';
import { users } from '../test-data/users';

test('Navigate to checkout page', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add product
  await productsPage.addToCartButton.click();

  // Open cart and start checkout
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Verify checkout page URL
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // Verify customer information fields
  await expect(checkoutPage.firstNameInput).toBeVisible();
  await expect(checkoutPage.lastNameInput).toBeVisible();
  await expect(checkoutPage.postalCodeInput).toBeVisible();

});

test('Checkout with empty fields', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add product to cart
  await productsPage.addToCartButton.click();

  // Navigate to checkout
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Continue without entering information
  await checkoutPage.continueButton.click();

  // Verify validation error
  await expect(checkoutPage.errorMessage)
    .toContainText('First Name is required');

  // Verify user remains on checkout step one
  await expect(page).toHaveURL(/checkout-step-one\.html/);

});

test('Checkout with empty last name', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add product to cart
  await productsPage.addToCartButton.click();

  // Navigate to checkout
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Fill first name and postal code only
  await checkoutPage.firstNameInput.fill('Ahmed');
  await checkoutPage.postalCodeInput.fill('21500');

  // Leave last name empty
  await checkoutPage.continueButton.click();

  // Verify validation error
  await expect(checkoutPage.errorMessage)
    .toContainText('Last Name is required');

  // Verify user stays on checkout step one
  await expect(page).toHaveURL(/checkout-step-one\.html/);

});

test('Checkout with empty postal code', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add product to cart
  await productsPage.addToCartButton.click();

  // Navigate to checkout
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Fill first name and last name only
  await checkoutPage.firstNameInput.fill('Ahmed');
  await checkoutPage.lastNameInput.fill('Mohamed');

  // Leave postal code empty
  await checkoutPage.continueButton.click();

  // Verify validation error
  await expect(checkoutPage.errorMessage)
    .toContainText('Postal Code is required');

  // Verify user stays on checkout step one
  await expect(page).toHaveURL(/checkout-step-one\.html/);

});

test('Complete checkout successfully', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  // Login
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add product to cart
  await productsPage.addToCartButton.click();

  // Open cart and checkout
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Fill customer information
 await checkoutPage.fillCustomerInformation(
  'Ahmed',
  'Mohamed',
  '21500'
);

  // Verify overview page
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // Finish checkout
  await checkoutPage.finishButton.click();

  // Verify successful order
  await expect(page).toHaveURL(/checkout-complete\.html/);

  await expect(checkoutPage.confirmationMessage)
    .toHaveText('Thank you for your order!');

});

test('Verify order overview details', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  // Login
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Capture product price before adding to cart
  const expectedPrice = await page.locator(
    '[data-test="inventory-item"]:has([data-test="inventory-item-name"]:text-is("Sauce Labs Backpack")) [data-test="inventory-item-price"]'
  ).textContent();

  // Add product
  await productsPage.addToCartButton.click();

  // Navigate to checkout
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Fill customer information
  await checkoutPage.fillCustomerInformation(
  'Ahmed',
  'Mohamed',
  '21500'
);

  // Verify overview page
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // Verify product name
  await expect(checkoutPage.overviewProductName)
    .toHaveText('Sauce Labs Backpack');

  // Verify product price matches the original price
  expect(expectedPrice).not.toBeNull();

  await expect(checkoutPage.overviewProductPrice)
    .toHaveText(expectedPrice!);

});

test('Verify order total calculation', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  // Login
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add product and start checkout
  await productsPage.addToCartButton.click();
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Fill customer information
  await checkoutPage.fillCustomerInformation(
  'Ahmed',
  'Mohamed',
  '21500'
);

  // Verify checkout overview page
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // Read subtotal, tax and total
  const subtotalText = await checkoutPage.subtotalLabel.innerText();
  const taxText = await checkoutPage.taxLabel.innerText();
  const totalText = await checkoutPage.totalLabel.innerText();

  // Convert displayed amounts to integer cents
  const toCents = (text: string): number => {
    const amount = text.match(/\$(\d+)\.(\d{2})/);

    if (!amount) {
      throw new Error(`Invalid monetary value: ${text}`);
    }

    return Number(amount[1]) * 100 + Number(amount[2]);
  };

  const subtotal = toCents(subtotalText);
  const tax = toCents(taxText);
  const total = toCents(totalText);

  // Verify calculation
  expect(total).toBe(subtotal + tax);

});
