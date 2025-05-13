import { Page, expect } from '@playwright/test';
import { test } from '../fixtures/auth-fixture';
import { HomePage } from '../pages/home-page';

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/products');
  }

  async addProductToCart(productId: number): Promise<void> {
    await this.page
      .locator(`div.productinfo a[data-product-id="${productId}"]`)
      .click();
    await this.page
      .locator('#cartModal .modal-body:has-text("Your product has been added to cart.")')
      .waitFor({ state: 'visible' });
  }

  async viewProductDetailsByName({
    productName,
  }: {
    productName: string;
  }): Promise<void> {
    const productCard = this.page.locator('.productinfo', {
      hasText: productName,
    });
    const viewProductButton = productCard.locator('a');

    await viewProductButton.scrollIntoViewIfNeeded();
    await viewProductButton.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/.*product-details/),
      viewProductButton.click(),
    ]);
  }

  async searchProduct(productName: string) {
    const searchInput = this.page.locator('input[name="search"]');
    await searchInput.fill(productName);
    await searchInput.press('Enter');
    await expect(this.page).toHaveURL(/.*search/);
  }

  async filterByCategory(category: string, subCategory: string) {
    const categoryLocator = this.page.locator(
      `a[href="#${category.toUpperCase()}"]`
    );
    await categoryLocator.scrollIntoViewIfNeeded();
    await categoryLocator.click();

    const subCategoryLocator = this.page.locator(
      `a[href="/category_products/${subCategory}"]`
    );
    await subCategoryLocator.scrollIntoViewIfNeeded();
    await subCategoryLocator.click();
  }

  async getProductCount() {
    return this.page.locator('.product-image-wrapper').count();
  }

  async getProductTitle() {
    return this.page.textContent('.productinfo h2');
  }

  async getProductPrice() {
    return this.page.textContent('.productinfo p');
  }

  async getProductDescription() {
    return this.page.textContent('.productinfo .product-description');
  }

  async getProductImage() {
    return this.page
      .locator('.product-image-wrapper img')
      .getAttribute('src');
  }

  async getProductCategory() {
    return this.page.textContent('.productinfo .category');
  }
}