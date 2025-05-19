import { test, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Signup then Update User Account with Dynamic Data', async ({ request }) => {
  // 1. Generate fake user
  const email = faker.internet.email();
  const password = faker.internet.password();
  const name = faker.person.fullName();
  const title = faker.helpers.arrayElement(['Mr', 'Mrs', 'Miss']);
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const company = faker.company.name();
  const address1 = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const country = 'Canada';
  const zipcode = faker.location.zipCode();
  const state = faker.location.state();
  const city = faker.location.city();
  const mobile_number = faker.phone.number({ style: 'national' });

  // 2. Signup (API 10)
  const signupResponse = await request.post('https://automationexercise.com/api/createAccount', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      name,
      email,
      password,
      title,
      birth_date: '15',
      birth_month: '05',
      birth_year: '1995',
      firstname,
      lastname,
      company,
      address1,
      address2,
      country,
      zipcode,
      state,
      city,
      mobile_number
    },
  });

  const signupBody = await signupResponse.text();
  console.log('Signup Response:', signupBody);
  expect(signupResponse.status()).toBe(200);
  expect(signupBody.toLowerCase()).toContain('user created');

  // 3. Update Account (API 13)
  const updateResponse = await request.put('https://automationexercise.com/api/updateAccount', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      name,
      email,
      password,
      title,
      birth_date: '15',
      birth_month: '05',
      birth_year: '1995',
      firstname,
      lastname,
      company,
      address1,
      address2,
      country,
      zipcode,
      state,
      city,
      mobile_number
    },
  });

  const updateBody = await updateResponse.text();
  console.log('Update Response:', updateBody);

  expect(updateResponse.status()).toBe(200);
  expect(updateBody.toLowerCase()).toContain('user updated');
});