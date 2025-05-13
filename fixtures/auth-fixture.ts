// fixtures/auth-fixture.ts
import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

type TestUser = {
  email: string;
  password: string;
};

type Fixtures = {
  loginAsTestUser: (user: TestUser) => Promise<void>;
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loginAsTestUser: async ({ page }, use) => {
    const login = async (user: TestUser) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.email, user.password);
    };
    await use(login);
  },

  loggedInPage: async ({ page }, use) => {
    const testUser = {
      email: 'alinetestuser123@example.com',
      password: 'Test@1234',
    };

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser.email, testUser.password);
    
    // Optionally assert login success before test
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

    await use(page);
  },
});