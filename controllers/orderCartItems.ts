import { In } from "typeorm";
import { NSOrderCartItem } from "../@types/orderCartItem.js";
import dataSource from "../db/dataSource.js";
import { ShoppingCartItem } from "../db/entities/ShoppingCartItems.js";
import { OrderCartItem } from "../db/entities/OrderCartItem.js";
import express from 'express'
import { NSUser } from "../@types/userType.js";

const createOrderFromCart = (payload: NSOrderCartItem.SingleOrder, user: NSUser.SingleUser) => {
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
                paymentInfo: user.paymentInfo
            });

            await transaction.save(order);

            user.orders.push(order.id)
            await transaction.save(user);

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

export{
    createOrderFromCart,
    getOrders,
    getOrderByID
}