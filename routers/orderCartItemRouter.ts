import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { createOrderFromCart, getOrderByID, getOrders } from '../controllers/orderCartItems.js'
import { validateOrderCartItem } from '../middlewares/validation/orderCartItem.js'

const router = express.Router()

router.post('/', authenticate, authorize('POST_order-cart-items/'), validateOrderCartItem, async (req, res, next) => {
    const paymentInfo = res.locals.user?.paymentInfo

    createOrderFromCart(req.body, paymentInfo).then(() => {
        res.status(201).send("Order created successfully")
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/', authenticate, authorize('GET_order-cart-items/'), (req, res, next) => {
    getOrders().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/:id', authenticate, authorize('GET_order-cart-items/:id'), (req, res, next) => {
    const id = req.params.id
    getOrderByID(id).then(data => {
        if (data.length === 0) {
            next({
                code: 'not found',
                status: 404,
                message: `The order with this Id: ${id} not found`
            })
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

export default router 