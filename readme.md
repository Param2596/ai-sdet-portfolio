# Playwright E2E Suite

[![Playwright Tests](https://github.com/Param2596/playwright-e2e-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/Param2596/playwright-e2e-suite/actions/workflows/playwright.yml)

A **Playwright + TypeScript automation portfolio** covering UI and API testing, reusable authentication, cross-browser reliability, and CI/CD.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI automation | Playwright, TypeScript, Page Object Model |
| Application | [SauceDemo](https://www.saucedemo.com/) |
| Authentication | Playwright `storageState` |
| API testing | Playwright `request`, JSONPlaceholder |
| Browsers | Chromium, Firefox, WebKit |
| CI/CD | GitHub Actions |
| Failure analysis | Rule-based summarizer with golden evaluation (not an LLM) |

## Highlights

- **Maintainable tests:** Page objects and fixtures keep locators and reusable flows separate from test specifications.
- **Efficient authentication:** A setup project signs in once and saves `playwright/.auth/user.json` for authenticated browser tests. Negative login tests use clean storage.
- **Business assertions:** Checkout tests verify that item totals equal the sum of product prices, tax is approximately 8%, and the final total equals subtotal plus tax.
- **Resilience testing:** Network interception blocks inventory images while checking that the page remains usable.
- **Cross-browser coverage:** Tests run in Chromium, Firefox, and WebKit through GitHub Actions.
- **API status + JSON shape checks:** Validate response status and JSON structure using Playwright's request API.

## Engineering Challenges

- **WebKit menu interactions:** Addressed animation timing and duplicate off-screen elements with more precise role-based locators, retry logic, and a reload after resetting app state.
- **Checkout rendering:** Scoped price locators to cart items and waited for prices and subtotal before asserting checkout calculations.
- **Execution efficiency:** Replaced repeated UI logins with reusable authenticated browser state.

## Project Structure

```text
pages/                  # Page objects
fixtures/               # Playwright fixtures
tests/                  # UI tests and auth setup
tests/api/              # API tests
utils/                  # Credentials and product mappings
ai/                     # Rule-based failure evaluation
playwright.config.ts    # Test configuration
```

## Run Locally

```bash
npm ci
npx playwright install
npx playwright test
```

Additional commands:

```bash
npx playwright test --project=chromium
npx playwright test --workers=1
npm run ai:eval
```

The generated authentication state in `playwright/.auth/` is excluded from version control.

## Next Steps

Expand API contract and negative testing, improve failure diagnostics, and enhance CI reporting.

## Author

**Paramjot Singh** · [GitHub](https://github.com/Param2596) · [LinkedIn](https://www.linkedin.com/in/paramjot-singh27/)
