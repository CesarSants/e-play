import { useParams } from 'react-router-dom'
import Hero from '../../components/Hero'

// const Product = () => {
//   const teste = useParams()

//   return <div>produto {teste.id}</div>
// }
// export default Product

const Product = () => {
  const { id } = useParams()

  return (
    <>
      <Hero />
    </>
  )
}
export default Product
