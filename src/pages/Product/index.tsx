import { useParams } from 'react-router-dom'

import Hero from '../../components/Hero'
import Section from '../../components/Section'
import Header from '../../components/Header'
import Gallery from '../../components/Gallery'

import { useGetGameQuery } from '../../services/api'
import Loader from '../../components/Loader'
{
  /* <div>
  // import residentEvil from '../../assets/images/resident.png'
  // import { useEffect, useState } from 'react' //usado na sem o redux
</div> */
}

// const Product = () => {
//   const teste = useParams()

//   return <div>produto {teste.id}</div>
// }
// export default Product

type GameParams = {
  id: string
}

const Product = () => {
  const { id } = useParams() as GameParams
  const { data: game } = useGetGameQuery(id) // !depois indica que é obrigatorio

  {
    /* <div>
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/eplay/jogos/${id}`)
      .then((res) => res.json())
      .then((res) => setGame(res))
  }, [id])                      //usado sem o redux api //sem a div
</div> */
  }

  if (!game) {
    return <Loader />
  }

  return (
    <>
      <div className="container">
        <Header isSpecificPage />
      </div>
      <Hero game={game} />
      <Section title="Sobre o jogo" background="black">
        <p>{game.description}</p>
      </Section>
      <Section title="Mais detalhes" background="gray">
        <p>
          <b>Plataforma:</b> {game.details.system}
          <br />
          <b>Desenvolvedor:</b> {game.details.developer} <br />
          <b>Editora:</b> {game.details.publisher} <br />
          <b>Idiomas:</b> O jogo oferece suporte a diversos idiomas,&nbsp;
          incluindo;&nbsp;
          {game.details.languages.join(', ')}. As opções de áudio e legendas
          podem ser ajustadas nas configurações do jogo.
        </p>
      </Section>
      <Gallery
        name={game.name}
        defaultCover={game.media.cover}
        items={game.media.gallery}
      />
    </>
  )
}
export default Product
