# language: pt
Funcionalidade: Busca e filtro de produtos
  Como cliente da loja
  Quero buscar e filtrar produtos
  Para encontrar o item que desejo comprar

  Contexto:
    Dado que estou na página inicial da loja

  @diag-query
  Cenário: Buscar produto existente pelo nome
    Quando eu buscar pelo termo "Hammer"
    Então devo ver produtos na lista de resultados cujo nome contenha "Hammer"

  Cenário: Buscar termo inexistente
    Quando eu buscar pelo termo "produtoinexistentexyz"
    Então devo ver a mensagem "There are no products found."

  Esquema do Cenário: Filtrar produtos por categoria
    Quando eu filtrar produtos pela categoria "<categoria>"
    Então todos os produtos exibidos devem pertencer à categoria "<categoria>"

    Exemplos:
      | categoria    |
      | Hand Tools   |
      | Power Tools  |
      | Other        |

  Esquema do Cenário: Ordenar produtos
    Quando eu ordenar os produtos por "<ordenacao>"
    Então a lista de produtos deve ser reordenada de acordo com "<ordenacao>"

    Exemplos:
      | ordenacao          |
      | Name (A - Z)       |
      | Price (High - Low) |