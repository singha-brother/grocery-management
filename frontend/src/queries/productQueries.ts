import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, ProductToShow } from "../database/types";

import { createProduct, getAllProducts, getInStockProducts, updateProduct } from "../database/productsAPI";
import { toast } from "react-toastify";

export const useGetProducts = () => {
    const result = useQuery<ProductToShow[], Error>(['products', 'to show'], getAllProducts, {
        refetchOnWindowFocus: false,
    })
    // const products = result.data.
    const refetchProducts = () => {
        result.refetch()
    }
    return { ...result, refetchProducts };
};

export const useGetInStockProducts = () => {
    const result = useQuery<ProductToShow[], Error>(['products', 'in stock'], getInStockProducts, {
        refetchOnWindowFocus: false,
    })
    return result
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (product: Product) => createProduct(product),
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', 'to show'] })
            toast.success('Successfully Added!')
        }
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (product: Product) => updateProduct(product),
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', 'to show'] })
            toast.success('Successfully updated!')
        }
    })
}
