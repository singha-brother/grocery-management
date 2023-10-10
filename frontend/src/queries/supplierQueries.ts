import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Supplier } from "../database/types"
import { createSupplier, getAllSuppliers, updateSupplier } from "../database/suppliersAPI"
import { toast } from "react-toastify"

export const useCreateSupplier = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (supplier: Supplier) => createSupplier(supplier),
        onError: (err: Error) => toast.error(err.message),
        // @ts-ignore
        onSuccess: (returnData) => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
            toast.success('Successfully Added!')
        }
    })
}

export const useUpdateSupplier = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (supplier: Supplier) => updateSupplier(supplier),
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
            toast.success('Successfully Updated!')
        }
    })
}


export const useGetSuppliers = () => {
    const result = useQuery<Supplier[], Error>(['suppliers', 'to show'], getAllSuppliers, {
        refetchOnWindowFocus: false,
    })
    // const products = result.data.
    return result;
};