class ProductsPage {
  constructor(page) {
    this.page = page;
  }
  async visit() {
    await this.page.goto("/");
  }
  async search(term) {
    const responsePromise = this.page.waitForResponse(resp => resp.url().includes("/products/search") && resp.status() === 200);
    await this.page.fill("[data-test='search-query']", term);
    await this.page.click("[data-test='search-submit']");
    await responsePromise;
  }
  productNames() {
    return this.page.locator("[data-test='product-name']");
  }
  async filterByCategory(category) {
    await this.page.click("[data-test='nav-categories']");
    await this.page.click(`text=${category}`);
  }
  async sortBy(option) {
    await this.page.selectOption("[data-test='sort']", option);
  }
  async addToCartByName(name) {
    await this.page.locator(".card", { has: this.page.locator("[data-test='product-name']", { hasText: name }) }).click();
    await this.page.click("[data-test='add-to-cart']");
  }
}
module.exports = { ProductsPage };