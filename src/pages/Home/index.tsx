import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'
{
  /* <div>
  // import Game from '../../models/Game'
  // import resident from '../../assets/images/resident.png'
  // import diablo from '../../assets/images/diablo.png'
  // import zelda from '../../assets/images/zelda.png'
  // import starWars from '../../assets/images/star_wars.png'
  // import fifa from '../../assets/images/ea-sports-fc-24-capa.png'
  // import street from '../../assets/images/street.png'
  // import assassins from '../../assets/images/assassins2.png'
  // import battlefield from '../../assets/images/battlefield.jpg'
  // import { useEffect, useState } from 'react' //utilizado no metodo sem redux
</div> */
}
import { useGetOnSaleQuery, useGetSoonQuery } from '../../services/api'

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Game = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    languages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}

// const promocoes: Game[] = [
//   {
//     id: 1,
//     category: 'Ação',
//     description:
//       'Residente Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletronico de survival horror...',
//     title: 'Resident Evil 4',
//     system: 'Windows',
//     infos: ['-10%', 'R$ 250,00'],
//     image: resident
//   },
//   {
//     id: 2,
//     category: 'RPG',
//     description:
//       'Diablo IV é um RPG em desenvolvimento pela Blizzard Entertainment',
//     title: 'Diablo 4',
//     system: 'PS5',
//     infos: ['-5%', 'R$ 290,00'],
//     image: diablo
//   },
//   {
//     id: 3,
//     category: 'Aventura',
//     description:
//       'Star Wars Jedi: Survivor é um próximo jogo de ação e aventura desenvolvido pela Respawn...',
//     title: 'Star Wars Jedi Survivor',
//     system: 'Xbox Series X',
//     infos: ['-15%', 'R$ 300,00'],
//     image: starWars
//   },
//   {
//     id: 4,
//     category: 'RPG',
//     description:
//       'Uma aventura épica pela terra e pelos céus de Hyrule aguarda em The Legend of Zelda...',
//     title: 'The Legend of Zelda - TOK',
//     system: 'Switch',
//     infos: ['-20%', 'R$ 200,00'],
//     image: zelda
//   }
// ]

// const emBreve: Game[] = [
//   {
//     id: 5,
//     category: 'Esportes',
//     description:
//       'EA SPORTs FIFA 24 traz o jogo de Todo Mundo aos gramados com a tecnologia HyperMotion2...',
//     title: 'FIFA 24',
//     system: 'PS5',
//     infos: ['10/11'],
//     image: fifa
//   },
//   {
//     id: 6,
//     category: 'Luta',
//     description:
//       'Em Street Fighter 6, você irá testar suas habilidades no mundo inteiro em busca de sua força pessoal',
//     title: 'Street Fighter 6',
//     system: 'Switch',
//     infos: ['15/11'],
//     image: street
//   },
//   {
//     id: 7,
//     category: 'Aventura',
//     description:
//       'O enredo decorre em Londres, em 1868, durante a Revolução Industrial',
//     title: 'Assassins Creed Syndicate',
//     system: 'Xbox Series X',
//     infos: ['10/12'],
//     image: assassins
//   },
//   {
//     id: 8,
//     category: 'Ação',
//     description:
//       'Battlefield 2042 marca o retorno à emblemática guerra total da franquia.',
//     title: 'Battlefield 2042',
//     system: 'Windows',
//     infos: ['20/12'],
//     image: battlefield
//   }
// ]

const Home = () => {
  // const [promocoes, setPromocoes] = useState<Game[]>([])
  // const [emBreve, setEmBreve] = useState<Game[]>([])

  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
  //     .then((res) => res.json())
  //     .then((res) => setPromocoes(res))
  // }, [])

  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/em-breve')
  //     .then((res) => res.json())
  //     .then((res) => setEmBreve(res))
  // }, [])                 // usado antes de aplicar o redux api

  const { data: onSaleGames, isLoading: isLoadingSale } = useGetOnSaleQuery()
  const { data: soonGames, isLoading: isLoadingSoon } = useGetSoonQuery()

  // if (onSaleGames && soonGames) {
  //   // usando com redux
  return (
    <>
      <Banner />
      <ProductsList
        games={onSaleGames}
        title="Promoções"
        background="gray"
        id="on-sale"
        isLoading={isLoadingSale}
      />
      <ProductsList
        games={soonGames}
        title="Em breve"
        background="black"
        id="comming-soon"
        isLoading={isLoadingSoon}
      />
    </>
  )
}
// return <h4>Carregando...</h4> //usado com redux

export default Home
