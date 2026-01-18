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

### System Requirements
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **OS**: Windows, macOS, or Linux
- **Browser**: Chromium (automatically installed with Playwright)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/playwright-ecommerce-automation.git
cd playwright-ecommerce-automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install chromium
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

### TypeScript Configuration (`tsconfig.json`)

TypeScript is configured with strict mode enabled for type safety.

## Test Scenarios

### 1. Authentication Tests (`tests/auth.spec.ts`)

#### Test 1: Create a New User Account
- **Objective**: Verify user can successfully create a new account
- **Steps**:
  1. Navigate to the registration page
  2. Fill out registration form with unique credentials
  3. Submit the form
  4. Verify successful account creation

#### Test 2: Login with Valid Credentials
- **Objective**: Verify user can login with correct credentials
- **Steps**:
  1. Register a test user
  2. Navigate to login page
  3. Enter valid email and password
  4. Verify successful login and user is authenticated

#### Test 3: Logout Successfully
- **Objective**: Verify user can logout from their account
- **Steps**:
  1. Register and login a test user
  2. Click user menu and logout
  3. Verify user is logged out and session is cleared

#### Test 4: Invalid Login Credentials Error Handling
- **Objective**: Verify appropriate error message for invalid login attempts
- **Steps**:
  1. Navigate to login page
  2. Attempt login with invalid email/password
  3. Verify error message is displayed
  4. Verify user remains on login page

#### Test 5: Empty Form Validation
- **Objective**: Verify validation errors when submitting empty login form
- **Steps**:
  1. Navigate to login page
  2. Click login without filling form
  3. Verify validation errors are shown

### 2. Shopping and Checkout Tests (`tests/shopping.spec.ts`)

#### Test 1: Add Product to Cart (Logged-Out User)
- **Objective**: Verify logged-out user can add items to cart
- **Steps**:
  1. Ensure user is logged out
  2. Navigate to home page
  3. Select and view a product
  4. Click "Add to Cart"
  5. Verify item appears in shopping cart

#### Test 2: Add Product to Cart (Logged-In User)
- **Objective**: Verify logged-in user can add items to cart
- **Steps**:
  1. Register and login a test user
  2. Navigate to home page
  3. Select and view a product
  4. Click "Add to Cart"
  5. Verify item appears in shopping cart

#### Test 3: Checkout Redirect (Logged-Out User)
- **Objective**: Verify logged-out user is redirected to login during checkout
- **Steps**:
  1. Ensure user is logged out
  2. Add a product to cart
  3. Proceed to checkout
  4. Verify user is redirected to login page

#### Test 4: Complete Checkout Flow (Logged-In User)
- **Objective**: Verify logged-in user can complete checkout
- **Steps**:
  1. Register and login a test user
  2. Add product to cart
  3. Proceed to checkout
  4. Fill shipping address information
  5. Fill payment information
  6. Place order
  7. Verify order confirmation

#### Test 5: Display Cart Total
- **Objective**: Verify cart displays correct total price
- **Steps**:
  1. Register and login a test user
  2. Add product to cart
  3. Navigate to cart page
  4. Verify cart total is displayed and formatted correctly

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
# Run authentication tests only
npm run test:auth

# Run shopping and checkout tests only
npm run test:shopping
```

### Run Tests in Chromium Only
```bash
npm run test:chromium
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Tests with Specific Configuration
```bash
# Run tests with trace recording
npx playwright test --trace on

# Run tests with headed browser (show browser window)
npx playwright test --headed

# Run tests on specific browser
npx playwright test --project=chromium
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
- `navigate(path)`: Navigate to a specific URL
- `click(selector)`: Click an element
- `fill(selector, value)`: Fill form inputs
- `getText(selector)`: Get element text
- `isVisible(selector)`: Check element visibility
- `getUrl()`: Get current URL

### HomePage
- `goto()`: Navigate to home page
- `clickUserMenu()`: Open user menu
- `clickLogout()`: Logout user
- `OpenUserMenu()`: Navigate to login
- `clickSignUp()`: Navigate to registration
- `selectFirstProduct()`: Click first product
- `isUserLoggedIn()`: Check login status

### LoginPage
- `goto()`: Navigate to login page
- `login(email, password)`: Perform login
- `fillEmail(email)`: Fill email field
- `fillPassword(password)`: Fill password field
- `clickLoginButton()`: Click login button
- `getErrorMessage()`: Get error message text
- `isErrorDisplayed()`: Check if error is shown

### RegisterPage
- `goto()`: Navigate to registration page
- `register(...)`: Complete registration
- `fillUsername(username)`: Fill username
- `fillEmail(email)`: Fill email
- `fillPassword(password)`: Fill password
- `fillConfirmPassword(confirm)`: Fill confirm password
- `clickRegisterButton()`: Submit registration

### ProductPage
- `getProductName()`: Get product name
- `getProductPrice()`: Get product price
- `addToCart()`: Add product to cart
- `setQuantity(quantity)`: Set product quantity
- `isAddToCartButtonVisible()`: Check button visibility

### CartPage
- `goto()`: Navigate to cart page
- `getCartItemCount()`: Get number of items in cart
- `getCartItems()`: Get count of cart items
- `isCartEmpty()`: Check if cart is empty
- `getCartTotal()`: Get cart total price
- `proceedToCheckout()`: Start checkout
- `removeItem(index)`: Remove item from cart

### CheckoutPage
- `goto()`: Navigate to checkout page
- `fillShippingAddress(...)`: Fill address fields
- `fillPaymentInfo(...)`: Fill payment fields
- `placeOrder()`: Complete the order
- `isOrderConfirmationDisplayed()`: Check order confirmation
- `isCheckoutFormVisible()`: Check form visibility

## Best Practices Implemented

1. **Page Object Model**: Separates test logic from page interactions
2. **Unique Test Data**: Uses timestamps to generate unique user credentials
3. **Explicit Waits**: Uses appropriate timeouts and wait conditions
4. **Error Handling**: Tests handle both success and error scenarios
5. **Reusable Methods**: Base page class reduces code duplication
6. **Type Safety**: Full TypeScript typing for better IDE support
7. **Meaningful Assertions**: Clear expectations for test outcomes
8. **Test Independence**: Tests can run in any order without dependencies

## Troubleshooting

### Issue: Tests timeout
**Solution**: Increase timeout in playwright.config.ts or individual tests
```typescript
test('my test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
});
```

### Issue: Element not found
**Solution**: 
- Verify selectors are correct using browser DevTools
- Add explicit waits before interacting with elements
- Use `waitForSelector()` if elements load asynchronously

### Issue: Tests fail intermittently
**Solution**:
- Check network connectivity
- Increase timeout values
- Add explicit waits for page load states
- Check if test data is properly generated

### Issue: Browser not installed
**Solution**: 
```bash
npx playwright install chromium
```

## Continuous Integration

To run tests in CI/CD pipelines:

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install --with-deps

# Run tests
npm test

# Generate report
npx playwright show-report
```

## Future Enhancements

- [ ] Add Firefox and Safari browser testing
- [ ] Implement cross-browser visual regression testing
- [ ] Add performance testing with metrics
- [ ] Implement API testing for backend validation
- [ ] Add test data management system
- [ ] Implement custom reporting with test metrics
- [ ] Add accessibility testing
- [ ] Implement mobile/responsive testing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tests`)
3. Commit your changes (`git commit -m 'Add new test scenarios'`)
4. Push to the branch (`git push origin feature/new-tests`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or issues, please open an issue in the GitHub repository.

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Framework](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Best Practices](https://playwright.dev/docs/best-practices)

---

**Last Updated**: January 2026
