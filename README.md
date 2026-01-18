# Advantage Online Shopping - Automated Test Suite

## Overview

This repository contains an automated end-to-end test suite for the Advantage Online Shopping e-commerce website using **Playwright** with **TypeScript**. The test suite validates critical user journeys including user registration, authentication, shopping cart operations, and checkout processes.

**Website Under Test**: https://www.advantageonlineshopping.com/

## Project Structure

```
.
├── src/
│   └── pages/                    # Page Object Model classes
│       ├── BasePage.ts           # Base class with common methods
│       ├── HomePage.ts           # Home page object
│       ├── LoginPage.ts          # Login page object
│       ├── RegisterPage.ts       # Registration page object
│       ├── ProductPage.ts        # Product details page object
│       ├── CartPage.ts           # Shopping cart page object
│       └── CheckoutPage.ts       # Checkout page object
├── tests/
│   ├── auth.spec.ts              # Authentication tests
│   └── shopping.spec.ts          # Shopping and checkout tests
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
└── README.md                      # This file
```

## Technology Stack

- **Playwright Test Runner**: Modern browser automation framework
- **TypeScript**: Type-safe test development
- **Node.js**: Runtime environment
- **Page Object Model (POM)**: Design pattern for maintainable tests

## Prerequisites

### Installation

1. **Clone the repository**
```bash
git clone git@github.com:Gritterr/Advantage_online_shopping_playwright.git
```

2. **Install dependencies**
```bash
npm install
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)

The test suite is configured to:
- Run tests in **Chromium** browser
- Use baseURL: `https://www.advantageonlineshopping.com`
- Generate HTML test reports
- Capture screenshots on test failure
- Enable trace recording on first retry
- Timeout for each test: 30000ms (default)


## Test Scenarios

### 1. Authentication Tests (`tests/auth.spec.ts`)

#### Test 1: Create a New User Account

#### Test 2: Login with Valid Credentials

#### Test 3: Logout Successfully

#### Test 4: Invalid Login Credentials Error Handling

#### Test 5: Empty Form Validation

### 2. Shopping and Checkout Tests (`tests/shopping.spec.ts`)

#### Test 1: Add Product to Cart (Logged-Out User)

#### Test 2: Add Product to Cart (Logged-In User)

#### Test 3: Checkout Redirect (Logged-Out User)

#### Test 4: Complete Checkout Flow (Logged-In User)

## Running Tests

### Run All Tests
```bash
npx playwright test
```

## Test Execution Output

After running tests, Playwright generates:

1. **HTML Report** (`playwright-report/index.html`)
   - Visual test results
   - Detailed test execution timeline
   - Screenshots of failures
   - Video recordings (if enabled)

2. **Trace Files** (`.playwright/trace.zip`)
   - Full execution trace for debugging
   - Network requests and responses
   - DOM snapshots
   - Screenshots at key points

### View Test Report
```bash
npx playwright show-report
```

## Page Object Model Structure

### BasePage
Base class containing common methods used across all pages:

### HomePage

### LoginPage

### RegisterPage

### ProductPage

### CartPage

### CheckoutPage

## Best Practices Implemented

1. **Page Object Model**: Separates test logic from page interactions
2. **Unique Test Data**: Uses timestamps to generate unique user credentials
3. **Explicit Waits**: Uses appropriate timeouts and wait conditions
4. **Error Handling**: Tests handle both success and error scenarios
5. **Reusable Methods**: Base page class reduces code duplication
6. **Type Safety**: Full TypeScript typing for better IDE support
7. **Meaningful Assertions**: Clear expectations for test outcomes
8. **Test Independence**: Tests can run in any order without dependencies

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Framework](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Best Practices](https://playwright.dev/docs/best-practices)

---

