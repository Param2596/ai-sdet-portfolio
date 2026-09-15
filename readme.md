# ai-sdet-portfolio

[![Playwright Tests](https://github.com/Param2596/ai-sdet-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Param2596/ai-sdet-portfolio/actions/workflows/playwright.yml)

## What this is

Playwright tests covering UI automation, API testing, and CI.

## Stack

**UI** - SauceDemo + POM via TypeScript

**API** - Playwright `request` + JSONPlaceholder

## How to run

Clone the repository and run the following commands in the terminal:

    npm ci
    npx playwright install
    npx playwright test

## Structure

`pages/` - Contains methods for performing actions on pages via UI.

`tests/` - Contains GUI tests in the root folder.

`tests/api/` - Contains API tests.

`utils/` - Contains mappings for technical element names with simple variables.

## AI layer
Rule-based Playwright failure summarizer + golden eval.

    npm run ai:eval

CI runs Playwright tests and `ai:eval` as separate jobs.

## Why this design

POM keeps locators, etc. out of specs. API tests assert status codes and JSON responses. CI ensures the tests work across environments.