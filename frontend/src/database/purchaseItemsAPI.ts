import axios, { AxiosError } from "axios"
import { baseUrl } from "./config"
import { ProductWithCount } from "./types"

const url = baseUrl + '/api/operation/purchase'

export const purchaseItemsAPI = async (
    totalPrice: number,
    transactionType: string,
    supplierId: number,
    totalPaid: number,
    itemsToPurchase: ProductWithCount[],
) => {
    try {
        const data = {
            itemsToPurchase,
            totalPrice,
            totalPaid,
            supplierId,
            transactionType
        }
        const res = await axios.post(url, data)
        console.log(res)
        return res.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.name?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}
