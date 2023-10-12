import { In } from "typeorm";
import { NSOrder } from "../@types/orderType.js";
import { Order } from "../db/entities/Order.js";
import { Product } from "../db/entities/Product.js";


const createOrder = async (payload: NSOrder.SingleOrder) => {
    try {

        const totalPrice = await payload.productQuantities.reduce(async (totalPromise, pq) => {

            const product = await Product.findOne({ where: { id: pq.productId } })

            const total = await totalPromise;
            return total + (product?.price || 0) * pq.quantity;

        }, Promise.resolve(0));

        const products = await Product.findBy({
            id: In(payload.products)
        });


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

const deleteOrder = async (id: string) => {
    try {
        const product = await Product.findOneBy({ id });
        if (product) {
            await product.remove();
            return ("The order deleted successfully")
        } else {
            throw new Error("The order not found")
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something not found")
    }
}

export {
    createOrder,
    getOrders,
    getOrderByID,
    deleteOrder
}