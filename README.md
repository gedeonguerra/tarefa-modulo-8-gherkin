# BDD/Gherkin + Cypress — Practice Software Testing

> Projeto de estudo/exercício de curso — mantido e expandido como registro de aprendizado em BDD.

Automação BDD com **Cypress + Cucumber** sobre o [Practice Software Testing](https://practicesoftwaretesting.com/), cobrindo login, busca/filtro de produtos, carrinho e checkout.

Esta é a branch de automação com **Cypress**. Veja também:
- Branch [`playwright-automation`](../../tree/playwright-automation) — mesma especificação, automatizada com Playwright
- Branch [`main`](../../tree/main) — apenas a especificação Gherkin, sem automação

## Stack

- [Cypress](https://www.cypress.io/) `>= 15.x` (**requisito obrigatório**, ver nota abaixo)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- GitHub Actions (CI)
- App sob teste rodado localmente via `docker compose` (não usa mais o site público de terceiro)

> ⚠️ **Requisito de versão do Cypress:** o app sob teste usa o método HTTP `QUERY` (RFC 10008) para listagem/busca de produtos. Versões do Cypress anteriores à 15.x não suportam esse método corretamente (a requisição sai malformada e o backend retorna 400), quebrando `busca-produto.feature`, `carrinho.feature` e `checkout.feature`. Sempre usar Cypress `>= 15.x`.

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

O app sob teste (`testsmith-io/practice-software-testing`) precisa estar rodando localmente via `docker compose` antes dos testes — ver `.github/workflows/cypress.yml` para os passos completos (clone, subir containers, ajustar permissões, migrar/seed).

```bash
npm install
npm test          # headless
npm run test:open # modo interativo
```

> Os seletores (`data-test`) seguem a convenção do Practice Software Testing. Como o app é um repositório de terceiro clonado a cada execução, seus atributos `data-test` podem mudar entre versões — se algum teste passar a falhar em elemento não encontrado, vale conferir o HTML real antes de assumir bug no teste.

## Autor
**Gedeon Guerra**
QA | Testes Manuais e Automação | BDD/Gherkin