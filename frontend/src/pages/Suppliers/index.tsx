import { useState } from 'react'
import { Supplier } from '../../database/types'
import AppModal from '../../components/AppModal'
import SupplierForm from './SupplierForm'
import SupplierTable from './SupplierTable'

const SupplierPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [formSupplier, setFormSupplier] = useState<Supplier>()

  return (
    // <Main title="Manage Suppliers">
    <div>
      <div className="px-6 mb-4">
        <button className="btn btn-outline" onClick={() => setModalOpen(true)}>
          + New Supplier
        </button>
      </div>
      <AppModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <SupplierForm setModalOpen={setModalOpen} supplier={formSupplier} />
      </AppModal>

      <SupplierTable
        setModalOpen={setModalOpen}
        setFormSupplier={setFormSupplier}
      />
    </div>
    // </Main>
  )
}

export default SupplierPage
