const { defineConfig, devices } = require("@playwright/test");
const { defineBddConfig } = require("playwright-bdd");

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: "e2e/step_definitions/**/*.js",
});

module.exports = defineConfig({
  testDir,
  timeout: 60000,
  workers: 1,
  expect: {
    timeout: 15000,
  },
  use: {
    baseURL: "http://localhost:4200",
    trace: "on-first-retry",
    actionTimeout: 15000,
    navigationTimeout: 30000,
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});