const { defineConfig, devices } = require("@playwright/test");
const { defineBddConfig } = require("playwright-bdd");

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: "e2e/step_definitions/**/*.js",
});

module.exports = defineConfig({
  testDir,
  use: {
    baseURL: "https://practicesoftwaretesting.com",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
