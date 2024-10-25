import { Link } from 'react-router-dom'
import {
  HeaderBar,
  LinkItem,
  Links,
  CartButton,
  HeaderContainer,
  HashLin
} from './styles'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'
import { open } from '../../store/reducers/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

export type Props = {
  isSpecificPage?: boolean
}

const Header = ({ isSpecificPage }: Props) => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderContainer isSpecificPage={isSpecificPage}>
      <HeaderBar>
        <div>
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
        <CartButton onClick={openCart}>
          {items.length} - produto(s)
          <img src={carrinho} alt="carrinho" />
        </CartButton>
      </HeaderBar>
    </HeaderContainer>
  )
}

export default Header
