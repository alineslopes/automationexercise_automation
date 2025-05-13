import { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/signup');
  }

  async enterSignupDetails(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }

  async fillAccountInformation(password: string, day: string, month: string, year: string) {
    await this.page.check('#id_gender1');
    await this.page.fill('#password', password);
    await this.page.selectOption('#days', day);
    await this.page.selectOption('#months', month);
    await this.page.selectOption('#years', year);
  }

  async fillAddressDetails(firstName: string, lastName: string, address: string, country: string, state: string, city: string, zip: string, mobile: string) {
    await this.page.fill('#first_name', firstName);
    await this.page.fill('#last_name', lastName);
    await this.page.fill('#address1', address);
    await this.page.selectOption('#country', country);
    await this.page.fill('#state', state);
    await this.page.fill('#city', city);
    await this.page.fill('#zipcode', zip);
    await this.page.fill('#mobile_number', mobile);
  }

  async createAccount() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async getSuccessMessage() {
    return this.page.textContent('h2[data-qa="account-created"]');
  }
 
  async clickContinue() {
    await this.page.click('a[data-qa="continue-button"]');
  }
}
