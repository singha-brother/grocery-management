import { baseUrl } from './config'
import { Product, ProductToShow } from './types'
import axios, { AxiosError } from 'axios'

const url = baseUrl + "/api/products"

export const createProduct = async (product: Product) => {
    try {
        const response = await axios.post(url, product)
        // const productId = response.data.id
        // await axios.post(stockUrl, { product_id: productId, quantity: 0 })
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const getAllProducts = async (): Promise<ProductToShow[]> => {
    try {
        const response = await axios.get(url)
        return response.data.items
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const getInStockProducts = async (): Promise<ProductToShow[]> => {
    try {
        const response = await axios.get(url + '/in-stock')
        return response.data.items
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const updateProduct = async (product: Product) => {
    try {
        const result = await axios.patch(`${url}/${product.id}`, product)
        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

