// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'

// const ScrollToTop = () => {
//   const { pathname } = useLocation()

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [pathname])

//   return null
// }

// export default ScrollToTop

//para o topo da tela

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface ScrollToPositionProps {
  position: number // A posição de rolagem desejada
}

const ScrollToPosition: React.FC<ScrollToPositionProps> = ({ position }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, position)
  }, [pathname, position])

  return null
}

export default ScrollToPosition

// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'

// const ScrollToPosition: React.FC = () => {
//   const { pathname } = useLocation()

//   useEffect(() => {
//     const position = window.innerHeight * 1 // 50% da altura da janela
//     window.scrollTo(0, position)
//   }, [pathname])

//   return null
// }

// export default ScrollToPosition

//para uma porcentagem da tela
