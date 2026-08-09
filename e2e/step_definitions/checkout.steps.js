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
  houseNumber: "42",
};

Given("tenho o produto {string} no carrinho", async ({ page }, nome) => {
  await page.goto("/");
  await page.locator(".card", { has: page.locator("[data-test='product-name']", { hasText: nome }) }).click();
  await page.click("[data-test='add-to-cart']");
});

Given("estou na tela de checkout", async ({ page }) => {
  const cart = new CartPage(page);
  await cart.visit();
  await new CheckoutPage(page).proceedToCheckout();
});

When("eu preencher todos os dados de entrega obrigatórios", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.fillAddress(ENDERECO_VALIDO);
  await checkout.proceedFromAddress();
});

async function selecionarFormaPagamento({ page }, forma) {
  await page.locator("[data-test='payment-method']").selectOption({ label: forma });
  const checkout = new CheckoutPage(page);
  if (forma === "Bank Transfer") {
    await checkout.fillBankTransferDetails();
  } else if (forma === "Buy Now Pay Later") {
    await checkout.fillBuyNowPayLaterDetails();
  }
}
When("selecionar a forma de pagamento {string}", selecionarFormaPagamento);
When("eu selecionar a forma de pagamento {string}", selecionarFormaPagamento);

When("confirmar o pedido", async ({ page }) => {
  await new CheckoutPage(page).confirmOrder();
});

When("eu tentar avançar sem preencher o campo {string}", async ({ page }, campo) => {
  const mapaCampos = {
    "Street": ["street", "street"],
    "City": ["city", "city"],
    "State": ["state", "state"],
    "Country": ["country", "country"],
    "Postal Code": ["postalCode", "postal_code"],
  };
  const [chave, dataTest] = mapaCampos[campo];
  const dados = { ...ENDERECO_VALIDO };
  delete dados[chave];
  const checkout = new CheckoutPage(page);
  await checkout.fillAddress(dados);
  if (chave === "country") {
    await page.selectOption(`[data-test='${dataTest}']`, "");
  } else {
    await page.fill(`[data-test='${dataTest}']`, "");
  }
  await page.click("body");
});

Then("devo ver uma mensagem de erro indicando que {string} é obrigatório", async ({ page }) => {
  await expect(page.locator("[data-test='proceed-3']")).toBeDisabled();
});

Given("que avancei para a etapa de pagamento", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.fillAddress(ENDERECO_VALIDO);
  await checkout.proceedFromAddress();
});

Then("o pedido deve ser concluído com sucesso usando {string}", async ({ page }) => {
  await expect(new CheckoutPage(page).successMessage()).toBeVisible();
});