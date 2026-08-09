# language: pt
Funcionalidade: Checkout
  Como cliente logado na loja
  Quero concluir a compra dos produtos no meu carrinho
  Para finalizar meu pedido

  Contexto:
    Dado que estou logado na plataforma
    E tenho o produto "Combination Pliers" no carrinho
    E estou na tela de checkout

  Cenário: Checkout completo com sucesso
    Quando eu preencher todos os dados de entrega obrigatórios
    E selecionar a forma de pagamento "Cash on Delivery"
    E confirmar o pedido
    Então devo ver a mensagem "Payment was successful"

  Esquema do Cenário: Validação de campos obrigatórios de endereço
    Quando eu tentar avançar sem preencher o campo "<campo>"
    Então devo ver uma mensagem de erro indicando que "<campo>" é obrigatório

    Exemplos:
      | campo        |
      | Street        |
      | City          |
      | State         |
      | Country       |
      | Postal Code   |

  Esquema do Cenário: Formas de pagamento
    Dado que avancei para a etapa de pagamento
    Quando eu selecionar a forma de pagamento "<forma>"
    E confirmar o pedido
    Então o pedido deve ser concluído com sucesso usando "<forma>"

    Exemplos:
      | forma                |
      | Cash on Delivery      |
      | Bank Transfer         |
      | Buy Now Pay Later     |
