class CheckoutPage {
  proceedToCheckout() {
    cy.get("[data-test='proceed-1']").click();
  }
  fillAddress({ street, city, state, country, postalCode }) {
    if (street) cy.get("[data-test='street']").type(street);
    if (city) cy.get("[data-test='city']").type(city);
    if (state) cy.get("[data-test='state']").type(state);
    if (country) cy.get("[data-test='country']").select(country);
    if (postalCode) cy.get("[data-test='postal_code']").type(postalCode);
    cy.get("[data-test='proceed-2']").click();
  }
  selectPaymentMethod(method) {
    cy.get("[data-test='payment-method']").select(method);
  }
  confirmOrder() {
    cy.get("[data-test='finish']").click();
  }
  successMessage() {
    return cy.contains("Payment was successful");
  }
}
module.exports = new CheckoutPage();
