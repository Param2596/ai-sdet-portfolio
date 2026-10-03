# Playwright E2E Suite

[![Playwright Tests](https://github.com/Param2596/playwright-e2e-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/Param2596/playwright-e2e-suite/actions/workflows/playwright.yml)

A **Playwright + TypeScript E2E test suite** covering UI and API testing, reusable authentication, cross-browser coverage, and CI execution.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI automation | Playwright, TypeScript, Page Object Model |
| Application | [SauceDemo](https://www.saucedemo.com/) |
| Authentication | Playwright `storageState` |
| API testing | Playwright `request`, Zod, ReqRes, JSONPlaceholder |
| Browsers | Chromium, Firefox, WebKit |
| CI/CD | GitHub Actions |
| Failure analysis | Rule-based evaluator with golden-test validation |

## Highlights

- **Maintainable test architecture:** Page objects and fixtures separate locators and reusable workflows from test specifications.
- **Reusable authentication:** A setup project signs in once and saves `playwright/.auth/user.json` for authenticated browser tests. Negative login tests use clean browser state.
- **Business-level assertions:** Checkout tests verify that item totals match product prices, tax is approximately 8%, and the final total equals subtotal plus tax.
- **Resilience testing:** Network interception blocks inventory images while verifying that the application remains usable.
- **Cross-browser coverage:** UI tests run across Chromium, Firefox, and WebKit through GitHub Actions.
- **API contract validation:** The isolated `api` project uses Zod `safeParse` to validate ReqRes response shapes, including users, lists, login responses, 400 errors, and 404 responses. JSONPlaceholder covers list, single-item, and create operations.
- **Secure configuration:** `REQRES_API_KEY` is stored in a gitignored local `.env` file and configured as a GitHub Actions secret.

## Engineering Challenges

- **WebKit menu interactions:** Addressed animation timing and duplicate off-screen elements using more precise role-based locators, retry handling, and application-state resets.
- **Checkout rendering:** Scoped price locators to cart items and waited for product prices and subtotal values before validating checkout calculations.
- **Execution efficiency:** Replaced repeated UI logins with reusable authenticated browser state.
- **Project isolation:** Browser projects do not define an API `baseURL`, so API tests are isolated under `tests/api` and executed through the dedicated `api` project.

## Project Structure

```text
pages/                  # Page objects
fixtures/               # Playwright fixtures
tests/                  # UI tests and authentication setup
tests/api/              # API tests and Zod schemas
utils/                  # Credentials and product mappings
ai/                     # Rule-based failure evaluation
playwright.config.ts    # Test configuration
```

## Run Locally

Install dependencies:

```bash
npm ci
npx playwright install
```

Run the full test suite:

```bash
npx playwright test
```

Run API tests only:

```bash
npx playwright test --project=api
```

Additional commands:

```bash
npx playwright test --project=chromium
npx playwright test --workers=1
npm run ai:eval
```

For local API tests, add `REQRES_API_KEY` to a gitignored `.env` file.

Generated authentication state under `playwright/.auth/` is excluded from version control.

## Author

**Paramjot Singh** · [GitHub](https://github.com/Param2596) · [LinkedIn](https://www.linkedin.com/in/paramjot-singh27/)