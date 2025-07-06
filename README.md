# E-Commerce Playwright Automation

This project is an end-to-end (E2E) test automation suite for an e-commerce web application using [Playwright](https://playwright.dev/). It covers user flows such as login, product filtering, adding items to the cart, and completing the checkout process. The tests are written in TypeScript and are designed to be robust, maintainable, and easy to extend.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Reports](#reports)
- [Folder Structure Details](#folder-structure-details)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
├── package.json
├── playwright.config.ts
├── pages/
│   ├── checkoutComplete.ts
│   ├── checkoutOverview.ts
│   ├── checkoutYourInfo.ts
│   ├── inventory.ts
│   └── login.ts
├── tests/
│   ├── Add_item_and_checkout.spec.ts
│   ├── login.spec.ts
│   └── product_filter.spec.ts
├── playwright-report/
├── test-results/
├── .env
└── ...
```

## Features
- **Login Tests**: Validates login with valid and invalid credentials.
- **Product Filtering**: Tests product sorting by name and price.
- **Cart & Checkout**: Adds items to cart, verifies cart contents, and completes checkout.
- **Page Object Model**: All page interactions are encapsulated in the `pages/` directory for maintainability.
- **Environment Variables**: Credentials and sensitive data are managed via `.env`.
- **HTML Reports**: Playwright generates detailed HTML reports after test runs.

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation Steps
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd e-commerce Playwrght Automation
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Install Playwright browsers:**
   ```sh
   npx playwright install --with-deps
   ```
4. **Set up environment variables:**
   - Copy the provided `.env` file or create your own:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` to set usernames and passwords as needed.

## Running Tests

- **Run all tests:**
  ```sh
  npx playwright test
  ```
- **Run a specific test file:**
  ```sh
  npx playwright test tests/login.spec.ts
  ```
- **View HTML report:**
  After running tests, open the report:
  ```sh
  npx playwright show-report
  ```

## Environment Variables

The `.env` file should contain the following variables:

```
LOCKED_OUT_USERNAME=locked_out_user
STANDARD_USERNAME=standard_user
PASSWORD=secret_sauce
INVALID_PASSWORD=secret_sauce_1
```

These are used in the test scripts for login scenarios.

## Reports
- Test results are saved in the `playwright-report/` directory.
- To view the latest report, run:
  ```sh
  npx playwright show-report
  ```

## Folder Structure Details

- **pages/**: Contains Page Object Model (POM) classes for each page (login, inventory, checkout, etc.).
- **tests/**: Contains Playwright test files covering different user flows.
- **playwright.config.ts**: Playwright configuration (test directory, browser settings, reporters, etc.).
- **.env**: Stores environment variables for credentials.
- **playwright-report/**: Auto-generated HTML reports after test runs.
- **test-results/**: Raw test result files.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License
This project is licensed under the ISC License.
