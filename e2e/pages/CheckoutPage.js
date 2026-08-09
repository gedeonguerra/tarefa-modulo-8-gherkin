class CheckoutPage {
  constructor(page) {
    this.page = page;
  }
  async proceedToCheckout() {
    await this.page.click("[data-test='proceed-1']");
  }
  async fillAddress({ street, city, state, country, postalCode } = {}) {
    if (street) await this.page.fill("[data-test='street']", street);
    if (city) await this.page.fill("[data-test='city']", city);
    if (state) await this.page.fill("[data-test='state']", state);
    if (country) await this.page.selectOption("[data-test='country']", country);
    if (postalCode) await this.page.fill("[data-test='postal_code']", postalCode);
    await this.page.click("[data-test='proceed-2']");
  }
  async selectPaymentMethod(method) {
    await this.page.selectOption("[data-test='payment-method']", method);
  }
  async confirmOrder() {
    await this.page.click("[data-test='finish']");
  }
  successMessage() {
    return this.page.getByText("Payment was successful");
  }
}
module.exports = { CheckoutPage };
