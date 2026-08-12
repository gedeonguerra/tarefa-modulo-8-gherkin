class CheckoutPage {
  proceedToCheckout() {
    cy.get("[data-test='proceed-1']").click();
    cy.get("[data-test='proceed-2']").click();
  }
  fillAddress({ street, city, state, country, postalCode, houseNumber }) {
    if (country) cy.get("[data-test='country']").select(country);
    if (postalCode) cy.get("[data-test='postal_code']").type(postalCode);
    if (houseNumber) cy.get("[placeholder='e.g. 42 *']").type(houseNumber);
    if (street) cy.get("[data-test='street']").type(street);
    if (city) cy.get("[data-test='city']").type(city);
    if (state) cy.get("[data-test='state']").type(state);
  }
  proceedFromAddress() {
    cy.get("[data-test='proceed-3']").click();
  }
  selectPaymentMethod(method) {
    cy.get("[data-test='payment-method']").select(method);
  }
  fillBankTransferDetails() {
    cy.get("[placeholder='Bank Name']").type("Fictitious Bank");
    cy.get("[placeholder='Account Name']").type("Test Account");
    cy.get("[placeholder='Account Number']").type("123456");
  }
  fillBuyNowPayLaterDetails() {
    cy.get("[data-test='monthly_installments']").select(1);
  }
  confirmOrder() {
    cy.get("[data-test='finish']").click();
  }
  successMessage() {
    return cy.contains("Payment was successful");
  }
}
module.exports = new CheckoutPage();