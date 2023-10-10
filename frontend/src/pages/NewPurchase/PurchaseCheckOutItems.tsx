import { usePurchaseItemsContext } from '../../contexts/purchaseItemsContext'

const PurchaseCheckOutItems = () => {
  const { itemsToPurchase, getTotalPrice } = usePurchaseItemsContext()

  return (
    <div className="w-96 flex flex-col items-center bg-base-200">
      <div className="w-full pt-4 pr-4">
        <p className="text-right">
          {new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
      <p className="mt-6 mb-2">Total Amount</p>
      <p className="text-2xl font-bold text-primary-focus mb-4">
        {getTotalPrice()} kyats
      </p>
      <div className="border-[1px] w-full mb-4"></div>
      <ul className="w-full mb-4">
        {itemsToPurchase.map((item) => (
          <div
            key={item.product.id}
            className="w-full flex justify-between py-2 px-4"
          >
            <div>
              <h2 className="font-bold text-xl">{item.product.name}</h2>
              <p>
                {item.product.buy_price} x {item.count}/{item.product.unit}
              </p>
            </div>
            <p className="font-bold text-lg">
              {Math.round(
                (item.product.buy_price * item.count * 100) / 100
              ).toFixed(2)}{' '}
            </p>
          </div>
        ))}
      </ul>
      <div className="border-[1px] w-full mb-4"></div>
    </div>
  )
}

export default PurchaseCheckOutItems
