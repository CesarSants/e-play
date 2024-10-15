import Product from '../Product'

import { List, Container } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
}

const ProductsList = ({ background, title }: Props) => (
  <Container background={background}>
    <div className="container">
      <h2>{title}</h2>
      <List>
        <Product
          categoty="Ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="Windows"
          title="Nome do jogo"
        />
        <Product
          categoty="Ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="Windows"
          title="Nome do jogo"
        />
        <Product
          categoty="Ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="Windows"
          title="Nome do jogo"
        />
        <Product
          categoty="Ação"
          description="teste"
          image="//placehold.it/222x250"
          infos={['-10%', 'R$ 150']}
          system="Windows"
          title="Nome do jogo"
        />
      </List>
    </div>
  </Container>
)

export default ProductsList
