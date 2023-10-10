import { SaleItemProvider } from '../../contexts/saleItemsContext'
import ProductListContainer from './ProductList'
import SaleCart from './SaleCart'

const NewSalePage = () => {
  return (
    <SaleItemProvider>
      <div className="flex items-start">
        <ProductListContainer />
        <SaleCart />
      </div>
    </SaleItemProvider>
  )
}

export default NewSalePage
