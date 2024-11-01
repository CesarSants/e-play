import Tag from '../Tag'
import Button from '../Button'
import Loader from '../Loader'

import { formataPreco } from '../../utils'
import { useGetfeaturedGameQuery } from '../../services/api'

import { Imagem, BannerContainer, Titulo, Precos } from './styles'

const Banner = () => {
  const { data: game } = useGetfeaturedGameQuery()
  {
    /*
// const [game, setGame] = useState<Game>()            //metodo usado sem a importação da api usando redux
// useEffect(() => {
//   fetch('https://fake-api-tau.vercel.app/api/eplay/destaque')
//     .then((res) => res.json())
//     .then((res) => setGame(res))
// }, [])
*/
  }

  if (!game) {
    return <Loader />
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
