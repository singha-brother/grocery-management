import axios, { AxiosError } from "axios"
import { baseUrl } from "./config"
import { Customer } from "./types"

const url = baseUrl + "/api/customers"

export const createCustomer = async (customer: Customer) => {
    try {
        const response = await axios.post(url, customer)
        console.log(response)
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}


export const updateCustomer = async (customer: Customer) => {
    try {
        const result = await axios.patch(`${url}/${customer.id}`, customer)
        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await axios.get(url)
        console.log(response)
        return response.data.items
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}
