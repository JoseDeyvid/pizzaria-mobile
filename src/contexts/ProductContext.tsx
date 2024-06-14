import { createContext } from "react";
import { ContextProps } from "../utils/types";
import api from "../services/api";

type ProductContextValues = {
    getProductsByCategoryId: (category_id: number) => Promise<ProductProps[]>
}

type ProductProps = {
    name: string,
    id: number
}

const ProductContext = createContext({} as ProductContextValues)

const ProductProvider = ({ children }: ContextProps) => {

    const getProductsByCategoryId = async (category_id: number) => {
        try {
            const res = await api.get(`/category/products?category_id=${category_id}`)
            return res.data as ProductProps[]
        } catch (error) {
            return []
        }
    }

    return (
        <ProductContext.Provider value={{ getProductsByCategoryId }}>
            {children}
        </ProductContext.Provider>
    )


}

export { ProductContext, ProductProvider }