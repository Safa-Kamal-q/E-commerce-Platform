import express, { NextFunction } from 'express'
import { ShoppingCartItem } from '../../db/entities/ShoppingCartItems.js';
import { In } from 'typeorm';
import { ShoppingCart } from '../../db/entities/ShoppingCart.js';


const validateOrderCartItem = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["cartItems"];
    const orderCartItem = req.body;
    const cartItems: string[] = orderCartItem.cartItems
    const type = res.locals.user?.type

    values.forEach(key => {
        if (!orderCartItem[key]) {
            errorList.push(`${key} is require`)
        }
    })

    //this is important but first make sure that authorize is correct
    // if(type !== 'buyer'){
    //     errorList.push("You are not buyer so cannot create this order")
    // }

    if (orderCartItem.cartItems) {
        const missingItems: string[] = [];
        await Promise.all(
            cartItems.map(async cartItemId => {
                if (!await ShoppingCartItem.findOne({ where: { id: cartItemId } })) {
                    missingItems.push(cartItemId);
                }
            })
        );

        if (missingItems.length > 0) {
            errorList.push(`The following cart items do not exist: ${missingItems.join(', ')}`);
        } 
            const cartItemIds = orderCartItem.cartItems;

            // Fetch all ShoppingCartItem entities for the given cartItemIds
            const cartItemsFromDB = await ShoppingCartItem.find({
                where: { id: In(cartItemIds) },relations: ['cart'] 
            });

            // Check if all cartItemsIds have the same cartId
            const firstCartId = (cartItemsFromDB[0].cart as ShoppingCart).id;

            for (const cartItemId of cartItemIds) {
                const cartItem = cartItemsFromDB.find(item => item.id === cartItemId);
                if (!cartItem || (cartItem.cart as ShoppingCart).id !== firstCartId) {
                    errorList.push(`The cart item with id ${cartItemId} has a different cartId`);
                }
            
        }
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        res.locals.user = res.locals.user
        next();
    }
}

export {
    validateOrderCartItem
}