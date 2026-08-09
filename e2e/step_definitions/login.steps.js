const { Given, When, Then } = require("playwright-bdd").createBdd();
const { expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

const VALID_EMAIL = "customer@practicesoftwaretesting.com";
const VALID_PASSWORD = "welcome01";

Given("que estou na página de login", async ({ page }) => {
  await new LoginPage(page).visit();
});

When("eu inserir email e senha válidos", async ({ page }) => {
  const login = new LoginPage(page);
  await login.fillEmail(VALID_EMAIL);
  await login.fillPassword(VALID_PASSWORD);
});

When("eu inserir o email {string} e a senha {string}", async ({ page }, email, senha) => {
  const login = new LoginPage(page);
  await login.fillEmail(email);
  await login.fillPassword(senha);
});

When("clicar em entrar", async ({ page }) => {
  await new LoginPage(page).submit();
});

Then("devo ser direcionado para a página da minha conta", async ({ page }) => {
  await expect(page).toHaveURL(/.*\/account/);
});

Then("devo ver a mensagem de erro {string}", async ({ page }, mensagem) => {
  await expect(new LoginPage(page).errorMessage()).toContainText(mensagem);
});

Given("que estou logado na plataforma", async ({ page }) => {
  const login = new LoginPage(page);
  await login.visit();
  await login.fillEmail(VALID_EMAIL);
  await login.fillPassword(VALID_PASSWORD);
  await login.submit();
  await expect(page).toHaveURL(/.*\/account/);
});

When("eu clicar em sair", async ({ page }) => {
  await new LoginPage(page).logout();
});

Then("devo ser redirecionado para a página de login", async ({ page }) => {
  await expect(page).toHaveURL(/.*\/auth\/login/);
});
