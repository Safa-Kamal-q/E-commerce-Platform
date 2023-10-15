import { Product } from "../db/entities/Product.js";
import { NSCart } from "../@types/cartType.js";
import { ShoppingCart } from "../db/entities/ShoppingCart.js";
import { ShoppingCartItem } from "../db/entities/ShoppingCartItems.js";
import express from 'express'
import dataSource from "../db/dataSource.js";

const insertCartItem = async (payload: NSCart.cartItem, cart: ShoppingCart, existProduct: Product) => {
    return dataSource.manager.transaction(async transaction => {
        try {
            const newCartItem = ShoppingCartItem.create({
                ...payload
            });

            if(existProduct && cart){
                cart.totalPrice+=payload.quantity*existProduct.price;
                await transaction.save(cart);
            }

            await transaction.save(newCartItem);
            return newCartItem;

        }
        catch (error) {
            console.log(error)
            throw ('Something went wrong')
        }
    });
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