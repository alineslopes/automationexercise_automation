import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async getTitle() {
    return this.page.title();
  }

  async getHeaderText() {
    return this.page.textContent('h1');
  }

  async getSubHeaderText() {
    return this.page.textContent('h2');
  }

  async gotoProductsPage() {
    const productsLink = this.page.locator('a[href="/products"]');
    await productsLink.waitFor({ state: 'visible' });
    await productsLink.click();
    await expect(this.page).toHaveURL(/.*products/);
  }

  async getProductCount() {
    return this.page.locator('.product-image-wrapper').count();
  }

  async logout(): Promise<void> {
    const logoutLink = this.page.locator('a[href="/logout"]');
    await logoutLink.waitFor({ state: 'visible', timeout: 10000 });
    await logoutLink.click();
    await expect(this.page).toHaveURL(/.*login/);
  }

  async deleteAccount(): Promise<void> {
    const deleteLink = this.page.locator('a[href="/delete_account"]');
    await deleteLink.waitFor({ state: 'visible' });
    await deleteLink.click();
    await this.page.waitForSelector('h2[data-qa="account-deleted"]');
  }

  async getUsernameLogged(): Promise<string | null> {
    const locator = this.page.locator('a:has-text("Logged in as")');
    await locator.waitFor(); // Wait for it to be visible
    return locator.textContent();
  }

}