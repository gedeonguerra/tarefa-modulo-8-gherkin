class ProductsPage {
  visit() {
    cy.intercept("GET", /\/products$/).as("getProducts");
    cy.visit("/");
    cy.wait("@getProducts", { timeout: 15000 });
  }
  search(term) {
    cy.intercept("GET", /\/products\/search$/).as("searchProducts");
    cy.get("[data-test='search-query']").clear().type(term);
    cy.get("[data-test='search-submit']").click();
    cy.wait("@searchProducts", { timeout: 15000 });
  }
  productNames() {
    return cy.get("[data-test='product-name']");
  }
  noResultsMessage() {
    return cy.get(".form-row, .col-md-9").contains("There are no products found.");
  }
  filterByCategory(category) {
    cy.get("[data-test='nav-categories']").click();
    cy.contains(category).click();
  }
  sortBy(option) {
    cy.get("[data-test='sort']").select(option);
  }
  addToCartByName(name) {
    this.search(name);
    cy.contains("[data-test='product-name']", name)
      .parents(".card")
      .find("[data-test='add-to-cart']")
      .click();
  }
}
module.exports = new ProductsPage();