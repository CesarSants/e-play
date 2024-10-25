{
  /* <div>
  // import { useEffect, useState } from 'react'
  // import { Game } from '../Home'
  // import Game from '../../models/Game'
  // import resident from '../../assets/images/resident.png'
  // import diablo from '../../assets/images/diablo.png'
  // import zelda from '../../assets/images/zelda.png'
  // import starWars from '../../assets/images/star_wars.png'
  // import fifa from '../../assets/images/ea-sports-fc-24-capa.png'
  // import street from '../../assets/images/street.png'
  // import assassins from '../../assets/images/assassins2.png'
  // import battlefield from '../../assets/images/battlefield.jpg'
  // import fantasy from '../../assets/images/Final_Fantasy.png'
  // import hogwarts from '../../assets/images/hogwarts.png'
  // import duty from '../../assets/images/call-of-duty.png'
  // import uncharted from '../../assets/images/Uncharted.png'
  // import god from '../../assets/images/good-of-war.jpg'
  // import nba from '../../assets/images/nba.png'
  // import topspin from '../../assets/images/topspin2.png'
  // import madden from '../../assets/images/madden.jpg'
</div> */
}
import ProductsList from '../../components/ProductsList'
import {
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRpgGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportGamesQuery
} from '../../services/api'

// const rpg: Game[] = [
//   // {
//   //   id: 9,
//   //   category: 'RPG',
//   //   description:
//   //     'Final Fantasy VII Rebirth é o segundo lançamento do projeto de remake de Final Fantasy VII...',
//   //   title: 'Final Fantasy VII Rebirth',
//   //   system: 'Windows',
//   //   infos: ['-17%', 'R$ 275,00'],
//   //   image: fantasy
//   // },
//   // {
//   //   id: 2,
//   //   category: 'RPG',
//   //   description:
//   //     'Diablo IV é um RPG em desenvolvimento pela Blizzard Entertainment...',
//   //   title: 'Diablo 4',
//   //   system: 'PS5',
//   //   infos: ['-5%', 'R$ 290,00'],
//   //   image: diablo
//   // },
//   // {
//   //   id: 10,
//   //   category: 'RPG',
//   //   description:
//   //     'Hogwarts Legacy é um jogo eletrônico de RPG de ação desenvolvido pela Avalanche...',
//   //   title: 'Hogwarts Legacy',
//   //   system: 'Xbox Series X',
//   //   infos: ['-19%', 'R$ 215,00'],
//   //   image: hogwarts
//   // },
//   // {
//   //   id: 4,
//   //   category: 'RPG',
//   //   description:
//   //     'Uma aventura épica pela terra e pelos céus de Hyrule aguarda em The Legend of Zelda...',
//   //   title: 'The Legend of Zelda - TOK',
//   //   system: 'Switch',
//   //   infos: ['-20%', 'R$ 200,00'],
//   //   image: zelda
//   // }
// ]

// const acao: Game[] = [
//   // {
//   //   id: 1,
//   //   category: 'Ação',
//   //   description:
//   //     'Residente Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletronico de survival horror...',
//   //   title: 'Resident Evil 4',
//   //   system: 'Windows',
//   //   infos: ['-10%', 'R$ 250,00'],
//   //   image: resident
//   // },
//   // {
//   //   id: 6,
//   //   category: 'Luta/Ação',
//   //   description:
//   //     'Em Street Fighter 6, você irá testar suas habilidades no mundo inteiro em busca de sua força pessoal...',
//   //   title: 'Street Fighter 6',
//   //   system: 'Switch',
//   //   infos: ['-22%', 'R$ 245,00'],
//   //   image: street
//   // },
//   // {
//   //   id: 11,
//   //   category: 'Ação',
//   //   description:
//   //     'Vanguard coloca os jogadores em uma experiência narrativa profundamente envolvente...',
//   //   title: 'Call of Duty®: Vanguard',
//   //   system: 'Xbox Series X',
//   //   infos: ['-8%', 'R$ 327,00'],
//   //   image: duty
//   // },
//   // {
//   //   id: 8,
//   //   category: 'Ação',
//   //   description:
//   //     'Battlefield 2042 marca o retorno à emblemática guerra total da franquia...',
//   //   title: 'Battlefield® 2042',
//   //   system: 'Windows',
//   //   infos: ['50%', 'R$ 110,00'],
//   //   image: battlefield
//   // }
// ]

// const aventura: Game[] = [
//   // {
//   //   id: 12,
//   //   category: 'Aventura',
//   //   description:
//   //     'Busque seu legado e deixe sua marca em UNCHARTED: Coleção Legado dos Ladrões...',
//   //   title: 'Uncharted Legacy of Thieves',
//   //   system: 'Windows',
//   //   infos: ['-5%', 'R$ 255,00'],
//   //   image: uncharted
//   // },
//   // {
//   //   id: 7,
//   //   category: 'Aventura',
//   //   description:
//   //     'O enredo decorre em Londres, em 1868, durante a Revolução Industrial...',
//   //   title: 'Assassins Creed Syndicate',
//   //   system: 'Xbox Series X',
//   //   infos: ['-40%', 'R$ 192,00'],
//   //   image: assassins
//   // },
//   // {
//   //   id: 3,
//   //   category: 'Aventura',
//   //   description:
//   //     'Star Wars Jedi: Survivor é um próximo jogo de ação e aventura desenvolvido pela Respawn...',
//   //   title: 'Star Wars Jedi Survivor',
//   //   system: 'Xbox Series X',
//   //   infos: ['-15%', 'R$ 300,00'],
//   //   image: starWars
//   // },
//   // {
//   //   id: 13,
//   //   category: 'Aventura',
//   //   description:
//   //     'Kratos está presente novamente junto de seu filho Atreus e precisam se aventurar...',
//   //   title: 'God of War Ragnarök',
//   //   system: 'Switch',
//   //   infos: ['-22%', 'R$ 278,00'],
//   //   image: god
//   // }
// ]

// const esportes: Game[] = [
//   // {
//   //   id: 5,
//   //   category: 'Esportes',
//   //   description:
//   //     'EA SPORTs FIFA 24 traz o jogo de Todo Mundo aos gramados com a tecnologia HyperMotion2...',
//   //   title: 'FIFA 24',
//   //   system: 'PS5',
//   //   infos: ['-52%', 'R$ 174,00'],
//   //   image: fifa
//   // },
//   // {
//   //   id: 14,
//   //   category: 'Esportes',
//   //   description:
//   //     'Domine as quadras como Kobe Bryant e recrie suas atuações mais emblemáticas...',
//   //   title: 'NBA 2K24 Kobe Bryant',
//   //   system: 'Xbox Series X',
//   //   infos: ['-60%', 'R$ 138,00'],
//   //   image: nba
//   // },
//   // {
//   //   id: 15,
//   //   category: 'Esportes',
//   //   description:
//   //     'Viaje pelo mundo na pele de um atleta profissional em ascensão, com os maiores nomes do tênis...',
//   //   title: 'Top Spin 2K25',
//   //   system: 'Switch',
//   //   infos: ['-12%', 'R$ 202,00'],
//   //   image: topspin
//   // },
//   // {
//   //   id: 16,
//   //   category: 'Esportes',
//   //   description:
//   //     'Madden NFL 23 é uma tentativa de trazer a série de volta a essas origens humildes...',
//   //   title: 'Madden NFL 23',
//   //   system: 'Windows',
//   //   infos: ['-7%', 'R$ 282,00'],
//   //   image: madden
//   // }
// ]

const Categories = () => {
  // const [gamesAcao, setGameAcao] = useState<Game[]>([])
  // const [gamesEsportes, setGameEsportes] = useState<Game[]>([])
  // const [gamesSimulacao, setGameSimulacao] = useState<Game[]>([])
  // const [gamesLuta, setGameLuta] = useState<Game[]>([])
  // const [gamesRPG, setGameRPG] = useState<Game[]>([])

  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/acao')
  //     .then((res) => res.json())
  //     .then((res) => setGameAcao(res))

  //   fetch('https://fake-api-tau.vercel.app/api/eplay/esportes')
  //     .then((res) => res.json())
  //     .then((res) => setGameEsportes(res))

  //   fetch('https://fake-api-tau.vercel.app/api/eplay/simulacao')
  //     .then((res) => res.json())
  //     .then((res) => setGameSimulacao(res))

  //   fetch('https://fake-api-tau.vercel.app/api/eplay/luta')
  //     .then((res) => res.json())
  //     .then((res) => setGameLuta(res))

  //   fetch('https://fake-api-tau.vercel.app/api/eplay/rpg')
  //     .then((res) => res.json())
  //     .then((res) => setGameRPG(res))
  // }, [])

  const { data: actionGames } = useGetActionGamesQuery()
  const { data: fightGames } = useGetFightGamesQuery()
  const { data: rpgGames } = useGetRpgGamesQuery()
  const { data: sportGames } = useGetSportGamesQuery()
  const { data: simulationGames } = useGetSimulationGamesQuery()

  if (actionGames && simulationGames && sportGames && fightGames && rpgGames) {
    return (
      <>
        <ProductsList
          games={actionGames}
          title="Ação"
          background="gray"
          id="action"
        />
        <ProductsList
          games={sportGames}
          title="Esportes"
          background="black"
          id="sports"
        />
        <ProductsList
          games={simulationGames}
          title="Simulação"
          background="gray"
          id="simulation"
        />
        <ProductsList
          games={fightGames}
          title="Luta"
          background="black"
          id="fight"
        />
        <ProductsList games={rpgGames} title="RPG" background="gray" id="rpg" />
      </>
    )
  }
  return <h4>Carregando...</h4>
}

export default Categories
