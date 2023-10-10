import axios, { AxiosError } from "axios"
import { baseUrl } from "./config"

const url = baseUrl + '/api/purchases'

export const getPurchaseHistory = async () => {
    try {
        const result = await axios.get(url + "/all")
        return result.data.items
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const getPurchaseDetail = async (id: number) => {
    try {
        const result = await axios.get(`${url}/details/${id}`)
        return result.data.items
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}