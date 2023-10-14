import express, { NextFunction } from "express"
import { Product } from "../../db/entities/Product.js";
import { PaymentInfo } from "../../db/entities/PaymentInfo.js";

const validateOrder = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["paymentInfo", "productQuantities"];
    const validProducts: Product[] = [];

    const order = req.body;

    values.forEach(key => {
        if (!order[key]) {
            errorList.push(`${key} is require`)
        }
    })


    const existingPaymentInfo = await PaymentInfo.findOne({
        where: { id: order.paymentInfo },
    });

    if (order.paymentInfo && !existingPaymentInfo) {
        errorList.push(`The entered payment info id doesn't exist`)
    }

    if (order.productQuantities && !Array.isArray(order.productQuantities)) {
        errorList.push('productQuantities must be an array')
    }

    if (order.productQuantities) {
        for (const pq of order.productQuantities) {
            const productId = pq.productId;
            const quantity = pq.quantity;

            if (!productId || !quantity || quantity <= 0) {
                errorList.push('Invalid product quantity')
            }

            const product = await Product.findOne({
                where: { id: productId },
            });

            if (!product) {
                errorList.push(`Product with ID ${productId} not found`)
            }else{
                validProducts.push(product);
            }

            if (product && quantity > product.quantity) {
                errorList.push(`Not enough quantity available for product: ${product.title} which has this id: ${product.id}`)
            }

        }
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        res.locals.validProducts = validProducts
        next();
    }
}

export {
    validateOrder
}