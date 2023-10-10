import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Customer } from "../database/types"
import { createCustomer, getAllCustomers, updateCustomer } from "../database/customersAPI"
import { toast } from "react-toastify"
export const useCreateCustomer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (customer: Customer) => createCustomer(customer),
        onError: (err: Error) => toast.error(err.message),
        // @ts-ignore
        onSuccess: (returnData) => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            toast.success('Successfully Added!')
        }
    })
}

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (customer: Customer) => updateCustomer(customer),
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            toast.success('Successfully Updated!')
        }
    })
}


export const useGetCustomers = () => {
    const result = useQuery<Customer[], Error>(['customers'], getAllCustomers, {
        refetchOnWindowFocus: false,
    })
    // const products = result.data.
    return result;
};