export type Category = {
    id?: number
    name: string
    is_active: boolean
}

export type Product = {
    id?: number
    name: string
    description?: string
    sale_price: number | string
    buy_price: number | string
    unit: string
    category_id: number
}

export type ProductToShow = {
    id: number
    name: string
    description?: string
    sale_price: number
    buy_price: number
    unit: string
    category_id: number
    category_name: string
    in_stock: number
    sold: number
    loss: number
}

export type Supplier = {
    id?: number
    name: string
    phone_number: string
    company_name: string
    amount_paid?: number
}

export type Customer = {
    id?: number
    name?: string
    phone_number?: string
    amount_paid?: number
}

export type ProductsPurchases = {
    id: number
    total: number
    total_paid: number
    created: string
    is_paid: string
    name: string
    company_name: string
    phone_number: string
}

export type ProductWithCount = {
    product: ProductToShow
    count: number
}
