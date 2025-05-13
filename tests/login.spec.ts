import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { SignupPage } from '../pages/signup-page';
import { HomePage } from '../pages/home-page';

test('User should not login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('fake@example.com', 'wrongpassword');
  const errorMsg = await loginPage.getLoginErrorMessage();
  expect(errorMsg).toContain('Your email or password is incorrect!');
});

test('User should be able to login with valid credentials after signing up', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const homePage = new HomePage(page);

  const randomId = Math.floor(Math.random() * 100000);
  const name = `TestUser${randomId}`;
  const email = `testuser${randomId}@example.com`;
  const password = 'Test@1234';

  // Sign up flow
  await loginPage.goto();
  await loginPage.enterSignupDetails(name, email);
  await signupPage.fillAccountInformation(password, '10', '5', '1990');
  await signupPage.fillAddressDetails(
    'Betty',
    'Smith',
    '123 Main Street',
    'Canada',
    'Ontario',
    'Toronto',
    'M5V1E3',
    '1234567890'
  );
  await signupPage.createAccount();
  expect(await signupPage.getSuccessMessage()).toContain('Account Created!');
  await signupPage.clickContinue();

  // Logout
  await homePage.logout();

  // Login again with same credentials
  await loginPage.login(email, password);
  const loggedInText = await page.textContent('a:has-text("Logged in as")');
  expect(loggedInText).toContain(name);
});