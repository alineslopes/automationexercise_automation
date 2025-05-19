import { test, expect, request } from '@playwright/test';

test('DELETE User Account - Valid Email and Password', async ({ request }) => {
  const email = 'testuser@example.com';      // Use a real test account
  const password = 'testpassword';           // Must match

  // Send email and password as form data in the request body
  const url = 'https://automationexercise.com/api/deleteAccount';

  const response = await request.delete(url, {
    form: {
      email,
      password
    }
  });
  const responseBody = await response.text();
  console.log('Response Body:', responseBody);

  expect(response.status()).toBe(200);
  expect(responseBody.toLowerCase()).toContain('{\"responsecode\": 404, \"message\": \"account not found!\"}');
});