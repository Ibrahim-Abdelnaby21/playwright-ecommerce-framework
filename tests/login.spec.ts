
import { test, expect } from '../fixtures/baseTest';
import { users } from '../test-data/users';

test.beforeEach(async ({ page }) => {

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'domcontentloaded'
  });

});

test('Login with valid credentials', async ({ page, loginPage }) => {

await loginPage.login(
  users.standard.username,
  users.standard.password
);
  await expect(page).toHaveURL(/inventory\.html/);

});

test('Login with invalid password',  async ({ page, loginPage })=> {
  
await loginPage.login(
  users.invalid.username,
  users.invalid.password
);
 await expect(loginPage.errorMessage)
  .toContainText('Username and password do not match');
});

test('Login with locked out user',  async ({ page, loginPage }) => {

await loginPage.login(
  users.locked.username,
  users.locked.password
);
  await expect(loginPage.errorMessage)
    .toContainText('Sorry, this user has been locked out');

});

test('Login with empty credentials', async ({ loginPage }) => {

  await loginPage.login('', '');

  await expect(loginPage.errorMessage)
    .toContainText('Username is required');

});


test('Login with empty password', async ({ loginPage }) => {

  await loginPage.login(
    users.standard.username,
    ''
  );

  await expect(loginPage.errorMessage)
    .toContainText('Password is required');

});

test('Login with empty username', async ({ loginPage }) => {

  await loginPage.login(
    '',
    users.standard.password
  );

  await expect(loginPage.errorMessage)
    .toContainText('Username is required');

});




