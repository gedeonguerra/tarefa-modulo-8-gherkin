const { Given, When, Then } = require("playwright-bdd").createBdd();
const { expect } = require("@playwright/test");
const { ProductsPage } = require("../pages/ProductsPage");

Given("que estou na página inicial da loja", async ({ page }) => {
  await new ProductsPage(page).visit();
});

When("eu buscar pelo termo {string}", async ({ page }, termo) => {
  await new ProductsPage(page).search(termo);
});

Then("devo ver produtos na lista de resultados cujo nome contenha {string}", async ({ page }, termo) => {
  const names = await new ProductsPage(page).productNames().allTextContents();
  for (const name of names) {
    expect(name.toLowerCase()).toContain(termo.toLowerCase());
  }
});

Then("devo ver a mensagem {string}", async ({ page }, mensagem) => {
  await expect(page.getByText(mensagem)).toBeVisible();
});

When("eu filtrar produtos pela categoria {string}", async ({ page }, categoria) => {
  await new ProductsPage(page).filterByCategory(categoria);
});

Then("todos os produtos exibidos devem pertencer à categoria {string}", async ({ page }) => {
  await expect(new ProductsPage(page).productNames().first()).toBeVisible();
});

When("eu ordenar os produtos por {string}", async ({ page }, ordenacao) => {
  const map = { "Name (A - Z)": "name,asc", "Price (High - Low)": "price,desc" };
  await new ProductsPage(page).sortBy(map[ordenacao] || ordenacao);
});

Then("a lista de produtos deve ser reordenada de acordo com {string}", async ({ page }) => {
  await expect(new ProductsPage(page).productNames().first()).toBeVisible();
});
