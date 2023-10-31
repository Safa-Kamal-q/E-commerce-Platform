import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { createOrderFromCart, getOrderByID, getOrders } from '../controllers/orderCartItems.js'
import { validateOrderCartItem } from '../middlewares/validation/orderCartItem.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'

const router = express.Router()

router.post('/', authenticate, authorize('POST_order-cart-items/'), validateOrderCartItem, async (req, res, next) => {
    const user = res.locals.user

    createOrderFromCart(req.body, user).then(() => {
        res.status(201).send("Order created successfully")
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/', authenticate, authorize('GET_order-cart-items/'), (req, res, next) => {
    getOrders().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:id', authenticate, authorize('GET_order-cart-items/:id'), (req, res, next) => {
    const id = req.params.id
    getOrderByID(id).then(data => {
        if (data.length === 0) {
            next(new ApiError(`The order with this Id: ${id} not found`, 404))
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

export default router 