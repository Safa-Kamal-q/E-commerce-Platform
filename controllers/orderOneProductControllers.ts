import { NSOrderOneProduct } from "../@types/orderType.js";
import dataSource from "../db/dataSource.js";
import { OrderOneProduct } from "../db/entities/OrderOneProduct.js";
import { Product } from "../db/entities/Product.js";
import express from 'express'


const createOrder = async (payload: NSOrderOneProduct.SingleOrder, paymentInfo: string) => {
    return dataSource.manager.transaction(async transaction => {
        try {

            const product = await Product.findOne({ where: { id: payload.product } })

            const totalPrice = (product?.price || 0) * payload.quantity

            const order = OrderOneProduct.create({
                ...payload,
                totalPrice,
                paymentInfo
            });

            //this to decrease the product quantity 
            if(product && payload.quantity){
                product.quantity -= payload.quantity ;
                await transaction.save(product);
            }
            
            await transaction.save(order);
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

//can I deleted the order? 
const deleteOrder = async (id: string, res: express.Response) => {
    try {
        const order = await OrderOneProduct.findOneBy({ id });
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

export {
    createOrder,
    getOrders,
    getOrderByID,
    deleteOrder
}