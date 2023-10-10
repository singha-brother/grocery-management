import { useState } from 'react'
import AppModal from '../../components/AppModal'
import ProductForm from './ProductForm'
import ProductTable from './ProductTable'
import { Product } from '../../database/types'

const ProductsPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [formProduct, setFormProduct] = useState<Product>()

  return (
    // <Main title="Manage Products">
    <>
      <div className="px-6 mb-4">
        <button className="btn btn-outline" onClick={() => setModalOpen(true)}>
          + New Product
        </button>
      </div>
      <AppModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ProductForm setModalOpen={setModalOpen} product={formProduct} />
      </AppModal>

      <ProductTable
        setModalOpen={setModalOpen}
        setFormProduct={setFormProduct}
      />
    </>
    // </Main>
  )
}

export default ProductsPage
