// import bannerImg from '../../assets/images/hogwarts.png'
// import bannerImg from '../../assets/images/hog.jpg'
import { Game } from '../../pages/Home'
import Button from '../Button'
import Tag from '../Tag'
import { formataPreco } from '../ProductsList'
import { Banner, Infos } from './styles'

export type Props = {
  game: Game
}

const Hero = ({ game }: Props) => (
  <Banner style={{ backgroundImage: `url(${game.media.cover})` }}>
    <div className="container">
      <div>
        <Tag>{game.details.category}</Tag>
        <Tag>{game.details.system}</Tag>
      </div>
      <Infos game={game}>
        <h2>{game.name}</h2>
        <p>
          {/* {game.prices.discount ? (
            <>
              <span>De {formataPreco(game.prices.old)}</span>
              Por {formataPreco(game.prices.current)}
            </>
          ) : (
            <>{formataPreco(game.prices.current)}</>
          )} */}

          {game.prices.discount ? (
            <>
              <span>De {formataPreco(game.prices.old)}</span>
              Por {formataPreco(game.prices.current)}
            </>
          ) : (
            <>
              {game.prices.current ? (
                formataPreco(game.prices.current)
              ) : (
                <>
                  Disponível em: <span>{game.release_date}</span>
                </>
              )}
            </>
          )}

          {/* {game.prices.discount ? (                                 data na mesma linha
            <>
              <span>De {formataPreco(game.prices.old)}</span>
              Por {formataPreco(game.prices.current)}
            </>
          ) : (
            <>
              {game.prices.current
                ? formataPreco(game.prices.current)
                : `Disponível em: ${game.release_date}`}
            </>
          )} */}
        </p>
        {game.prices.current && (
          <Button
            variant="primary"
            title="Clique aqui para adicionar ao carrinho"
            type="button"
          >
            Adicionar ao carrinho
          </Button>
        )}
      </Infos>
    </div>
  </Banner>
)

export default Hero
