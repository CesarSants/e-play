import Section from '../Section'
// import zelda from '../../assets/images/zelda.png'
import spiderman from '../../assets/images/banner-homem-aranha.png'
import hogwarts from '../../assets/images/fundo_hogwarts.png'
import play from '../../assets/images/play.png'
import zoom from '../../assets/images/zoom.png'
import fechar from '../../assets/images/fechar.png'

import { Item, Items, Action, Modal, ModalContent } from './styles'
import { useState } from 'react'

type GalleryItem = {
  type: 'image' | 'video'
  url: string
}

const mock: GalleryItem[] = [
  {
    type: 'image',
    url: spiderman
  },
  {
    type: 'image',
    url: hogwarts
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/yF29baX-IsA?si=XzexHXCB_oSc3KWt'
  }
]

type Props = {
  defaultCover: string
  name: string
}

const Gallery = ({ defaultCover, name }: Props) => {
  const [modalEstaAberto, setModalEstaAberto] = useState(false)
  const [modalUrl, setModalUrl] = useState('')

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }

  const getMediaAlt = (item: GalleryItem) => {
    if (item.type === 'image') return 'a imagem'
    return 'o video'
  }

  return (
    <>
      <Section title="Galeria" background="black">
        <Items>
          {mock.map((media, index) => (
            <Item
              key={media.url}
              onClick={() => {
                setModalEstaAberto(true)
                setModalUrl(media.url)
              }}
            >
              <img
                src={getMediaCover(media)}
                alt={`Mídia ${index + 1} de ${name}`}
              />
              <Action>
                <img
                  src={getMediaIcon(media)}
                  alt={`Clique para maximizar ${getMediaAlt(media)}`}
                />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>
      <Modal className={modalEstaAberto ? 'visivel' : ''}>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img
              src={fechar}
              onClick={() => setModalEstaAberto(false)}
              alt="Clique aqui para fechar a midia"
            />
            {/* <img
          src={spiderman}
          alt={`Clique para fechar ${getMediaAlt({
            type: 'image',
            url: spiderman
          })}`}
        /> */}
          </header>
          <img src={modalUrl} alt="x" />
        </ModalContent>
        <div className="overlay"></div>
      </Modal>
    </>
  )
}

export default Gallery
