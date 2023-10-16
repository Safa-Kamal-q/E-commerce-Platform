import { In } from "typeorm";
import { NSOrderCartItem } from "../@types/orderCartItem.js";
import dataSource from "../db/dataSource.js";
import { ShoppingCartItem } from "../db/entities/ShoppingCartItems.js";
import { OrderCartItem } from "../db/entities/OrderCartItem.js";
import express from 'express'

const createOrderFromCart = (payload: NSOrderCartItem.SingleOrder, paymentInfo: string) => {
    return dataSource.manager.transaction(async transaction => {
        try {

            const cartItems = await ShoppingCartItem.findBy({
                id: In(payload.cartItems)
            })

            let totalPrice: number = 0
            cartItems.forEach(item => {
                totalPrice += (item.price) 
            })

            const order = OrderCartItem.create({
                ...payload,
                cartItems,
                totalPrice,
                paymentInfo
            });

            await transaction.save(order);
            return order;

        } catch (error) {
            console.error(error);
            throw ("Something went wrong")
        }
    })
}

const getOrders = async () => {
    return await OrderCartItem.find();
}

const getOrderByID = async (id: string) => {
    return await OrderCartItem.findBy({ id });
}

//if you ask about edit, we cannot edit the order 

//can I deleted the order? 
const deleteOrder = async (id: string, res: express.Response) => {
    try {
        const order = await OrderCartItem.findOneBy({ id });
        if (order) {
            await order.remove();
            res.status(200).send('The order deleted successfully ')
        } else {
            res.status(404).send('The order not found!, so cannot be deleted');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

export{
    createOrderFromCart,
    getOrders,
    getOrderByID,
    deleteOrder
}