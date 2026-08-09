const { Given, When, Then } = require("playwright-bdd").createBdd();
const { expect } = require("@playwright/test");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");

When("eu adicionar o produto {string} ao carrinho", async ({ page }, nome) => {
  await new ProductsPage(page).addToCartByName(nome);
});

Then("o ícone do carrinho deve exibir {string} item", async ({ page }, quantidade) => {
  await expect(new CartPage(page).cartQuantityBadge()).toContainText(quantidade);
});

Given("que adicionei o produto {string} ao carrinho", async ({ page }, nome) => {
  const products = new ProductsPage(page);
  await products.visit();
  await products.addToCartByName(nome);
});

When("eu alterar a quantidade para {string}", async ({ page }, quantidade) => {
  const cart = new CartPage(page);
  await cart.visit();
  await cart.setQuantity(quantidade);
});

Then("o subtotal do item deve ser recalculado corretamente", async ({ page }) => {
  await expect(page.locator("[data-test='line-price']")).toBeVisible();
});

When("eu remover esse produto do carrinho", async ({ page }) => {
  const cart = new CartPage(page);
  await cart.visit();
  await cart.removeItem();
});

Then("o carrinho deve exibir a mensagem de carrinho vazio", async ({ page }) => {
  await expect(new CartPage(page).emptyCartMessage()).toBeVisible();
});
