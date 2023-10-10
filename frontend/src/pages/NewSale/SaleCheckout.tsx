import SaleCheckOutCustomerForm from './SaleCheckoutCustomerForm'
import SaleCheckOutItems from './SaleCheckoutItems'

const SaleCheckOut = ({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="flex max-h-screen overflow-scroll">
      <SaleCheckOutCustomerForm setModalOpen={setModalOpen} />
      <SaleCheckOutItems />
    </div>
  )
}

export default SaleCheckOut
