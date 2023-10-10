// import pb from './pocketbase'
import { baseUrl } from './config'
import { Category } from './types'
import axios, { AxiosError } from 'axios'

// const url = baseUrl + "/api/collections/product_categories/records"
const url = baseUrl + "/api/categories"

export const getCategories = async (): Promise<Category[]> => {
    const res = await axios.get(url + "?sort=name")
    return res.data.items
}

export const getActiveCategories = async (): Promise<Category[]> => {
    const res = await axios.get(url)
    return res.data.items
}

export const toggleActiveCategory = async (cat: Category): Promise<Category> => {
    const updatedCategory = {
        name: cat.name,
        is_active: !cat.is_active
    }
    const id = cat.id
    return await axios.patch(`${url}/${id}`, updatedCategory)
}

export const addCategoryDb = async (category: Category) => {
    try {
        const result = await axios.post(url, category)
        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

export const updateCategoryDb = async (category: Category) => {
    try {
        const result = await axios.patch(`${url}/${category.id}`, category)
        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`💥️ ${error.response?.data?.data?.message} 💥️` || '💥️ Something went wrong 💥️')
        }
        throw new Error(`💥️ Something went wrong 💥️`)
    }
}

