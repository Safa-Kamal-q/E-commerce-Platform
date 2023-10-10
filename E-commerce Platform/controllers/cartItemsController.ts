import { NSCart } from "../@types/cartType.js";
import { ShoppingCartItem } from "../db/entities/ShoppingCartItems.js";
import express from 'express'

const insertCartItem = async (payload: NSCart.cartItem) => {
    try {
        const newCartItem = ShoppingCartItem.create({
            ...payload
        });

        await newCartItem.save()
        return newCartItem;

    }
    catch (error) {
        console.log(error)
        throw ('Something went wrong')
    }
}

const getOneCartItems = async () => {
    return await ShoppingCartItem.find();
}

const getCartItemByID = async (id: string) => {
    return await ShoppingCartItem.findBy({ id });
}

//This to get all the cart items that belong to specific cart
const getAllCartItems = async (cartId: string) => {
    try {
        const cartItem = await ShoppingCartItem
            .createQueryBuilder('cartItem')
            .where('cartItem.cartId = :cartId', { cartId: cartId })
            .getMany();

        return cartItem
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const deleteCartItem = async (id: string, res: express.Response) => {
    try {
        const cartItem = await ShoppingCartItem.findOneBy({ id });
        if (cartItem) {
            await cartItem.remove();
            res.status(200).send('The cart item deleted successfully ')
        } else {
            res.status(404).send('The cart item not found!');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

const updateCartItem = async (id: string, payload: NSCart.cartItem, res: express.Response) => {
    try {
        const existingCartItem = await ShoppingCartItem.findOneBy({ id })

        if (existingCartItem) {
            ShoppingCartItem.merge(existingCartItem, payload);
            await ShoppingCartItem.save(existingCartItem);
            res.status(200).send("The cart item updated successfully")

        } else {
            res.status(404).send("The cart item not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }

}

export {
    insertCartItem,
    updateCartItem,
    deleteCartItem,
    getAllCartItems,
    getCartItemByID,
    getOneCartItems
}