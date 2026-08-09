# language: pt
Funcionalidade: Carrinho de compras
  Como cliente da loja
  Quero adicionar e gerenciar produtos no carrinho
  Para preparar minha compra

  Contexto:
    Dado que estou na página inicial da loja

  Cenário: Adicionar produto ao carrinho
    Quando eu adicionar o produto "Combination Pliers" ao carrinho
    Então o ícone do carrinho deve exibir "1" item

  Esquema do Cenário: Alterar quantidade de um item no carrinho
    Dado que adicionei o produto "Combination Pliers" ao carrinho
    Quando eu alterar a quantidade para "<quantidade>"
    Então o subtotal do item deve ser recalculado corretamente

    Exemplos:
      | quantidade |
      | 2          |
      | 5          |
      | 10         |

  Cenário: Remover produto do carrinho
    Dado que adicionei o produto "Combination Pliers" ao carrinho
    Quando eu remover esse produto do carrinho
    Então o carrinho deve exibir a mensagem de carrinho vazio
