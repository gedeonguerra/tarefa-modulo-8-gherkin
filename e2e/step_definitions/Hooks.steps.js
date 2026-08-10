const { Before } = require("playwright-bdd").createBdd();

// A API do Practice Software Testing (sprint5) passou a usar o método HTTP
// QUERY (RFC 10008, padronizado em junho/2026) para toda listagem/busca/
// filtro de produtos. É um método padrão HTTP muito recente e o Chromium
// empacotado no Playwright ainda não lida bem com ele quando emitido pelo
// fetch() nativo do próprio app Angular (a chamada cross-origin — UI na
// porta 4200, API na 8091 — nunca completa e o front nunca renderiza os
// produtos).
//
// Aqui interceptamos qualquer requisição QUERY feita pela página e a
// reemitimos usando route.fetch(), que passa pelo cliente HTTP do próprio
// Playwright (não pelo motor de rede do Chromium), preservando cookies/
// headers/body originais. Isso resolve o problema sem tocar no app nem
// mudar o comportamento verificado pelos testes.
Before(async ({ page }) => {
  await page.route("**/*", async (route) => {
    if (route.request().method() === "QUERY") {
      const response = await route.fetch();
      await route.fulfill({ response });
    } else {
      await route.continue();
    }
  });
});