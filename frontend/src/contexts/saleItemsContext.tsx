import { ReactNode, createContext, useContext, useState } from 'react'
import { useGetInStockProducts } from '../queries/productQueries'
import { UseQueryResult } from '@tanstack/react-query'
import { Customer, ProductToShow, ProductWithCount } from '../database/types'

type SaleItemContextType = {
  productDataQuery: UseQueryResult<ProductToShow[], Error>
  itemsToSale: ProductWithCount[]
  setItemsToSale: React.Dispatch<React.SetStateAction<ProductWithCount[]>>
  addToCart: (product: ProductToShow, count: number) => void
  getTotalPrice: () => number
  changeQuantity: (
    id: number,
    qty: number,
    inStock: number,
    isInput?: boolean
  ) => void
  deleteItem: (id: number) => void
  customer?: Customer
  setCustomer: React.Dispatch<React.SetStateAction<Customer | undefined>>
}

const SaleItemContext = createContext<SaleItemContextType>({
  // @ts-ignore
  productDataQuery: {},
  itemsToSale: [],
  setItemsToSale: () => {},
  addToCart: () => {},
  getTotalPrice: () => 0,
  changeQuantity: () => {},
  deleteItem: () => {},
  customer: {},
  setCustomer: () => {},
})

const SaleItemProvider = ({ children }: { children: ReactNode }) => {
  const productDataQuery = useGetInStockProducts()
  const [customer, setCustomer] = useState<Customer>()
  const [itemsToSale, setItemsToSale] = useState<ProductWithCount[]>([])

  const getTotalPrice = () => {
    const totalPrice = itemsToSale.reduce(
      (acc, cur) => cur.product.sale_price * cur.count + acc,
      0
    )
    return Math.round(totalPrice * 100) / 100
  }

  const addToCart = (product: ProductToShow, count: number) => {
    const existingItem = itemsToSale.find(
      (item) => item.product.id === product.id
    )
    if (existingItem) {
      const updatedCart = itemsToSale.map((item) => {
        if (item.product.id === product.id) {
          if (product.in_stock > item.count)
            return { ...item, count: item.count + count }
        }
        return item
      })
      setItemsToSale(updatedCart)
    } else {
      setItemsToSale([...itemsToSale, { product, count: 1 }])
    }
  }

  const changeQuantity = (
    id: number,
    qty: number,
    inStock: number,
    isInput: boolean = false
  ) => {
    if (typeof qty !== 'number') {
      return
    }
    const updatedCart = itemsToSale.map((item) => {
      if (item.product.id === id) {
        if (isInput) {
          if (qty <= inStock) {
            return { ...item, count: qty }
          }
        } else {
          if (item.count + qty > 0 && item.count + qty <= inStock) {
            return { ...item, count: item.count + qty }
          }
        }
      }
      return item
    })
    setItemsToSale(updatedCart)
  }

  const deleteItem = (id: number) => {
    const updatedCart = itemsToSale.filter((item) => item.product.id !== id)
    setItemsToSale([...updatedCart])
  }

  return (
    <SaleItemContext.Provider
      value={{
        productDataQuery,
        itemsToSale,
        addToCart,
        setItemsToSale,
        getTotalPrice,
        changeQuantity,
        deleteItem,
        customer,
        setCustomer,
      }}
    >
      {children}
    </SaleItemContext.Provider>
  )
}

const useSaleItemsContext = () => {
  const context = useContext(SaleItemContext)
  if (context === undefined)
    throw new Error(`This purchaseItemsContext is used outside of the Provider`)
  return context
}

export { SaleItemProvider, useSaleItemsContext }
