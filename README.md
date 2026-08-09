# BDD/Gherkin + Playwright — Practice Software Testing

> Projeto de estudo/exercício de curso — mantido e expandido como registro de aprendizado em BDD.

Automação BDD com **Playwright + playwright-bdd** sobre o [Practice Software Testing](https://practicesoftwaretesting.com/), cobrindo login, busca/filtro de produtos, carrinho e checkout.

Esta é a branch de automação com **Playwright**. Veja também:
- Branch [`cypress-automation`](../../tree/cypress-automation) — mesma especificação, automatizada com Cypress
- Branch [`main`](../../tree/main) — apenas a especificação Gherkin, sem automação

## Stack

- [Playwright](https://playwright.dev/)
- [playwright-bdd](https://github.com/vitalets/playwright-bdd)
- GitHub Actions (CI)

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

```bash
npm install
npx playwright install
npm test           # gera steps + roda headless
npm run test:headed
```

> Os seletores (`data-test`) seguem a convenção documentada pelo Practice Software Testing. Se o site atualizar a versão, pode ser necessário revisar os Page Objects.

## Autor
**Gedeon Guerra**
QA | Testes Manuais e Automação | BDD/Gherkin
