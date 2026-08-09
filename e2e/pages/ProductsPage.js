class ProductsPage {
  constructor(page) {
    this.page = page;
  }
  async visit() {
    await this.page.goto("/");
  }
  async search(term) {
    await this.page.fill("[data-test='search-query']", term);
    await this.page.click("[data-test='search-submit']");
  }
  productNames() {
    return this.page.locator("[data-test='product-name']");
  }
  async filterByCategory(category) {
    await this.page.click(`text=${category}`);
  }
  async sortBy(option) {
    await this.page.selectOption("[data-test='sort']", option);
  }
  async addToCartByName(name) {
    const card = this.page.locator(".card", { has: this.page.locator("[data-test='product-name']", { hasText: name }) });
    await card.locator("[data-test='add-to-cart']").click();
  }
}
module.exports = { ProductsPage };
