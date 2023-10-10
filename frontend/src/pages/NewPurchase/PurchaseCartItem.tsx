import { usePurchaseItemsContext } from '../../contexts/purchaseItemsContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ProductWithCount } from '../../database/types'

const PurchaseCartItem = ({ item }: { item: ProductWithCount }) => {
  const { changeQuantity, changeUnitPrice, changeSubtotal, deleteItem } =
    usePurchaseItemsContext()
  return (
    <tr>
      <td className="w-40 text-wrap">{item.product.name}</td>
      <td className="w-24 p-0 m-0">
        <input
          value={item.product.buy_price}
          onChange={(e) =>
            changeUnitPrice(item.product.id, Number(e.target.value))
          }
          className="input input-ghost w-full max-w-xs"
        />
      </td>
      <td className="w-36 p-0 m-0">
        <button
          className="btn btn-circle btn-sm"
          onClick={() => changeQuantity(item.product.id, -1)}
        >
          -
        </button>
        <input
          value={item.count}
          onChange={(e) =>
            changeQuantity(item.product.id, Number(e.target.value), true)
          }
          className="input input-ghost w-14 p-2 text-center"
        />
        <button
          className="btn btn-circle btn-sm"
          onClick={() => changeQuantity(item.product.id, 1)}
        >
          +
        </button>
      </td>
      <td className="w-24 p-0 m-0 ">
        <input
          value={Math.round((item.count * item.product.buy_price * 100) / 100)}
          onChange={(e) => {
            changeSubtotal(item.product.id, Number(e.target.value))
          }}
          className="input input-ghost w-full max-w-xs p-2 text-right"
        />
      </td>
      <td
        className="w-4 cursor-pointer"
        onClick={() => deleteItem(item.product.id)}
      >
        <AiOutlineCloseCircle size={26} />
      </td>
      {/* <div>
        <h2 className="text-xl font-bold">{item.product.name}</h2>
        <p>
          {item.product.buy_price} x {item.count}
        </p>
      </div>
      <p className="flex items-center">
        <span className="text-xl font-bold">
          {item.product.buy_price * item.count}
        </span>
        <span className="italic ml-2 text-xs mr-4">kyats</span>
        <span className="cursor-pointer">
          <AiOutlineCloseCircle />
        </span>
      </p> */}
    </tr>
  )
}

export default PurchaseCartItem
