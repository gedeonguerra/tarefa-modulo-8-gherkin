const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    defaultCommandTimeout: 20000,

    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      on("task", {
        httpQuery({ url, body }) {
          return new Promise((resolve) => {
            const http = require("http");
            const { hostname, port, pathname, search } = new URL(url);
            const payload = JSON.stringify(body || {});
            const req = http.request(
              {
                hostname,
                port,
                path: pathname + search,
                method: "QUERY",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": Buffer.byteLength(payload),
                },
              },
              (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => resolve({ status: res.statusCode, body: data }));
              }
            );
            req.on("error", (err) => resolve({ status: 0, error: err.message }));
            req.write(payload);
            req.end();
          });
        },
      });
      return config;
    },
  },
});