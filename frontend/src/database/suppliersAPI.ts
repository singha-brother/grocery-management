import axios, { AxiosError } from "axios"
import { baseUrl } from "./config"
import { Supplier } from "./types"

const url = baseUrl + "/api/suppliers"

export const createSupplier = async (supplier: Supplier) => {
    try {
        const response = await axios.post(url, supplier)

        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}


export const updateSupplier = async (supplier: Supplier) => {
    try {
        const result = await axios.patch(`${url}/${supplier.id}`, supplier)
        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const getAllSuppliers = async (): Promise<Supplier[]> => {
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
