import { usePurchaseItemsContext } from '../../contexts/purchaseItemsContext'

import { useState } from 'react'
import AppModal from '../../components/AppModal'

import { FiSave } from 'react-icons/fi'
import { BsPlusCircle } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import PurchaseCheckOut from './PurchaseCheckOut'
import PurchaseCartItem from './PurchaseCartItem'
import TextInputAutocomplete from '../../components/TextInputAutoComplete'
import { Supplier } from '../../database/types'
import { useGetSuppliers } from '../../queries/supplierQueries'
import SupplierForm from '../Suppliers/SupplierForm'
// import PurchaseCartCalculator from './PurchaseCartCalculator'

const PurchaseCart = () => {
  const { itemsToPurchase, getTotalPrice } = usePurchaseItemsContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  return (
    <div className=" min-w-[600px] xl:min-w-[700px] bg-base-100 h-[calc(100vh-93px)] flex flex-col">
      {/* <h2 className="text-xl font-bold px-4 p-2">Items To Purchase</h2> */}
      <PurchaseCartSupplier />
      <div className="bg-base-100 flex-1 overflow-scroll">
        <table className="table table-lg ">
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Buy Price</th>
              <th>Qty</th>
              <th>Sub-total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemsToPurchase.map((item) => (
              <PurchaseCartItem key={item.product.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-primary py-2 px-6 text-primary-content flex justify-between">
        <h2 className="text-xl font-bold">Total</h2>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{getTotalPrice()}</h2>
          <p className="italic">kyats</p>
        </div>
      </div>

      <div
        className="btn btn-outline btn-primary rounded-none absolute right-2 bottom-20 shadow-lg"
        onClick={() => {
          if (itemsToPurchase.length > 0) {
            setModalOpen(true)
          }
        }}
      >
        <FiSave /> Save
      </div>
      <AppModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <PurchaseCheckOut setModalOpen={setModalOpen} />
      </AppModal>
    </div>
  )
}

export default PurchaseCart

const PurchaseCartSupplier = () => {
  const { supplier, setSupplier } = usePurchaseItemsContext()

  const suppliers = useGetSuppliers()
  const [supplierModalOpen, setSupplierModalOpen] = useState<boolean>(false)
  const onSuggestionCallback = (supplier: Supplier) => {
    setSupplier(supplier)
  }
  return (
    <div className=" py-3">
      <div className="flex items-center justify-between px-6 ">
        <h2 className="text-lg font-bold">Supplier</h2>
        <div className="flex">
          {suppliers.isSuccess && (
            <TextInputAutocomplete
              suggestionCallback={onSuggestionCallback}
              suggestions={suppliers.data}
              searchField="name"
              showFields={['name', 'phone_number', 'company_name']}
            />
          )}
          <button
            className="pl-6 cursor-pointer"
            onClick={() => setSupplierModalOpen(true)}
          >
            <BsPlusCircle size={30} />
          </button>
        </div>
      </div>
      <div className="bg-base-200 shadow-sm mx-6 text-info-content h-20 mt-2 px-6 py-3">
        {supplier !== undefined ? (
          <div className="text-lg flex justify-between">
            <span>{supplier.name}</span>
            <span>{supplier.company_name}</span>
            <span className="flex items-center gap-4">
              {supplier.phone_number || ''}
              <span
                className="cursor-pointer"
                onClick={() => setSupplier(undefined)}
              >
                <AiOutlineCloseCircle color="red" size={25} />
              </span>
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <AppModal
        modalOpen={supplierModalOpen}
        setModalOpen={setSupplierModalOpen}
      >
        <SupplierForm
          additionalFuncAfterCreate={(s: Supplier) => {
            setSupplier(s)
            setSupplierModalOpen(false)
          }}
          setModalOpen={setSupplierModalOpen}
        />
      </AppModal>
    </div>
  )
}
