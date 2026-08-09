class LoginPage {
  visit() {
    cy.visit("/auth/login");
  }
  fillEmail(email) {
    cy.get("[data-test='email']").clear().type(email);
  }
  fillPassword(password) {
    cy.get("[data-test='password']").clear().type(password);
  }
  submit() {
    cy.get("[data-test='login-submit']").click();
  }
  errorMessage() {
    return cy.get("[data-test='login-error']");
  }
  logout() {
    cy.get("[data-test='nav-menu']").click();
    cy.get("[data-test='nav-sign-out']").click();
  }
}
module.exports = new LoginPage();
