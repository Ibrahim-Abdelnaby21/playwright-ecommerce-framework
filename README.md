# E-Commerce Test Automation Framework

A scalable end-to-end test automation framework built using **Playwright and TypeScript**, covering essential user journeys on the [SauceDemo](https://www.saucedemo.com/) e-commerce application.

## Tech Stack

- **Playwright** – End-to-end browser automation
- **TypeScript** – Test development
- **Page Object Model (POM)** – Maintainable page abstractions
- **Custom Fixtures** – Reusable page object initialization
- **Playwright HTML Reporter** – Test execution reports
- **GitHub Actions** – CI workflow integration

## Test Coverage

The framework currently contains **27 automated test cases** across four modules.

| Module | Tests | Coverage |
|---|---:|---|
| Login | 6 | Valid login, invalid credentials, locked users, required fields |
| Products | 9 | Product visibility, add/remove from cart, sorting |
| Shopping Cart | 5 | Cart contents, product removal, continue shopping |
| Checkout | 7 | Required fields, successful checkout, order overview, total calculation |
| **Total** | **27** | |

## Project Structure

```text
playwright-ecommerce-framework/
├── .github/workflows/
├── fixtures/
│   └── baseTest.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone <YOUR_REPOSITORY_URL>
cd playwright-ecommerce-framework
npm ci
npx playwright install
```

### Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests using Chromium:

```bash
npx playwright test --project=chromium --workers=1
```

Run tests in headed mode:

```bash
npx playwright test --project=chromium --headed
```

Run a specific module:

```bash
npx playwright test tests/checkout.spec.ts --project=chromium
```

### View Test Report

```bash
npx playwright show-report
```

## Framework Design

The project follows the **Page Object Model (POM)** design pattern to separate page interactions from test scenarios.

Custom Playwright fixtures provide reusable page objects, while dedicated test-data files keep test inputs separate from test logic.

The framework uses assertions for UI behavior, navigation, validation errors, cart consistency, and checkout calculations.

## Current Test Results

**Latest reported local regression run:** 27 tests passed on Chromium using one worker.

Cross-browser stability and CI execution will be validated separately.

## Future Improvements

- Expand Firefox and WebKit regression coverage
- Improve navigation reliability
- Refactor repeated test setup
- Add CI execution and reporting improvements
- Extend negative and edge-case testing

## Author

QA Automation Portfolio Project — Playwright & TypeScript
