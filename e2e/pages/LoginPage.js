class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async visit() {
    await this.page.goto("/auth/login");
  }
  async fillEmail(email) {
    if (email) await this.page.fill("[data-test='email']", email);
  }
  async fillPassword(password) {
    if (password) await this.page.fill("[data-test='password']", password);
  }
  async submit() {
    await this.page.click("[data-test='login-submit']");
  }
  errorMessage() {
    return this.page.locator("[data-test='login-error'], [data-test='email-error'], [data-test='password-error']");
  }
  async logout() {
    await this.page.click("[data-test='nav-menu']");
    await this.page.click("[data-test='nav-sign-out']");
  }
}
module.exports = { LoginPage };