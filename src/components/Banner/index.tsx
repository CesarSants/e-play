import { Imagem, BannerContainer, Titulo, Precos } from './styles'
// import bannerImg from '../../assets/images/banner-homem-aranha.png'
import Tag from '../Tag'
import Button from '../Button'
// import { useEffect, useState } from 'react' //utilizado no metodo sem redux
// import { Game } from '../../pages/Home'
import { formataPreco } from '../ProductsList'

import { useGetfeaturedGameQuery } from '../../services/api'

const Banner = () => {
  const { data: game, isLoading } = useGetfeaturedGameQuery()

  // const [game, setGame] = useState<Game>()            //metodo usado sem a importação da api usando redux
  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/destaque')
  //     .then((res) => res.json())
  //     .then((res) => setGame(res))
  // }, [])

  if (!game) {
    return <h3>Carregando...</h3>
  }

  return (
    <Imagem style={{ backgroundImage: `url(${game.media.cover})` }}>
      <BannerContainer>
        <div className="container">
          <Tag size="big">Destaque do dia</Tag>
          <div>
            <Titulo>{game?.name}</Titulo>
            <Precos>
              De <span>{formataPreco(game.prices.old)}</span> <br />
              por apenas {formataPreco(game.prices.current)}
            </Precos>
          </div>
          <Button
            type="link"
            to={`/product/${game.id}`}
            title="Clique aqui para aproveitar esta oferta"
          >
            Aproveitar
          </Button>
        </div>
      </BannerContainer>
    </Imagem>
  )
}

export default Banner
