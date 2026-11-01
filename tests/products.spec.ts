
import { test, expect } from '../fixtures/baseTest';
import { users } from '../test-data/users';

test('Products page displays after login', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory\.html/);

  await expect(productsPage.pageTitle).toHaveText('Products');

});

test('Add product to cart', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.addToCartButton.click();

  await expect(productsPage.cartBadge).toHaveText('1');

});

test('Remove button appears after adding product', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.addToCartButton.click();

  await expect(productsPage.removeButton).toBeVisible();

  await expect(productsPage.addToCartButton).toHaveCount(0);

});

test('Remove product from cart', async ({
  page,
  loginPage,
  productsPage
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

  await expect(productsPage.cartBadge).toHaveText('1');

  // Remove product from cart
  await productsPage.removeButton.click();

  // Verify product is removed
  await expect(productsPage.cartBadge).toHaveCount(0);

  await expect(productsPage.addToCartButton).toBeVisible();

});

test('Add multiple products to cart', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Add first product
  await productsPage.addToCartButton.click();

  // Add second product
  await productsPage.bikeLightButton.click();

  // Verify cart badge
  await expect(productsPage.cartBadge).toHaveText('2');

});

test('Sort products by price low to high', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Select sorting option
  await productsPage.sortDropdown.selectOption('lohi');

  // Get all product prices
  const priceTexts = await productsPage.productPrices.allTextContents();

  // Convert prices from strings to numbers
  const prices = priceTexts.map(price =>
    Number(price.replace('$', ''))
  );

  // Create expected sorted array
  const sortedPrices = [...prices].sort((a, b) => a - b);

  // Verify correct sorting
  expect(prices).toEqual(sortedPrices);

});

test('Sort products by price high to low', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Select high to low sorting
  await productsPage.sortDropdown.selectOption('hilo');

  // Get product prices
  const priceTexts = await productsPage.productPrices.allTextContents();

  // Convert prices to numbers
  const prices = priceTexts.map(price =>
    Number(price.replace('$', ''))
  );

  // Sort expected prices in descending order
  const sortedPrices = [...prices].sort((a, b) => b - a);

  // Verify sorting
  expect(prices).toEqual(sortedPrices);

});

test('Sort products by name A to Z', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Select Name A to Z
  await productsPage.sortDropdown.selectOption('az');

  // Get product names
  const names = await productsPage.productNames.allTextContents();

  // Create expected alphabetical order
  const sortedNames = [...names].sort((a, b) =>
    a.localeCompare(b, 'en')
  );

  // Verify sorting
  expect(names.length).toBeGreaterThan(0);
  expect(names).toEqual(sortedNames);

});

test('Sort products by name Z to A', async ({
  page,
  loginPage,
  productsPage
}) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'commit'
  });

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  // Select Name Z to A
  await productsPage.sortDropdown.selectOption('za');

  // Get product names
  const names = await productsPage.productNames.allTextContents();

  // Create expected descending order
  const sortedNames = [...names].sort((a, b) =>
    b.localeCompare(a, 'en')
  );

  // Verify sorting
  expect(names.length).toBeGreaterThan(0);
  expect(names).toEqual(sortedNames);

});
