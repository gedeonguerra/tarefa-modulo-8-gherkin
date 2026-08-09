class CheckoutPage {
  constructor(page) {
    this.page = page;
  }
  async proceedToCheckout() {
    await this.page.click("[data-test='proceed-1']");
    await this.page.click("[data-test='proceed-2']");
  }
  async fillAddress({ street, city, state, country, postalCode, houseNumber } = {}) {
    if (country) await this.page.selectOption("[data-test='country']", country);
    if (postalCode) await this.page.fill("[data-test='postal_code']", postalCode);
    if (houseNumber) await this.page.fill("[placeholder='e.g. 42 *']", houseNumber);
    if (street) await this.page.fill("[data-test='street']", street);
    if (city) await this.page.fill("[data-test='city']", city);
    if (state) await this.page.fill("[data-test='state']", state);
  }
  async proceedFromAddress() {
    await this.page.click("[data-test='proceed-3']");
  }
  async selectPaymentMethod(method) {
    await this.page.selectOption("[data-test='payment-method']", method);
  }
  async fillBankTransferDetails() {
    await this.page.fill("[placeholder='Bank Name']", "Fictitious Bank");
    await this.page.fill("[placeholder='Account Name']", "Test Account");
    await this.page.fill("[placeholder='Account Number']", "123456");
  }
  async fillBuyNowPayLaterDetails() {
    await this.page.selectOption("[data-test='monthly_installments']", { index: 1 });
  }
  async confirmOrder() {
    await this.page.click("[data-test='finish']");
  }
  successMessage() {
    return this.page.getByText("Payment was successful");
  }
}
module.exports = { CheckoutPage };