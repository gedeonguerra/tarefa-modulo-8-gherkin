const { Given, When, Then } = require("playwright-bdd").createBdd();
const { expect } = require("@playwright/test");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

const ENDERECO_VALIDO = {
  street: "Rua Exemplo, 123",
  city: "São Paulo",
  state: "SP",
  country: "BR",
  postalCode: "01000-000",
};

Given("tenho o produto {string} no carrinho", async ({ page }, nome) => {
  await page.goto("/");
  const card = page.locator(".card", { has: page.locator("[data-test='product-name']", { hasText: nome }) });
  await card.locator("[data-test='add-to-cart']").click();
});

Given("estou na tela de checkout", async ({ page }) => {
  const cart = new CartPage(page);
  await cart.visit();
  await new CheckoutPage(page).proceedToCheckout();
});

When("eu preencher todos os dados de entrega obrigatórios", async ({ page }) => {
  await new CheckoutPage(page).fillAddress(ENDERECO_VALIDO);
});

When("selecionar a forma de pagamento {string}", async ({ page }, forma) => {
  
});

When("confirmar o pedido", async ({ page }) => {
  await new CheckoutPage(page).confirmOrder();
});

When("eu tentar avançar sem preencher o campo {string}", async ({ page }) => {
  await new CheckoutPage(page).fillAddress({});
});

Then("devo ver uma mensagem de erro indicando que {string} é obrigatório", async ({ page }, campo) => {
  await expect(page.getByText(`${campo} is required`)).toBeVisible();
});

Given("que avancei para a etapa de pagamento", async ({ page }) => {
  await new CheckoutPage(page).fillAddress(ENDERECO_VALIDO);
});

Then("o pedido deve ser concluído com sucesso usando {string}", async ({ page }) => {
  await expect(new CheckoutPage(page).successMessage()).toBeVisible();
});
