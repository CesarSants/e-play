import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'

import carrinho from '../../assets/images/carrinho.svg'
import logo from '../../assets/images/logo.svg'

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
            <Hamburguer
              title="Clique aqui para abrir o menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </Hamburguer>
            <Link
              onClick={() => setIsMenuOpen(false)}
              title="Clique aqui para volta a Home"
              to={'/'}
            >
              <img src={logo} alt="EPLAY" />
            </Link>
            {/* <img src={logo} alt="EPLAY" /> */}
            <nav>
              <Links>
                <LinkItem>
                  <Link
                    title="Clique aqui para acessar a página de categorias"
                    to={'/categories'}
                  >
                    Categorias
                  </Link>
                </LinkItem>
                <LinkItem>
                  <HashLin
                    title="Clique aqui para acessar a seção de em breve"
                    to="/#comming-soon"
                  >
                    Em breve
                  </HashLin>
                </LinkItem>
                <LinkItem>
                  <HashLin
                    title="Clique aqui para acessar a seção de promoçoes"
                    to="/#on-sale"
                  >
                    Promoções
                  </HashLin>
                </LinkItem>
              </Links>
            </nav>
          </div>
          {items.length > 1 ? (
            <CartButton
              title="Clique aqui para acessar o carrinho"
              onClick={openCart}
            >
              {items.length}
              <span>&nbsp;-&nbsp;produtos</span>
              <img src={carrinho} alt="carrinho" />
            </CartButton>
          ) : items.length === 1 ? (
            <CartButton
              title="Clique aqui para acessar o carrinho"
              onClick={openCart}
            >
              {items.length} <span>&nbsp;-&nbsp;produto</span>
              <img src={carrinho} alt="carrinho" />
            </CartButton>
          ) : (
            <CartButton
              title="Clique aqui para acessar o carrinho"
              onClick={openCart}
            >
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
              <Link
                title="Clique aqui para acessar a página de categorias"
                to={'/categories'}
                onClick={() => setIsMenuOpen(false)}
              >
                Categorias
              </Link>
            </LinkItem>
            <LinkItem>
              <HashLin
                title="Clique aqui para acessar a seção de em breve"
                to="/#comming-soon"
                onClick={() => setIsMenuOpen(false)}
              >
                Em breve
              </HashLin>
            </LinkItem>
            <LinkItem>
              <HashLin
                title="Clique aqui para acessar a seção de promoçoes"
                to="/#on-sale"
                onClick={() => setIsMenuOpen(false)}
              >
                Promoções
              </HashLin>
            </LinkItem>
          </Links>
        </NavMobile>
      </HeaderBar>
    </HeaderContainer>
  )
}

export default Header
