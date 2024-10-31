import { useState } from 'react'

import Section from '../Section'
import { GalleryItem } from '../../pages/Home/index'

import play from '../../assets/images/play.png'
import zoom from '../../assets/images/zoom.png'
import fechar from '../../assets/images/fechar.png'

import { Item, Items, Action, Modal, ModalContent } from './styles'

// const mock: GalleryItem[] = [
//   {
//     type: 'image',
//     url: spiderman
//   },
//   {
//     type: 'image',
//     url: hogwarts
//   },
//   {
//     type: 'video',
//     url: 'https://www.youtube.com/embed/yF29baX-IsA?si=XzexHXCB_oSc3KWt'
//   }
// ]

type Props = {
  defaultCover: string
  name: string
  items: GalleryItem[]
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, items }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  })
  // const [modalEstaAberto, setModalEstaAberto] = useState(false)
  // const [modalUrl, setModalUrl] = useState('')

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

  const closeModal = () => {
    setModal({
      isVisible: false,
      type: 'image',
      url: ''
    })
  }

  return (
    <>
      <Section title="Galeria" background="black">
        <Items>
          {items.map((media, index) => (
            <Item
              key={media.url}
              // onClick={() => {
              //   setModalEstaAberto(true)
              //   setModalUrl(media.url)
              // }}
              onClick={() => {
                setModal({
                  isVisible: true,
                  type: media.type,
                  url: media.url
                })
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
      <Modal className={modal.isVisible ? 'visivel' : ''}>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img
              src={fechar}
              onClick={() => {
                closeModal()
              }}
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
          {modal.type === 'image' ? (
            <img src={modal.url} alt="x" />
          ) : (
            <iframe
              title="YouTube video player"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              src={modal.url}
            />
          )}
        </ModalContent>
        <div
          onClick={() => {
            closeModal()
          }}
          className="overlay"
        ></div>
      </Modal>
    </>
  )
}

export default Gallery
