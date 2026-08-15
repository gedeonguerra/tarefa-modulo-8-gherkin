class ProductsPage {
  visit() {
    cy.visit("/");
    cy.get("[data-test='product-name']", { timeout: 15000 }).should("have.length.greaterThan", 0);
  }
  search(term) {
    cy.get("[data-test='search-query']").clear().type(term);
    cy.get("[data-test='search-submit']").click();
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