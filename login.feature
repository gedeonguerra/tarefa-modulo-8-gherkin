Feature: Login na plataforma
  Como cliente da EBAC-SHOP
  Quero fazer o login na plataforma
  Para visualizar meus pedidos

  Background:
    Dado que estou na página de login

  @login_sucesso
  Scenario: Login com dados válidos
    Quando eu inserir email e senha válidos
    E clicar em entrar
    Então devo ser direcionado para a tela de checkout

  @login_invalido
  Scenario Outline: Login inválido
    Quando eu inserir o email "<email>" e a senha "<senha>"
    E clicar em entrar
    Então deve exibir a mensagem “Usuário ou senha inválidos”

    Examples:
      | email              | senha       |
      | invalido@email    | 123456      |
      | usuario@teste.com | senhaerrada |
      |                   | 123456      |
      | usuario@teste.com |             |
