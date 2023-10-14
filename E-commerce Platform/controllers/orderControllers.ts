import { NSOrder } from "../@types/orderType.js";
import { Order } from "../db/entities/Order.js";
import { Product  } from "../db/entities/Product.js";
import express from 'express'

const createOrder = async (payload: NSOrder.SingleOrder, products: Order[]) => {
    try {

        const totalPrice = await payload.productQuantities.reduce(async (totalPromise, pq) => {

            const product = await Product.findOne({ where: { id: pq.productId } })

            const total = await totalPromise;
            return total + (product?.price || 0) * pq.quantity;

        }, Promise.resolve(0));

        const order = Order.create({
            totalPrice,
            products,
            status: payload.status,
            productQuantities: payload.productQuantities,
            paymentInfo: payload.paymentInfo,
        });

        await Order.save(order);

        return order;
    } catch (error) {
        console.error(error);
        throw ("Something went wrong")
    }
}

const getOrders = async () => {
    return await Order.find();
}

const getOrderByID = async (id: string) => {
    return await Order.findBy({ id });
}

const deleteOrder = async (id: string, res: express.Response) => {
    try {
        const order = await Order.findOneBy({ id });
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