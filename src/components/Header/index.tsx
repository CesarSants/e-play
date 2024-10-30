import { Link } from 'react-router-dom'
import {
  HeaderBar,
  LinkItem,
  Links,
  CartButton,
  HeaderContainer,
  HashLin,
  Hamburguer,
  HeaderRow,
  NavMobile
} from './styles'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'
import { open } from '../../store/reducers/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { useState } from 'react'

export type Props = {
  isSpecificPage?: boolean
}

const Header = ({ isSpecificPage }: Props) => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderContainer
      isSpecificPage={isSpecificPage}
      className={isSpecificPage && isMenuOpen ? 'is-open' : ''} //@
    >
      <HeaderBar>
        <HeaderRow>
          <div>
            <Hamburguer onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </Hamburguer>
            <Link to={'/'}>
              <img src={logo} alt="EPLAY" />
            </Link>
            {/* <img src={logo} alt="EPLAY" /> */}
            <nav>
              <Links>
                <LinkItem>
                  <Link to={'/categories'}>Categorias</Link>
                </LinkItem>
                <LinkItem>
                  <HashLin to="/#comming-soon">Em breve</HashLin>
                </LinkItem>
                <LinkItem>
                  <HashLin to="/#on-sale">Promoções</HashLin>
                </LinkItem>
              </Links>
            </nav>
          </div>
          {items.length > 1 ? (
            <CartButton onClick={openCart}>
              {items.length}
              <span>&nbsp;-&nbsp;produtos</span>
              <img src={carrinho} alt="carrinho" />
            </CartButton>
          ) : items.length === 1 ? (
            <CartButton onClick={openCart}>
              {items.length} <span>&nbsp;-&nbsp;produto</span>
              <img src={carrinho} alt="carrinho" />
            </CartButton>
          ) : (
            <CartButton onClick={openCart}>
              <span>Carrinho vazio </span> <img src={carrinho} alt="carrinho" />
            </CartButton>
          )}
          {/* <CartButton onClick={openCart}>
          {items.length} - produto(s)
          <img src={carrinho} alt="carrinho" />
        </CartButton> */}
        </HeaderRow>
        <NavMobile className={isMenuOpen ? 'is-open' : ''}>
          <Links>
            <LinkItem>
              <Link to={'/categories'}>Categorias</Link>
            </LinkItem>
            <LinkItem>
              <HashLin to="/#comming-soon">Em breve</HashLin>
            </LinkItem>
            <LinkItem>
              <HashLin to="/#on-sale">Promoções</HashLin>
            </LinkItem>
          </Links>
        </NavMobile>
      </HeaderBar>
    </HeaderContainer>
  )
}

export default Header
