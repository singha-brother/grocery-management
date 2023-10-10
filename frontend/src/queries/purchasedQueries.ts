import { useQuery } from "@tanstack/react-query";
import { ProductsPurchases } from "../database/types";
import { getPurchaseHistory } from "../database/purchaseHistoryAPI";

export const useGetProductsPurchases = () => {
    const result = useQuery<ProductsPurchases[], Error>(['purchases'], getPurchaseHistory, {
        refetchOnWindowFocus: false,
    })
    // const products = result.data.
    return result;
};

