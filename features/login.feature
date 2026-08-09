# language: pt
Funcionalidade: Login na plataforma
  Como cliente da loja
  Quero fazer login
  Para acessar minha conta e finalizar compras

  Contexto:
    Dado que estou na página de login

  Cenário: Login com dados válidos
    Quando eu inserir email e senha válidos
    E clicar em entrar
    Então devo ser direcionado para a página da minha conta

  Esquema do Cenário: Login inválido
    Quando eu inserir o email "<email>" e a senha "<senha>"
    E clicar em entrar
    Então devo ver a mensagem de erro "<mensagem>"

    Exemplos:
      | email                | senha        | mensagem                            |
      | invalido@email.com   | 123456       | Invalid email or password           |
      | customer@practicesoftwaretesting.com | senhaerrada | Invalid email or password |
      |                      | welcome01    | Email is required                   |
      | customer@practicesoftwaretesting.com |             | Password is required     |

  Cenário: Logout
    Dado que estou logado na plataforma
    Quando eu clicar em sair
    Então devo ser redirecionado para a página de login
