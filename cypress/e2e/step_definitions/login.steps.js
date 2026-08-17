const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../pages/LoginPage");

const API_BASE = "http://localhost:8091";
const VALID_EMAIL = "customer@practicesoftwaretesting.com";
const VALID_PASSWORD = "welcome01";

let lastEmail = "";
let lastPassword = "";

function stabilizeLoginAndSubmit() {
  cy.request({
    method: "POST",
    url: `${API_BASE}/users/login`,
    body: { email: lastEmail, password: lastPassword },
    failOnStatusCode: false,
  }).then((loginResponse) => {
    cy.intercept("POST", "**/users/login", {
      statusCode: loginResponse.status,
      body: loginResponse.body,
    });

    if (loginResponse.status === 200 && loginResponse.body && loginResponse.body.access_token) {
      cy.request({
        method: "GET",
        url: `${API_BASE}/users/me`,
        headers: { Authorization: `Bearer ${loginResponse.body.access_token}` },
        failOnStatusCode: false,
      }).then((meResponse) => {
        cy.intercept("GET", "**/users/me", {
          statusCode: meResponse.status,
          body: meResponse.body,
        });
        LoginPage.submit();
      });
    } else {
      LoginPage.submit();
    }
  });
}

Given("que estou na página de login", () => {
  LoginPage.visit();
});

When("eu inserir email e senha válidos", () => {
  lastEmail = VALID_EMAIL;
  lastPassword = VALID_PASSWORD;
  LoginPage.fillEmail(VALID_EMAIL);
  LoginPage.fillPassword(VALID_PASSWORD);
});

When("eu inserir o email {string} e a senha {string}", (email, senha) => {
  lastEmail = email;
  lastPassword = senha;
  if (email) LoginPage.fillEmail(email);
  if (senha) LoginPage.fillPassword(senha);
});

When("clicar em entrar", () => {
  stabilizeLoginAndSubmit();
});

Then("devo ser direcionado para a página da minha conta", () => {
  cy.url().should("include", "/account");
});

Then("devo ver a mensagem de erro {string}", (mensagem) => {
  LoginPage.errorMessage().should("contain.text", mensagem);
});

Given("que estou logado na plataforma", () => {
  LoginPage.visit();
  lastEmail = VALID_EMAIL;
  lastPassword = VALID_PASSWORD;
  LoginPage.fillEmail(VALID_EMAIL);
  LoginPage.fillPassword(VALID_PASSWORD);
  stabilizeLoginAndSubmit();
  cy.url().should("include", "/account");
});

When("eu clicar em sair", () => {
  LoginPage.logout();
});

Then("devo ser redirecionado para a página de login", () => {
  cy.url().should("include", "/auth/login");
});
