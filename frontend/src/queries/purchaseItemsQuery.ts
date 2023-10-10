import { useMutation, useQueryClient } from "@tanstack/react-query"
import { purchaseItemsAPI } from "../database/purchaseItemsAPI"
import { toast } from "react-toastify"

export const usePurchaseItems = () => {
    const queryClient = useQueryClient()
    // @ts-ignore
    return useMutation(purchaseItemsAPI, {
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', 'to show'] })
            toast.success('Operation Success!')
        }
    })
}
