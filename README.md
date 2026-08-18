# BDD/Gherkin + Playwright — Practice Software Testing (Toolshop)

> Projeto de estudo/exercício de curso — mantido e expandido como registro de aprendizado em BDD.

Automação BDD com **Playwright + playwright-bdd** sobre o [Practice Software Testing](https://practicesoftwaretesting.com/) ("Toolshop"), cobrindo login, busca/filtro de produtos, carrinho e checkout.

Esta é a branch de automação com **Playwright**. Veja também:
- Branch [`cypress-automation`](../../tree/cypress-automation) — mesma especificação, automatizada com Cypress
- Branch [`main`](../../tree/main) — apenas a especificação Gherkin, sem automação

## Status

27/27 cenários passando localmente e no CI (GitHub Actions), contra uma instância local do Practice Software Testing (via Docker).

## Stack

- [Playwright](https://playwright.dev/)
- [playwright-bdd](https://github.com/vitalets/playwright-bdd)
- GitHub Actions (CI)
- Docker Compose (app sob teste rodando localmente no CI)

## Estrutura

```
features/                      # arquivos .feature (Gherkin)
e2e/
├── step_definitions/          # implementação dos steps
└── pages/                     # Page Objects
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
npx playwright install
npm test           # gera steps + roda headless
npm run test:headed
```

> Os testes rodam com `workers: 1` (configurado em `playwright.config.js`). O app roda em modo dev (`ng serve`), sem build de produção, e a suíte compartilha usuário/carrinho entre os cenários — execução em paralelo (múltiplos workers) pode gerar condições de corrida e falsos negativos.

> Os seletores (`data-test`) seguem a convenção do Practice Software Testing. Como o app é um repositório de terceiro clonado a cada execução, seus atributos `data-test` podem mudar entre versões — se algum teste passar a falhar em elemento não encontrado, vale conferir o HTML real antes de assumir bug no teste.

## Autor
**Gedeon Guerra**
QA Engineer | SDET | Quality Assurance & Test Automation |
