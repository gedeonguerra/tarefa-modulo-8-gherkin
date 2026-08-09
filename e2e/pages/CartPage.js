class CartPage {
  constructor(page) {
    this.page = page;
  }
  cartQuantityBadge() {
    return this.page.locator("[data-test='cart-quantity']");
  }
  async visit() {
    await this.page.click("[data-test='cart-quantity']");
  }
  async setQuantity(value) {
    await this.page.fill("[data-test='quantity']", String(value));
  }
  async removeItem() {
    await this.page.click(".btn-danger");
  }
  emptyCartMessage() {
    return this.page.getByText("Cart is empty");
  }
}
module.exports = { CartPage };