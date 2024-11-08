// import bannerImg from '../../assets/images/hogwarts.png'
// import bannerImg from '../../assets/images/hog.jpg'
import Button from '../Button'
import Tag from '../Tag'
import { formataPreco } from '../../utils'
import { Banner, Infos } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { add, open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

export type Props = {
  game: Game
}

const Hero = ({ game }: Props) => {
  const itemsInCart = useSelector((state: RootReducer) => state.cart.items)
  const [toastId, setToastId] = useState<string | number | null>(null)
  const dispatch = useDispatch()

  const alertError = () => {
    if (toastId === null) {
      const id = toast.warn('O jogo já esta no carrinho', {
        containerId: 'gameToast',
        onClose: () => setToastId(null)
      })
      setToastId(id)
    }
  }

  const addToCart = () => {
    const isGameInCart = itemsInCart.some((item) => item.id === game.id)

    if (!isGameInCart) {
      dispatch(add(game))
      dispatch(open())
    } else {
      alertError()
    }
  }

  return (
    <Banner style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <ToastContainer
          containerId={'gameToast'}
          position="top-left"
          autoClose={3000}
          draggable
          pauseOnHover
          rtl={false}
          newestOnTop
          pauseOnFocusLoss
        />
        <div>
          <Tag>{game.details.category}</Tag>
          <Tag>{game.details.system}</Tag>
        </div>
        <Infos game={game}>
          <h2>{game.name}</h2>
          <p>
            <>
              {/* {game.prices.discount ? (
              <>
                <span>De {formataPreco(game.prices.old)}</span>
                Por {formataPreco(game.prices.current)}
              </>
            ) : (
              <>{formataPreco(game.prices.current)}</>
            )} */}
            </>
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
            <>
              {/*
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
            </>
          </p>
          {game.prices.current && (
            <Button
              variant="primary"
              title="Clique aqui para adicionar ao carrinho"
              type="button"
              onClick={addToCart}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </Infos>
      </div>
    </Banner>
  )
}

export default Hero
