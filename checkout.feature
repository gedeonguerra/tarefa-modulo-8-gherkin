Feature: Cadastro no Checkout
  Como cliente da EBAC-SHOP
  Quero concluir meu cadastro
  Para finalizar minha compra

  Background:
    Dado que estou na tela de checkout

  @cadastro_completo
  Scenario: Cadastro com todos os dados obrigatórios
    Quando eu preencher todos os campos obrigatórios marcados com asterisco
    E clicar em cadastrar
    Então meu cadastro deve ser concluído com sucesso

  @email_invalido
  Scenario Outline: Validação do campo email
    Quando eu preencher o email "<email>"
    E tentar finalizar o cadastro
    Então deve exibir uma mensagem de erro no campo email

    Examples:
      | email           |
      | usuario@        |
      | usuario.com     |
      | @gmail.com      |
      | usuario@@gmail  |

  @campos_vazios
  Scenario: Tentativa de cadastro com campos vazios
    Quando eu tentar finalizar o cadastro com campos obrigatórios vazios
    Então deve ser exibida uma mensagem de alerta
