import { createContext, useState } from "react";
import { ContextProps } from "../utils/types";
import api from "../services/api";

type OrderContextValues = {
    openOrder: (orderInfo: OpenOrderProps) => Promise<boolean>,
    order: OrderProps | null,
    deleteOrder: () => Promise<boolean>,
    addItem: (order_id: number, product_id: number, amount: number) => Promise<ItemProps | undefined>,
    deleteItem: (item_id: number) => Promise<void>,
    finishOrder: (order_id: number) => Promise<void>
}

type OpenOrderProps = {
    name?: string,
    table: string,
}

type OrderProps = {
    id: string,
    table: string
    name?: string,
    draft: boolean,
    status: boolean,
}

type ItemProps = {
    id: number,
    amount: number,
    order_id: number,
    product_id: number
}

const OrderContext = createContext({} as OrderContextValues)

const OrderProvider = ({ children }: ContextProps) => {
    const [order, setOrder] = useState<OrderProps | null>(null)
    const openOrder = async ({ name, table }: OpenOrderProps) => {
        try {
            const res = await api.post("/new-order", {
                table: Number(table),
                name
            })
            setOrder(res.data as OrderProps);
            return true;
        } catch (error) {
            console.log("Algo deu errado: ", error);
            return false;
        }
    }

    const deleteOrder = async () => {
        try {
            await api.delete(`/order?order_id=${order?.id}`);
            setOrder(null);
            return true
        } catch (error) {
            console.log("Ocorreu algum erro na remoção: ", error);
            return false
        }

    }

    const addItem = async (order_id: number, product_id: number, amount: number) => {
        try {
            const res = await api.post("/order/add", {
                order_id,
                product_id,
                amount

            })
            return res.data as ItemProps
        } catch (error) {
            console.log("Ocorreu algum erro: ", error);
            return;
        }
    }

    const deleteItem = async (item_id: number) => {
        await api.delete('/order/delete', {
            params: {
                order_id: item_id
            }
        })
    }

    const finishOrder = async (order_id: number) => {
        try {
            const res = await api.put("/order", {
                id: order_id
            })
        } catch (error) {
            console.log("Ocorreu algum erro: ", error)
        }

    }

    return (
        <OrderContext.Provider value={{ openOrder, order, deleteOrder, addItem, deleteItem, finishOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }