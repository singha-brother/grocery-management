import PurchaseCheckOutItems from './PurchaseCheckOutItems'
import PurchaseCheckOutSupplierForm from './PurchaseCheckOutSupplierForm'

const PurchaseCheckOut = ({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="flex max-h-screen overflow-scroll">
      <PurchaseCheckOutSupplierForm setModalOpen={setModalOpen} />
      <PurchaseCheckOutItems />
    </div>
  )
}

export default PurchaseCheckOut
