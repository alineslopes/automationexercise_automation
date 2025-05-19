import { test, expect, request } from '@playwright/test';

test('Get All Products List - API Test', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');

  // Validate response status
  expect(response.status()).toBe(200);

  // Parse and log response body
  const responseBody = await response.json();
  console.log(JSON.stringify(responseBody, null, 2));

  // Validate response structure
  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);

  // Example: Validate that at least one product exists
  expect(responseBody.products.length).toBeGreaterThan(0);
});
