import express, { NextFunction } from 'express'
import { ShoppingCart } from '../../db/entities/ShoppingCart.js';
import { Product } from '../../db/entities/Product.js';

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

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        next();
    }
}

export {
    validateCartItem
}