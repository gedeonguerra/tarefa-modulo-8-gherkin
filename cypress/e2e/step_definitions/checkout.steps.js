const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const CartPage = require("../../pages/CartPage");
const CheckoutPage = require("../../pages/CheckoutPage");

Given("tenho o produto {string} no carrinho", (nome) => {
  // reaproveita step de "adicionar ao carrinho" via visita direta
  cy.visit("/");
  cy.contains("[data-test='product-name']", nome)
    .parents(".card")
    .find("[data-test='add-to-cart']")
    .click();
});

Given("estou na tela de checkout", () => {
  CartPage.visit();
  CheckoutPage.proceedToCheckout();
});

When("eu preencher todos os dados de entrega obrigatórios", () => {
  CheckoutPage.fillAddress({
    street: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    country: "BR",
    postalCode: "01000-000",
  });
});

When("selecionar a forma de pagamento {string}", (forma) => {
  CheckoutPage.selectPaymentMethod(forma);
});

When("confirmar o pedido", () => {
  CheckoutPage.confirmOrder();
});

When("eu tentar avançar sem preencher o campo {string}", (campo) => {
  CheckoutPage.fillAddress({});
});

Then("devo ver uma mensagem de erro indicando que {string} é obrigatório", (campo) => {
  cy.contains(`${campo} is required`).should("be.visible");
});

Given("que avancei para a etapa de pagamento", () => {
  CheckoutPage.fillAddress({
    street: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    country: "BR",
    postalCode: "01000-000",
  });
});

Then("o pedido deve ser concluído com sucesso usando {string}", () => {
  CheckoutPage.successMessage().should("be.visible");
});
