import { useState } from 'react'

import { FiSave } from 'react-icons/fi'
import { BsPlusCircle } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import TextInputAutocomplete from '../../components/TextInputAutoComplete'
import { Customer } from '../../database/types'
import { useSaleItemsContext } from '../../contexts/saleItemsContext'
import SaleCartItem from './SaleCartItem'
import { useGetCustomers } from '../../queries/customerQueries'
import AppModal from '../../components/AppModal'
import CustomerForm from '../Customers/CustomerForm'
import SaleCheckOut from './SaleCheckout'

// import PurchaseCartCalculator from './PurchaseCartCalculator'

const SaleCart = () => {
  const [activeTab, setActiveTab] = useState(1)
  return (
    <div className="w-[750px] bg-base-100 h-[calc(100vh-100px)] flex flex-col">
      {/* <h2 className="text-xl font-bold px-4 p-2">Items To Purchase</h2> */}
      <div className="tabs bg-base-200">
        <div
          className={`tab tab-lifted text-lg  ${
            activeTab === 1 ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab(1)}
        >
          Cart
        </div>
        <div
          className={`tab tab-lifted text-lg ${
            activeTab === 2 ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab(2)}
        >
          Customer
        </div>
      </div>
      <div className={`${activeTab === 1 ? 'hidden' : ''}`}>
        <SaleCartCustomer />
      </div>
      <div className={`h-full ${activeTab === 2 ? 'hidden' : ''}`}>
        <SaleCartTable />
      </div>
    </div>
  )
}

export default SaleCart

const SaleCartCustomer = () => {
  const { customer, setCustomer } = useSaleItemsContext()
  const customers = useGetCustomers()
  const [customerModalOpen, setCustomerModalOpen] = useState<boolean>(false)
  const onSuggestionCallback = (customer: Customer) => {
    setCustomer(customer)
  }

  if (customers.isSuccess) {
    console.log(customers.data)
  }
  return (
    <div className=" py-3">
      <div className="flex items-center justify-between px-6 ">
        <h2 className="text-lg font-bold">Customer</h2>
        <div className="flex">
          {customers.isSuccess && (
            <TextInputAutocomplete
              suggestionCallback={onSuggestionCallback}
              suggestions={customers.data}
              searchField="name"
              showFields={['name', 'phone_number']}
            />
          )}
          <button
            className="pl-6 cursor-pointer"
            onClick={() => setCustomerModalOpen(true)}
          >
            <BsPlusCircle size={30} />
          </button>
        </div>
      </div>
      <div className="bg-base-200 shadow-sm mx-6 text-info-content mt-2 px-6 py-3">
        {customer !== undefined ? (
          <div className="text-lg flex justify-between">
            <span>{customer.name}</span>
            <span className="flex items-center gap-4">
              {customer.phone_number || ''}
              <span
                className="cursor-pointer"
                onClick={() => setCustomer(undefined)}
              >
                <AiOutlineCloseCircle color="red" size={25} />
              </span>
            </span>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
      <AppModal
        modalOpen={customerModalOpen}
        setModalOpen={setCustomerModalOpen}
      >
        <CustomerForm
          additionalFuncAfterCreate={(c: Customer) => {
            setCustomer(c)
            setCustomerModalOpen(false)
          }}
          setModalOpen={setCustomerModalOpen}
        />
      </AppModal>
    </div>
  )
}

const SaleCartTable = () => {
  const { itemsToSale, getTotalPrice } = useSaleItemsContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <div className="bg-base-100 h-full flex flex-col overflow-scroll">
        <div className="flex-1 overflow-scroll">
          <table className="table table-lg">
            <thead>
              <tr className="">
                <th className="">No.</th>
                <th className="p-0">Name</th>
                <th className="p-0">Price</th>
                <th className="p-0">Qty</th>
                <th className="p-0 w-14">Sub-total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsToSale.map((item, idx) => {
                return (
                  <SaleCartItem key={item.product.id} item={item} idx={idx} />
                )
              })}
            </tbody>
          </table>
          <div className="w-full border-t-2 p-4 pb-20">
            <p>Tax</p>
            <p>Reduce</p>
          </div>
        </div>

        <div className="bg-info py-2 px-6 text-info-content flex justify-between">
          <h2 className="text-xl font-bold">Total</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{getTotalPrice()}</h2>
            <p className="italic">kyats</p>
          </div>
        </div>
      </div>

      <div
        className="btn  btn-primary rounded-none absolute right-2 bottom-20 shadow-lg"
        onClick={() => {
          if (itemsToSale.length > 0) {
            setModalOpen(true)
          }
        }}
      >
        <FiSave /> Save
      </div>
      <AppModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <SaleCheckOut setModalOpen={setModalOpen} />
      </AppModal>
    </>
  )
}
