const { Given, When, Then, Before, After } = require("@badeball/cypress-cucumber-preprocessor");
const ProductsPage = require("../../pages/ProductsPage");

// DIAGNÓSTICO (temporário, escopo: apenas cenários com a tag @diag-query).
// Intercept genérico e aditivo — não substitui nem interfere nos intercepts
// existentes de ProductsPage ("getProducts"/"searchProducts"). Objetivo único:
// verificar se o Cypress consegue capturar QUALQUER requisição de método QUERY
// nesta aplicação, sem restrição de path.
Before({ tags: "@diag-query" }, () => {
  cy.intercept("QUERY", "**").as("anyQuery");
});

// Roda mesmo se o cenário falhar. Assertiva explícita para gerar evidência
// visível no log de texto do CI (cy.intercept sozinho não imprime nada).
After({ tags: "@diag-query" }, () => {
  cy.get("@anyQuery.all").should("have.length.greaterThan", 0);
});

Given("que estou na página inicial da loja", () => {
  ProductsPage.visit();
});

When("eu buscar pelo termo {string}", (termo) => {
  ProductsPage.search(termo);
});

Then("devo ver produtos na lista de resultados cujo nome contenha {string}", (termo) => {
  ProductsPage.productNames().each(($el) => {
    cy.wrap($el).invoke("text").should("match", new RegExp(termo, "i"));
  });
});

Then("devo ver a mensagem {string}", (mensagem) => {
  cy.contains(mensagem).should("be.visible");
});

When("eu filtrar produtos pela categoria {string}", (categoria) => {
  ProductsPage.filterByCategory(categoria);
});

Then("todos os produtos exibidos devem pertencer à categoria {string}", (categoria) => {
  cy.get("[data-test='product-name']").should("have.length.greaterThan", 0);
});

When("eu ordenar os produtos por {string}", (ordenacao) => {
  const map = {
    "Name (A - Z)": "name,asc",
    "Price (High - Low)": "price,desc",
  };
  ProductsPage.sortBy(map[ordenacao] || ordenacao);
});

Then("a lista de produtos deve ser reordenada de acordo com {string}", () => {
  ProductsPage.productNames().should("have.length.greaterThan", 0);
});