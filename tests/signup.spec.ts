import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { SignupPage } from '../pages/signup-page';

test('User should be able to sign up successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);

  const randomId = Math.floor(Math.random() * 100000);
  const name = `TestUser${randomId}`;
  const email = `testuser${randomId}@example.com`;

  await loginPage.goto();
  await loginPage.enterSignupDetails(name, email);
  await signupPage.fillAccountInformation('Test@1234', '10', '5', '1990');
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

  const successMessage = await signupPage.getSuccessMessage();
  expect(successMessage).toContain('Account Created!');

  await signupPage.clickContinue();
});

test('User should not be able to sign up with existing email', async ({ page }) => {
});

test('User should not be able to sign up with invalid email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);

  await loginPage.goto();
  await loginPage.enterSignupDetails('InvalidEmail', 'invalidemail');
  await signupPage.fillAccountInformation('Test@1234', '10', '5', '1990');
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

  const errorMessage = await page.textContent('.alert-danger');
  expect(errorMessage).toContain('Invalid email address');
});