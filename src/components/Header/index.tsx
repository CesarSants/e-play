import { Link } from 'react-router-dom'
import { HeaderBar, LinkItem, Links, LinkCart, HeaderContainer } from './styles'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

export type Props = {
  isSpecificPage?: boolean
}

const Header = ({ isSpecificPage }: Props) => (
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
              <a href="#">Novidades</a>
            </LinkItem>
            <LinkItem>
              <a href="#">Promoções</a>
            </LinkItem>
          </Links>
        </nav>
      </div>
      <LinkCart href="#">
        0 - produto(s)
        <img src={carrinho} alt="carrinho" />
      </LinkCart>
    </HeaderBar>
  </HeaderContainer>
)

export default Header
