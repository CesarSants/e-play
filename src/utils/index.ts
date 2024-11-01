export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

export const getTotalPrice = (items: Game[]) => {
  return items.reduce((accumulator, currentValue) => {
    if (currentValue.prices.current) {
      return (accumulator += currentValue.prices.current)
      // return (accumulator += currentValue.prices.current!) // exclamação indica que o current sempre ira existir, esse caso funciona sem o if
    }
    return 0
  }, 0)
}
