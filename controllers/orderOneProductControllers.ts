import { NSOrderOneProduct } from "../@types/orderType.js";
import { NSUser } from "../@types/userType.js";
import dataSource from "../db/dataSource.js";
import { OrderOneProduct } from "../db/entities/OrderOneProduct.js";
import { Product } from "../db/entities/Product.js";
import express from 'express'
import { User } from "../db/entities/User.js";

const createOrder = async (payload: NSOrderOneProduct.SingleOrder, user: NSUser.SingleUser) => {
    return dataSource.manager.transaction(async transaction => {
        try {

            const product = await Product.findOne({ where: { id: payload.product } })

            const totalPrice = (product?.price || 0) * payload.quantity

            const order = OrderOneProduct.create({
                ...payload,
                totalPrice,
                paymentInfo: user.paymentInfo
            });

            //this to decrease the product quantity 
            if (product && payload.quantity) {
                product.quantity -= payload.quantity;
                await transaction.save(product);
            }


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
    return await OrderOneProduct.find();
}

const getOrderByID = async (id: string) => {
    return await OrderOneProduct.findBy({ id });
}

//if you ask about edit, we cannot edit the order 

export {
    createOrder,
    getOrders,
    getOrderByID
}