class CartPage {
  cartQuantityBadge() {
    return cy.get("[data-test='cart-quantity']");
  }
  visit() {
    cy.visit("/checkout");
  }
  setQuantity(value) {
    cy.get("[data-test='product-quantity']").clear().type(value.toString()).blur();
  }
  removeItem() {
    cy.get(".btn-danger").click();
  }
  emptyCartMessage() {
    return cy.contains("Cart is empty");
  }
}
module.exports = new CartPage();