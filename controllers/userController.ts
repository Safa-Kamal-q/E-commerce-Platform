import bcrypt from 'bcrypt'
import { OrderOneProduct } from "../db/entities/OrderOneProduct.js";
import { User } from "../db/entities/User.js";
import express from 'express'
import { OrderCartItem } from '../db/entities/OrderCartItem.js';


const getUsers = async () => {
    try {
        return await User.find({ relations: ['paymentInfo', "roles", "sellerProfile", "cart"] });
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const getOneUser = async (email: string) => {
    return await User.findOne({ where: { email }, relations: ['paymentInfo', "roles", "sellerProfile", "cart"] });
}

const updateUserInfo = async (id: string, payload: User) => {
    try {
        const existUser = await User.findOneBy({ id })

        if (existUser) {

            User.merge(existUser, payload);
            await User.save(existUser);

            return existUser
        }
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const updatePassword = async (existUser: User, newPassword: string) => {
    try {
        
        existUser.password = await bcrypt.hash(newPassword, 10)
        await User.save(existUser);
        return existUser

    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const deleteUser = async (email: string, res: express.Response) => {
    try {
        const user = await User.findOne({where: { email }});

        if (user) {
            await user.remove();
            res.status(200).send('The user deleted successfully')
        } else {
            res.status(404).send('The user not found');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

const ordersForUser = async (existUser: User) => {
    try {
        const orders: any[] = []
        if (existUser) {
            for (const orderId of existUser.orders) {
                const order = await OrderOneProduct.findOne({ where: { id: orderId }, relations: ['paymentInfo', 'product'] });
                const orderCartItem = await OrderCartItem.findOne({ where: { id: orderId }, relations: ['paymentInfo', 'cartItems'] });
                if (order) orders.push(order)
                if (orderCartItem) orders.push(orderCartItem)
            }
            return orders
        }
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

export {
    ordersForUser,
    updateUserInfo,
    deleteUser,
    getOneUser,
    getUsers,
    updatePassword
}