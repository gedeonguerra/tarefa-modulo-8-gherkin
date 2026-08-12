const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const CartPage = require("../../pages/CartPage");
const CheckoutPage = require("../../pages/CheckoutPage");

const ENDERECO_VALIDO = {
  street: "Rua Exemplo, 123",
  city: "São Paulo",
  state: "SP",
  country: "BR",
  postalCode: "01000-000",
  houseNumber: "42",
};

Given("tenho o produto {string} no carrinho", (nome) => {
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
  CheckoutPage.fillAddress(ENDERECO_VALIDO);
  CheckoutPage.proceedFromAddress();
});

When("selecionar a forma de pagamento {string}", (forma) => {
  CheckoutPage.selectPaymentMethod(forma);
  if (forma === "Bank Transfer") {
    CheckoutPage.fillBankTransferDetails();
  } else if (forma === "Buy Now Pay Later") {
    CheckoutPage.fillBuyNowPayLaterDetails();
  }
});

When("confirmar o pedido", () => {
  CheckoutPage.confirmOrder();
});

When("eu tentar avançar sem preencher o campo {string}", (campo) => {
  const mapaCampos = {
    "Street": "street",
    "City": "city",
    "State": "state",
    "Country": "country",
    "Postal Code": "postal_code",
  };
  const dados = { ...ENDERECO_VALIDO };
  const chave = mapaCampos[campo];
  CheckoutPage.fillAddress(dados);
  if (chave === "country") {
    cy.get("[data-test='country']").select("");
  } else {
    cy.get(`[data-test='${chave}']`).clear();
  }
  cy.get("body").click();
});

Then("devo ver uma mensagem de erro indicando que {string} é obrigatório", () => {
  cy.get("[data-test='proceed-3']").should("be.disabled");
});

Given("que avancei para a etapa de pagamento", () => {
  CheckoutPage.fillAddress(ENDERECO_VALIDO);
  CheckoutPage.proceedFromAddress();
});

Then("o pedido deve ser concluído com sucesso usando {string}", () => {
  CheckoutPage.successMessage().should("be.visible");
});