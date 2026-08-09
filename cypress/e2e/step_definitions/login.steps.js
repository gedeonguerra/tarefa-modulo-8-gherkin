const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../pages/LoginPage");

const VALID_EMAIL = "customer@practicesoftwaretesting.com";
const VALID_PASSWORD = "welcome01";

Given("que estou na página de login", () => {
  LoginPage.visit();
});

When("eu inserir email e senha válidos", () => {
  LoginPage.fillEmail(VALID_EMAIL);
  LoginPage.fillPassword(VALID_PASSWORD);
});

When("eu inserir o email {string} e a senha {string}", (email, senha) => {
  if (email) LoginPage.fillEmail(email);
  if (senha) LoginPage.fillPassword(senha);
});

When("clicar em entrar", () => {
  LoginPage.submit();
});

Then("devo ser direcionado para a página da minha conta", () => {
  cy.url().should("include", "/account");
});

Then("devo ver a mensagem de erro {string}", (mensagem) => {
  LoginPage.errorMessage().should("contain.text", mensagem);
});

Given("que estou logado na plataforma", () => {
  LoginPage.visit();
  LoginPage.fillEmail(VALID_EMAIL);
  LoginPage.fillPassword(VALID_PASSWORD);
  LoginPage.submit();
  cy.url().should("include", "/account");
});

When("eu clicar em sair", () => {
  LoginPage.logout();
});

Then("devo ser redirecionado para a página de login", () => {
  cy.url().should("include", "/auth/login");
});
