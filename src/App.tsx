// import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  useLocation
  //_____________________________________________________
  // createBrowserRouter,
  // RouterProvider,
  // Routes,                            esse metodo é utilizado com o BrowserRouter mas esta importado no arquivo routes
  // Route
  //_____________________________________________________
} from 'react-router-dom'

import Header from './components/Header'
import { GlobalCss } from './styles'
import Rotas from './routes'
import Footer from './components/Footer'
import { store } from './store'
import Cart from './components/Cart'
// import Home from './pages/Home'
// import Categories from './pages/Categories'                   esta importado no arquivo routes

//________________________________________________________________________________________________________________________________
// const rotas = createBrowserRouter([               esse metodo é utilizaDO usando o router provider, porem o header esta antes dele
//   {                                               entao para resolver esse problema utilizamos o Browser router no fragmento e a escrita
//     path: '/',                                    deixa de ser como json e passa a ser como uma função igual esta feita abaixo
//     element: <Home />                             os dois metodos tem o mesmo resultado
//   },
//   {
//     path: '/categories',
//     element: <Categories />
//   }
// ])
//___________________________________________________________________________________________
// function App() {
//   const location = useLocation()

//   // Verifica se a rota atual é '/product/:id'
//   const isProductPage = location.pathname.includes('/product')

//   return (
//     <BrowserRouter>
//       {/* antes aqui era apenas um fragmento*/}
//       <GlobalCss />
//       <div className="container">
//         {/* <Header isSpecificPage /> */}
//         {!isProductPage && <Header />}
//       </div>
//       {/* <RouterProvider router={Rotas} />            esse metodo é utilizado com o json, igual esta comentado no arquivo routes*/}
//       <Rotas />
//       <Footer />
//     </BrowserRouter>
//   )
// }
// export default App
//______________________________________________________________________________________________________

function App() {
  const location = useLocation()
  const isProductPage = location.pathname.includes('/product')

  return (
    <>
      <GlobalCss />
      <div className="container">{!isProductPage && <Header />}</div>
      <Rotas />
      <Footer />
      <Cart />
    </>
  )
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}
