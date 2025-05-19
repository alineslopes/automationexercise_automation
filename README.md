# 🧪 Automation Exercise – Playwright Test Suite

This repository contains an automated test suite for [AutomationExercise.com](https://automationexercise.com), built using **Playwright** with **TypeScript**.  
It simulates key user interactions on the e-commerce platform such as searching, filtering, and validating product details.

> 🚧 This project is a **work in progress**. More API tests and additional functional coverage will be added soon.

## 📂 Project Structure

├── fixtures/        # Reusable authentication and setup logic  
├── pages/           # Page Object Model for each screen  
├── tests/           # Test cases organized by feature (UI and API tests)  
├── utils/           # Helper utilities (coming soon)  
├── playwright.config.ts  # Playwright configuration  
└── package.json

## ✅ Features Covered

- Product listing and navigation  
- Product detail validation  
- Category and subcategory filtering  
- Search functionality  
- Cart interaction and assertions  
- **API Testing** including CRUD operations on products, user accounts, and session verification

## 🔧 API Testing with Playwright

The test suite uses Playwright's powerful [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext) to directly interact with AutomationExercise's REST API endpoints. This allows:

- Testing core backend functionality independent of the UI  
- Validating success and error responses for multiple HTTP methods (GET, POST, PUT, DELETE)  
- Verifying request payloads and response content with precise assertions  

## 🎲 Dynamic Test Data with Faker

To make API tests reusable and environment-agnostic, the suite integrates [`@faker-js/faker`](https://fakerjs.dev/) to generate realistic random data for users, products, and addresses. Benefits include:

- Avoiding hardcoded or duplicate test data  
- Supporting multiple test runs without manual cleanup  
- Simulating real-world data scenarios for robust validation  

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/alineslopes/automationexercise_automation.git
cd automationexercise_automation

### 2. Install dependencies
npm install

### 3. Run tests
npx playwright test

## 📈 Work in Progress

 - API Testing using Playwright request or SuperTest
 - Additional negative and edge case coverage
 - CI Integration (GitHub Actions)
 - Test data management and cleanup

## 📬 Contact
Feel free to reach out or open an issue if you'd like to contribute or ask questions!

Made with ❤️ by @alineslopes
