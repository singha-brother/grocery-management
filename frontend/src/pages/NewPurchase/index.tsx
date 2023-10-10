import { PurchaseItemsProvider } from '../../contexts/purchaseItemsContext'
import ProductListContainer from './ProductList'
import PurchaseCart from './PurchaseCart'

const NewPurchasePage = () => {
  return (
    <PurchaseItemsProvider>
      {/* <Main title="New Purchase">
        <div className="flex items-start">
          <ProductListContainer />
          <PurchaseCart />
        </div>
      </Main> */}
      <div className="flex items-start">
        <ProductListContainer />
        <PurchaseCart />
      </div>
    </PurchaseItemsProvider>
  )
}

export default NewPurchasePage
