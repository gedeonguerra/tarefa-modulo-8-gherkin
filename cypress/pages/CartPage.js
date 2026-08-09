class CartPage {
  cartQuantityBadge() {
    return cy.get("[data-test='cart-quantity']");
  }
  visit() {
    cy.visit("/checkout");
  }
  setQuantity(value) {
    cy.get("[data-test='quantity']").clear().type(value.toString());
  }
  removeItem() {
    cy.get("[data-test='remove-line']").click();
  }
  emptyCartMessage() {
    return cy.contains("Cart is empty");
  }
}
module.exports = new CartPage();
