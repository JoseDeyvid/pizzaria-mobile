import { createContext } from "react";
import { ContextProps } from "../utils/types";
import api from "../services/api";

type CategoryContextValues = {
    getCategories: () => Promise<CategoryProps[]>,
}

type CategoryProps = {
    id: number,
    name: string
}

const CategoryContext = createContext({} as CategoryContextValues)

const CategoryProvider = ({ children }: ContextProps) => {
    const getCategories = async() => {
        try {
            const res = await api.get("/categories")
            return res.data as CategoryProps[]
        } catch (error) {
            console.log("Não foram encontrados dados!", error)
            return []
        }
    }
    return (
        <CategoryContext.Provider value={{getCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}

export {CategoryContext, CategoryProvider, CategoryProps}