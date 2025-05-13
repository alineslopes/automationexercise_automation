import { expect } from '@playwright/test';
import { test } from '../fixtures/auth-fixture';
import { HomePage } from '../pages/home-page';
import { ProductsPage } from '../pages/products-page';

test('User should be able to view products', async ({ loggedInPage }) => {
  const homePage = new HomePage(loggedInPage);
  await homePage.gotoProductsPage();
  const productTitle = await loggedInPage.textContent('.productinfo h2');
  expect(productTitle).toContain('Rs. 500');
});

test('User should be able to add product to cart', async ({ loggedInPage }) => {
  const homePage = new HomePage(loggedInPage);
  const productsPage = new ProductsPage(loggedInPage);

  await homePage.gotoProductsPage();
  await productsPage.addProductToCart(3);
});