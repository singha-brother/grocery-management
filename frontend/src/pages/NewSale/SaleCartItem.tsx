import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ProductWithCount } from '../../database/types'
import { useSaleItemsContext } from '../../contexts/saleItemsContext'

const SaleCartItem = ({
  item,
  idx,
}: {
  item: ProductWithCount
  idx: number
}) => {
  const { changeQuantity, deleteItem } = useSaleItemsContext()
  return (
    <tr>
      <td>{idx + 1}</td>
      <td className="w-50 text-wrap p-0">{item.product.name}</td>
      <td className="w-24 p-0 m-0">
        <p>{item.product.sale_price}</p>
      </td>
      <td className="w-36 p-0 m-0">
        <button
          className="btn btn-circle btn-sm"
          onClick={() =>
            changeQuantity(item.product.id, -1, item.product.in_stock)
          }
        >
          -
        </button>
        <input
          value={item.count}
          onChange={(e) =>
            changeQuantity(
              item.product.id,
              Number(e.target.value),
              item.product.in_stock,
              true
            )
          }
          className="input input-ghost w-14 p-2 text-center"
        />
        <button
          className="btn btn-circle btn-sm"
          onClick={() =>
            changeQuantity(item.product.id, 1, item.product.in_stock)
          }
        >
          +
        </button>
      </td>
      <td className="w-24 p-0 m-0 text-right">
        <p>{Math.round(item.count * item.product.sale_price)}</p>
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

export default SaleCartItem
