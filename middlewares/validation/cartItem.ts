import express, { NextFunction } from 'express'
import { ShoppingCart } from '../../db/entities/ShoppingCart.js';
import { Product } from '../../db/entities/Product.js';
import { ShoppingCartItem } from '../../db/entities/ShoppingCartItems.js';
import ApiError from '../errorHandlers/apiError.js';

const validateCartItem = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["cart", "product", "quantity"];
    const cartItem = req.body;

    values.forEach(key => {
        if (!cartItem[key]) {
            errorList.push(`${key} is require`)
        }
    })

    const existingCart = await ShoppingCart.findOne({
        where: { id: cartItem.cart },
    });

    if (cartItem.cart && !existingCart) {
        errorList.push(`The entered cart id doesn't exist`)
    }

    const existingProduct = await Product.findOne({
        where: { id: cartItem.product },
    });

    if (cartItem.product && !existingProduct) {
        errorList.push(`The entered product id doesn't exist`)
    }

    if (existingProduct && cartItem.quantity && cartItem.quantity > existingProduct.quantity) {
        errorList.push("The quantity of this cart item exceed the quantity of the product, so you can't buy all of this quantity")
    }

    const existingCartItem = await ShoppingCartItem.findOne({
        where: {
            cart: { id: cartItem.cart },
            product: { id: cartItem.product },
        },
    });

    if (existingCartItem) {
        errorList.push(
            "The entered combination of cartId and productId already exists. You can update the quantity for this product only."
        );
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        res.locals.existingCart = existingCart
        res.locals.existingProduct = existingProduct
        next();
    }
}

export {
    validateCartItem
}