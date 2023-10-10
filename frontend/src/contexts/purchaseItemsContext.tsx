import { ReactNode, createContext, useContext, useState } from 'react'
import { ProductToShow, ProductWithCount, Supplier } from '../database/types'

type PurchaseItemsContextType = {
  itemsToPurchase: ProductWithCount[]
  setItemsToPurchase: React.Dispatch<React.SetStateAction<ProductWithCount[]>>
  addToCart: (product: ProductToShow, count: number) => void
  deleteItem: (id: number) => void
  changeQuantity: (id: number, qty: number, isInput?: boolean) => void
  changeUnitPrice: (id: number, price: number) => void
  changeSubtotal: (id: number, price: number) => void
  getTotalPrice: () => number
  supplier?: Supplier
  setSupplier: React.Dispatch<React.SetStateAction<Supplier | undefined>>
}

const PurchaseItemsContext = createContext<PurchaseItemsContextType>({
  itemsToPurchase: [],
  setItemsToPurchase: () => {},
  addToCart: () => {},
  deleteItem: () => {},
  changeQuantity: () => {},
  changeUnitPrice: () => {},
  changeSubtotal: () => {},
  getTotalPrice: () => 0,
  supplier: undefined,
  setSupplier: () => {},
})

const PurchaseItemsProvider = ({ children }: { children: ReactNode }) => {
  const [itemsToPurchase, setItemsToPurchase] = useState<ProductWithCount[]>([])
  const [supplier, setSupplier] = useState<Supplier>()

  const addToCart = (product: ProductToShow, count: number) => {
    const existingItem = itemsToPurchase.find(
      (item) => item.product.id === product.id
    )
    if (existingItem) {
      const updatedCart = itemsToPurchase.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, count: item.count + count }
        }
        return item
      })
      setItemsToPurchase(updatedCart)
    } else {
      setItemsToPurchase([...itemsToPurchase, { product, count: 1 }])
    }
  }

  const changeQuantity = (
    id: number,
    qty: number,
    isInput: boolean = false
  ) => {
    if (typeof qty !== 'number') {
      return
    }
    const updatedCart = itemsToPurchase.map((item) => {
      if (item.product.id === id) {
        if (item.count + qty > 0) {
          if (isInput) {
            return { ...item, count: qty }
          }
          return { ...item, count: item.count + qty }
        }
        return item
      }
      return item
    })
    setItemsToPurchase(updatedCart)
  }

  const changeUnitPrice = (id: number, price: number) => {
    if (typeof price !== 'number') {
      return
    }
    if (price >= 0) {
      const updatedCart = itemsToPurchase.map((item) => {
        if (item.product.id === id) {
          return { ...item, product: { ...item.product, buy_price: price } }
        }
        return item
      })
      setItemsToPurchase(updatedCart)
    }
  }

  const changeSubtotal = (id: number, price: number) => {
    if (typeof price !== 'number') {
      return
    }
    if (price >= 0) {
      const updatedCart = itemsToPurchase.map((item) => {
        if (item.product.id === id) {
          const unitPrice = price / item.count
          return {
            ...item,
            product: {
              ...item.product,
              buy_price: Math.round(unitPrice * 100) / 100,
            },
          }
        }
        return item
      })
      setItemsToPurchase(updatedCart)
    }
  }

  const deleteItem = (id: number) => {
    const updatedCart = itemsToPurchase.filter((item) => item.product.id !== id)
    setItemsToPurchase([...updatedCart])
  }

  const getTotalPrice = () => {
    const totalPrice = itemsToPurchase.reduce(
      (acc, cur) => cur.product.buy_price * cur.count + acc,
      0
    )
    return Math.round(totalPrice * 100) / 100
  }

  return (
    <PurchaseItemsContext.Provider
      value={{
        supplier,
        setSupplier,
        itemsToPurchase,
        setItemsToPurchase,
        addToCart,
        changeQuantity,
        changeUnitPrice,
        changeSubtotal,
        deleteItem,
        getTotalPrice,
      }}
    >
      {children}
    </PurchaseItemsContext.Provider>
  )
}

const usePurchaseItemsContext = () => {
  const context = useContext(PurchaseItemsContext)
  if (context === undefined)
    throw new Error(`This purchaseItemsContext is used outside of the Provider`)
  return context
}

export { PurchaseItemsProvider, usePurchaseItemsContext }
