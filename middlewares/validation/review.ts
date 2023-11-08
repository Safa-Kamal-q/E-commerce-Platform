import express, { NextFunction } from 'express'
import { OrderOneProduct } from '../../db/entities/OrderOneProduct.js';
import { OrderCartItem } from '../../db/entities/OrderCartItem.js';
import { Review } from '../../db/entities/Review.js';
import { Product } from '../../db/entities/Product.js';
import ApiError from '../errorHandlers/apiError.js';

//I will take the user from token
const validateReview = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["comment", "rating", "product"];
    const review = req.body;
    const user = res.locals.user

    values.forEach(key => {
        if (!review[key]) {
            errorList.push(`${key} is require`)
        }
    })

    if (user.type !== 'buyer') {
        next(new ApiError("You are not buyer so cannot add comment", 403))
    }

    const orderOneProduct = await OrderOneProduct.findOne({
        where: {
            product: { id: review.product },
            paymentInfo: { id: user.paymentInfo.id }
        },
        relations: ['product', 'paymentInfo']
    });
    const orderCartItem = await OrderCartItem.createQueryBuilder('orderCartItem')
        .leftJoin('orderCartItem.cartItems', 'cartItem')
        .leftJoin('cartItem.product', 'product')
        .where('product.id = :productId', { productId: review.product })
        .andWhere('orderCartItem.paymentInfo = :paymentInfoId', { paymentInfoId: user.paymentInfo.id })
        .getOne();

    if (!orderCartItem || !orderOneProduct) {
        errorList.push("You didn't order this product, so you cannot review it")
    }

    if (review.product) {
        const existReview = await Review.findOne({
            where: {
                product: { id: review.product },
                user: { id: user.id }
            },
            relations: ['product', 'user']
        })

        if (existReview) {
            errorList.push("You can add one review only for specific product")
        }
    }


    const existProduct = await Product.findOne({ where: { id: review.product } })

    if (!existProduct) {
        errorList.push(`The Product with this id: (${review.product}) doesn't exit`)
    }

    if (review.rating && (review.rating < 0.0 || review.rating > 5.0)) {
        errorList.push("The rating must be in the range (0.0, 5.0)");
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        res.locals.existProduct = existProduct
        res.locals.use = user
        next();
    }
}

export {
    validateReview
}