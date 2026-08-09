const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const ProductsPage = require("../../pages/ProductsPage");
const CartPage = require("../../pages/CartPage");

When("eu adicionar o produto {string} ao carrinho", (nome) => {
  ProductsPage.addToCartByName(nome);
});

Then("o ícone do carrinho deve exibir {string} item", (quantidade) => {
  CartPage.cartQuantityBadge().should("contain.text", quantidade);
});

Given("que adicionei o produto {string} ao carrinho", (nome) => {
  ProductsPage.visit();
  ProductsPage.addToCartByName(nome);
});

When("eu alterar a quantidade para {string}", (quantidade) => {
  CartPage.visit();
  CartPage.setQuantity(quantidade);
});

Then("o subtotal do item deve ser recalculado corretamente", () => {
  cy.get("[data-test='line-price']").should("be.visible");
});

When("eu remover esse produto do carrinho", () => {
  CartPage.visit();
  CartPage.removeItem();
});

Then("o carrinho deve exibir a mensagem de carrinho vazio", () => {
  CartPage.emptyCartMessage().should("be.visible");
});
