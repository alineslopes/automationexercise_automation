import { test, expect, request } from '@playwright/test';

test('POST to Search Product - Valid Search', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/searchProduct', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      search_product: 'top', 
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(JSON.stringify(body, null, 2));

  // Check structure
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);

  // Check that at least one product is returned
  expect(body.products.length).toBeGreaterThan(0);
});