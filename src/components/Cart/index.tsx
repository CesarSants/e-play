import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import Tag from '../Tag'

import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'
import { formataPreco, getTotalPrice } from '../../utils'

import {
  Overlay,
  CartContainer,
  Sidebar,
  Prices,
  Quantity,
  CartItem
} from './styles'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const goToCheckout = () => {
    navigate('/checkout')
    closeCart()
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay className={isOpen ? 'is-open' : ''} onClick={closeCart} />
      <Sidebar>
        <ul>
          {items.map((item) => (
            <CartItem key={item.id}>
              <img src={item.media.thumbnail} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <Tag>{item.details.category}</Tag>
                <Tag>{item.details.system}</Tag>
                <span>{formataPreco(item.prices.current)}</span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                title="Clique aqui para remover do carrinho"
                type="button"
              />
            </CartItem>
          ))}
        </ul>
        {items.length > 1 ? (
          <Quantity>{items.length} jogos no carrinho</Quantity>
        ) : items.length === 1 ? (
          <Quantity>{items.length} jogo no carrinho</Quantity>
        ) : (
          <Quantity> O carrinho está vazio</Quantity>
        )}
        {items.length >= 1 ? (
          <Prices>
            Total de {formataPreco(getTotalPrice(items))}{' '}
            <span>Em até 6x sem juros</span>
          </Prices>
        ) : null}

        <Button
          onClick={goToCheckout}
          type="button"
          title="Clique aqui para continuar com a compra"
        >
          Continuar com a compra
        </Button>
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
