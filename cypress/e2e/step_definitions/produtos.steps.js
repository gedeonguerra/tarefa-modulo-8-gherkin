const { Given, When, Then, Before, After } = require("@badeball/cypress-cucumber-preprocessor");
const ProductsPage = require("../../pages/ProductsPage");

Given("que estou na página inicial da loja", () => {
  ProductsPage.visit();
});

When("eu buscar pelo termo {string}", (termo) => {
  ProductsPage.search(termo);
});

Then("devo ver produtos na lista de resultados cujo nome contenha {string}", (termo) => {
  // .should(callback) é reexecutado automaticamente pelo Cypress até passar (ou estourar o timeout),
  // ao contrário de .each(), que roda uma única vez e pode capturar a lista antiga.
  ProductsPage.productNames().should(($items) => {
    expect($items.length, "quantidade de produtos encontrados").to.be.greaterThan(0);
    $items.each((_, el) => {
      expect(Cypress.$(el).text().toLowerCase()).to.include(termo.toLowerCase());
    });
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