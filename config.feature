Funcionalidade: Configurar produto
  Como cliente da EBAC-SHOP
  Quero configurar meu produto de acordo com meu tamanho e gosto
  E escolher a quantidade
  Para depois inserir no carrinho

  Contexto:
    Dado que estou na página de configuração do produto

  Cenário: Validar campos obrigatórios
    Quando eu tentar configurar o produto sem selecionar cor, tamanho ou quantidade
    Então deve exibir uma mensagem informando que todos os campos são obrigatórios

  Esquema do Cenário: Validar quantidade máxima por venda
    Quando eu selecionar uma quantidade de "<quantidade>"
    Então o sistema deve "<resultado>"

    Exemplos:
      | quantidade | resultado                                   |
      | 1          | permitir a seleção                          |
      | 5          | permitir a seleção                          |
      | 10         | permitir a seleção                          |
      | 11         | impedir a seleção e exibir mensagem de erro |

  Cenário: Validar ação do botão limpar
    Dado que selecionei cor, tamanho e quantidade
    Quando eu clicar no botão "limpar"
    Então as seleções devem voltar ao estado original
