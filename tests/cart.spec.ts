
import { test, expect } from '../fixtures/baseTest';
import { users } from '../test-data/users';

test('Added product appears in cart', async ({
  page,
  loginPage,
  productsPage,
  cartPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.addToCartButton.click();

  await cartPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);

  await expect(cartPage.cartItems).toHaveCount(1);

  await expect(cartPage.productNames)
    .toContainText(['Sauce Labs Backpack']);

});

test('Multiple products appear in cart', async ({
  page,
  loginPage,
  productsPage,
  cartPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add two different products
  await productsPage.addToCartButton.click();
  await productsPage.bikeLightButton.click();

  // Verify cart badge
  await expect(productsPage.cartBadge).toHaveText('2');

  // Open shopping cart
  await cartPage.openCart();

  // Verify cart contains exactly two products
  await expect(cartPage.cartItems).toHaveCount(2);

  // Verify the correct products are displayed
  await expect(cartPage.productNames).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
  ]);

});

test('Remove product from cart page', async ({
  page,
  loginPage,
  productsPage,
  cartPage
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

  // Open cart
  await cartPage.openCart();

  // Verify product exists
  await expect(cartPage.productNames)
    .toContainText(['Sauce Labs Backpack']);

  // Remove product
  await cartPage.removeBackpackButton.click();

  // Verify cart is empty
  await expect(cartPage.cartItems).toHaveCount(0);

  // Verify cart badge disappears
  await expect(cartPage.cartBadge).toHaveCount(0);

});

test('Remove one product and keep the other', async ({
  page,
  loginPage,
  productsPage,
  cartPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add two products
  await productsPage.addToCartButton.click();
  await productsPage.bikeLightButton.click();

  // Open cart
  await cartPage.openCart();

  // Verify two products exist
  await expect(cartPage.cartItems).toHaveCount(2);

  // Remove Backpack only
  await cartPage.removeBackpackButton.click();

  // Verify one product remains
  await expect(cartPage.cartItems).toHaveCount(1);

  // Verify remaining product is Bike Light
  await expect(cartPage.productNames)
    .toHaveText(['Sauce Labs Bike Light']);

  // Verify cart badge updated
  await expect(cartPage.cartBadge).toHaveText('1');

});

test('Continue shopping from cart', async ({
  page,
  loginPage,
  productsPage,
  cartPage
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

  // Open cart
  await cartPage.openCart();

  // Verify cart contains the product
  await expect(cartPage.cartItems).toHaveCount(1);

  // Click Continue Shopping
  await cartPage.continueShoppingButton.click();

  // Verify navigation back to products page
  await expect(page).toHaveURL(/inventory\.html/);

  // Verify products page is displayed
  await expect(productsPage.pageTitle).toHaveText('Products');

  // Verify product remains in cart
  await expect(productsPage.cartBadge).toHaveText('1');

  // Verify the product is still marked as added
  await expect(productsPage.removeButton).toBeVisible();

});
