# BDD/Gherkin + Cypress — Practice Software Testing (Toolshop)

> Projeto de estudo/exercício de curso — mantido e expandido como registro de aprendizado em BDD.

Automação BDD com **Cypress + Cucumber** sobre o [Practice Software Testing](https://practicesoftwaretesting.com/) ("Toolshop"), cobrindo login, busca/filtro de produtos, carrinho e checkout.

Esta é a branch de automação com **Cypress**. Veja também:
- Branch [`playwright-automation`](../../tree/playwright-automation) — mesma especificação, automatizada com Playwright
- Branch [`main`](../../tree/main) — apenas a especificação Gherkin, sem automação

## Status

27/27 cenários passando localmente e no CI (GitHub Actions), contra uma instância local do Practice Software Testing (via Docker).

## Stack

- [Cypress](https://www.cypress.io/) `>= 15.x` (**requisito obrigatório**, ver nota abaixo)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) `>= 26.x`
- GitHub Actions (CI)
- Docker Compose (app sob teste rodando localmente no CI)

> ⚠️ **Requisito de versão do Cypress:** o app sob teste usa o método HTTP `QUERY` (RFC 10008) para listagem/busca de produtos. Versões do Cypress anteriores à 15.x não suportam esse método corretamente (a requisição sai malformada e o backend retorna 400), quebrando `busca-produto.feature`, `carrinho.feature` e `checkout.feature`. Sempre usar Cypress `>= 15.x` — o que também exige `@badeball/cypress-cucumber-preprocessor` `>= 26.x` (versões anteriores travam por incompatibilidade de peer dependency).

## Estrutura

```
cypress/
├── e2e/
│   ├── features/              # arquivos .feature (Gherkin)
│   └── step_definitions/      # implementação dos steps
├── pages/                     # Page Objects
└── support/
```

## Funcionalidades cobertas

| Feature | Cenários |
|---|---|
| `login.feature` | Login válido/inválido, logout |
| `busca-produto.feature` | Busca, filtro por categoria, ordenação |
| `carrinho.feature` | Adicionar, alterar quantidade, remover |
| `checkout.feature` | Fluxo completo, validação de endereço, formas de pagamento |

## Como rodar

O app sob teste precisa estar rodando localmente antes dos testes:

```bash
git clone https://github.com/testsmith-io/practice-software-testing.git app-under-test
cd app-under-test
docker compose up -d
docker compose exec -T -u root laravel-api chown -R www-data:www-data storage bootstrap/cache
docker compose exec -T laravel-api php artisan migrate:refresh --seed
cd ..
```

Depois, na pasta deste projeto:

```bash
npm install
npm test          # headless, Chrome
npm run test:open # modo interativo
```

> Os seletores (`data-test`) seguem a convenção do Practice Software Testing. Como o app é um repositório de terceiro clonado a cada execução, seus atributos `data-test` podem mudar entre versões — se algum teste passar a falhar em elemento não encontrado, vale conferir o HTML real antes de assumir bug no teste.

## Autor
**Gedeon Guerra**
QA Engineer | SDET | Quality Assurance & Test Automation |
