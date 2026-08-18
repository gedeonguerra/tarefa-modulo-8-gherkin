# BDD/Gherkin — Practice Software Testing (Toolshop)

> Projeto de estudo/exercício de curso — mantido e expandido como registro de aprendizado em BDD.

Especificação de cenários em Gherkin, automatizados sobre o [Practice Software Testing](https://practicesoftwaretesting.com/) ("Toolshop") — um e-commerce fake mantido especificamente para prática de automação de testes (login, catálogo de produtos, carrinho, checkout).

Este repositório tem **duas branches de automação**, com a mesma especificação Gherkin implementada em frameworks diferentes:

| Branch | Framework | Runner BDD | CI |
|---|---|---|---|
| [`cypress-automation`](../../tree/cypress-automation) | Cypress | @badeball/cypress-cucumber-preprocessor | ✅ GitHub Actions |
| [`playwright-automation`](../../tree/playwright-automation) | Playwright | playwright-bdd | ✅ GitHub Actions |

Em ambas as branches, o app sob teste roda **localmente via Docker Compose** dentro do próprio pipeline de CI — não depende do site público de terceiro estar no ar, com dados estáveis ou disponível. O workflow clona o [`testsmith-io/practice-software-testing`](https://github.com/testsmith-io/practice-software-testing), sobe os containers (Angular + Laravel + MariaDB via nginx/PHP-FPM), popula o banco e só então roda a suíte.

A branch `main` contém apenas a especificação (os arquivos `.feature`), sem automação.

## Funcionalidades especificadas

| Arquivo | Cobertura |
|---|---|
| [`features/login.feature`](./features/login.feature) | Login válido/inválido, logout |
| [`features/busca-produto.feature`](./features/busca-produto.feature) | Busca, filtro por categoria, ordenação |
| [`features/carrinho.feature`](./features/carrinho.feature) | Adicionar, alterar quantidade, remover item |
| [`features/checkout.feature`](./features/checkout.feature) | Fluxo completo de checkout, validação de campos, formas de pagamento |

## Boas práticas aplicadas

- *Background* para reaproveitamento de contexto
- *Scenario Outline* com tabelas de exemplos (*Examples*)
- Separação por funcionalidade
- Cenários de caminho feliz e caminho negativo

## Tecnologias

- Gherkin
- Cypress (branch `cypress-automation`)
- Playwright (branch `playwright-automation`)
- Docker Compose (app sob teste, ambas as branches)
- GitHub Actions (CI, ambas as branches)

## Autor
**Gedeon Guerra**
QA | Testes Manuais e Automação | BDD/Gherkin
