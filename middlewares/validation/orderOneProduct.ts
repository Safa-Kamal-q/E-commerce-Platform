import express, { NextFunction } from "express"
import { Product } from "../../db/entities/Product.js";

const validateOrderOneProduct = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["quantity", "product"];
    const type = res.locals.user?.type

    const order = req.body;

    values.forEach(key => {
        if (!order[key]) {
            errorList.push(`${key} is require`)
        }
    })

    const existProduct = await Product.findOne({ where: { id: order.product } })

    if (!existProduct) {
        errorList.push("The product not found")
    }

    if(type !== 'buyer'){
        errorList.push("You are not buyer so cannot create this order")
    }

    if (existProduct && order.quantity > existProduct.quantity) {
        errorList.push(`Not enough quantity available for product: ${existProduct.title} which has this id: ${existProduct.id}`)
    }

    if (errorList.length > 0) {
        next({
            code: 'validation',
            status: 400,
            message: errorList
        })
    } else {
        res.locals.user = res.locals.user
        console.log(res.locals.user)
        next();
    }
}

export {
    validateOrderOneProduct
}