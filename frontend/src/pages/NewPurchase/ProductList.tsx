import { useState } from 'react'
import { ProductToShow } from '../../database/types'
import { useGetProducts } from '../../queries/productQueries'
import { usePurchaseItemsContext } from '../../contexts/purchaseItemsContext'
import AppModal from '../../components/AppModal'
import ProductForm from '../Products/ProductForm'

import { IoMdRefresh } from 'react-icons/io'

const ProductListContainer = () => {
  const [filterText, setFilterText] = useState('')
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false)

  const result = useGetProducts()

  return (
    <div className="flex flex-col px-6 gap-4 flex-1">
      <div className="flex justify-between flex-wrap gap-y-4">
        <input
          type="text"
          placeholder="Search Product ..."
          className="input input-bordered rounded-full w-full max-w-xs bg-transparent"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        {/* PRODUCT FORM */}
        <div className="flex px-6 mb-4 gap-4">
          <button
            className="btn btn-outline"
            onClick={() => setProductModalOpen(true)}
          >
            + New Product
          </button>

          <button onClick={result.refetchProducts}>
            <IoMdRefresh size={30} />
          </button>
        </div>

        <AppModal
          modalOpen={productModalOpen}
          setModalOpen={setProductModalOpen}
        >
          <ProductForm setModalOpen={setProductModalOpen} />
        </AppModal>
      </div>
      {result.isLoading && (
        <span className="loading loading-dots loading-lg"></span>
      )}
      {result.isSuccess && (
        <ProductList products={result.data} filterText={filterText} />
      )}
    </div>
  )
}

export default ProductListContainer

const ProductList = ({
  products,
  filterText,
}: {
  products: ProductToShow[]
  filterText: string
}) => {
  const productsToShow = products.filter((product) =>
    product.name.toLowerCase().includes(filterText.toLowerCase())
  )
  return (
    <div className="flex flex-wrap gap-2 pt-2  justify-start max-h-[calc(100vh-175px)] overflow-scroll">
      {productsToShow.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

const ProductCard = ({ product }: { product: ProductToShow }) => {
  const { addToCart } = usePurchaseItemsContext()
  return (
    <div
      className="card rounded-sm w-44 shadow-md text-base-content cursor-pointer hover:-translate-y-1 duration-200 hover:shadow-xl active:translate-y-1 active:shadow-md select-none py-0 bg-base-100 hover:bg-info"
      onClick={() => {
        addToCart(product, 1)
      }}
    >
      <div className="p-4 h-full flex flex-col">
        <h2 className="card-title text-lg mb-4">{product.name}</h2>
        <div className="flex-1"></div>
        <p>
          <span>price : </span>
          <span>{product.buy_price}</span>
          <span className="ml-2 italic text-xs">kyats</span>
        </p>
        <p>
          <span>stock : </span>
          <span className="font-bold text-xl pr-2">{product.in_stock}</span>
          {product.unit}
        </p>
      </div>
    </div>
  )
}
