class CartPage {
  cartQuantityBadge() {
    return cy.get("[data-test='cart-quantity']");
  }
  visit() {
    cy.visit("/checkout");
  }
  setQuantity(value) {
    // Na tela do carrinho o campo é [data-test='product-quantity'].
    // '[data-test="quantity"]' só existe na página de detalhe do produto.
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