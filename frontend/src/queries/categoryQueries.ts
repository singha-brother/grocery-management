import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../database/types";
import { addCategoryDb, getActiveCategories, getCategories, toggleActiveCategory, updateCategoryDb } from "../database/categoriesAPI";
import { toast } from "react-toastify";


export const useGetCategories = () => {
    const result = useQuery<Category[], Error>(["categories"], getCategories, {
        refetchOnWindowFocus: false,
    });

    return result;
};

export const useGetActiveCategories = () => {
    const result = useQuery<Category[], Error>(["categories"], getActiveCategories, {
        refetchOnWindowFocus: false,
    });
    return result;
};

export const useUpdateActiveCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(
        toggleActiveCategory,
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                toast.success("Updated!");
                // setFormUpdate(false)
            },
        }
    );
}

export const useAddCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: Category) => addCategoryDb(category),
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Successfully Added!')
        }
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: Category) => updateCategoryDb(category),
        onError: (err: Error) => toast.error(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Successfully Updated!')
        }
    })
}