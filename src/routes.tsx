import {
  // createBrowserRouter,
  // RouterProvider,
  // BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Product from './pages/Product'

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

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/product/:id" element={<Product />} />
  </Routes>
)

export default Rotas
