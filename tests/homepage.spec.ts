import { expect } from '@playwright/test';
import { test } from '../fixtures/auth-fixture';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { SignupPage } from '../pages/signup-page';

test('Logout user', async ({ loggedInPage }) => {
  const homePage = new HomePage(loggedInPage);
  const loggedInText = await homePage.getUsernameLogged();
  expect(loggedInText?.trim()).toContain('TestUser');
  await homePage.logout();
});

test('User can delete their account after signing up', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const homePage = new HomePage(page);

  const randomId = Math.floor(Math.random() * 100000);
  const name = `TestUser${randomId}`;
  const email = `testuser${randomId}@example.com`;
  const password = 'Test@1234';

  // Sign up
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
  await signupPage.clickContinue();

  // Delete account
  await homePage.deleteAccount();

  // Assert deletion
  const successMessage = await page.textContent('h2[data-qa="account-deleted"]');
  expect(successMessage).toContain('Account Deleted!');
});
