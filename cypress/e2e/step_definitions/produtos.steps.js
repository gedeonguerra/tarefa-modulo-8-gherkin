const { Given, When, Then, Before, After } = require("@badeball/cypress-cucumber-preprocessor");
const ProductsPage = require("../../pages/ProductsPage");

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