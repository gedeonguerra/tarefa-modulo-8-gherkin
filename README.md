# BDD/Gherkin + Cypress — Practice Software Testing

> Projeto de estudo/exercício de curso — mantido e expandido como registro de aprendizado em BDD.

Automação BDD com **Cypress + Cucumber** sobre o [Practice Software Testing](https://practicesoftwaretesting.com/), cobrindo login, busca/filtro de produtos, carrinho e checkout.

Esta é a branch de automação com **Cypress**. Veja também:
- Branch [`playwright-automation`](../../tree/playwright-automation) — mesma especificação, automatizada com Playwright
- Branch [`main`](../../tree/main) — apenas a especificação Gherkin, sem automação

## Stack

- [Cypress](https://www.cypress.io/)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- GitHub Actions (CI)

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

```bash
npm install
npm test          # headless
npm run test:open # modo interativo
```

> Os seletores (`data-test`) seguem a convenção documentada pelo Practice Software Testing. Se o site atualizar a versão, pode ser necessário revisar os Page Objects.

## Autor
**Gedeon Guerra**
QA | Testes Manuais e Automação | BDD/Gherkin
