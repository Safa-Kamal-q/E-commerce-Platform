import express from 'express'
import { validateOrderOneProduct } from '../middlewares/validation/orderOneProduct.js'
import { createOrder, getOrderByID, getOrders } from '../controllers/orderOneProductControllers.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'

const router = express.Router()

//Note: we take the paymentInfo id from token for more security
router.post('/', authenticate,
    authorize('POST_order-one-product/'),
    validateOrderOneProduct,
    async (req, res, next) => {
        const user = res.locals.user
        createOrder(req.body, user).then(() => {
            res.status(201).send("Order added successfully")
        }).catch(err => {
            next(new ApiError('', 500))
        })
    })

router.get('/', authenticate, authorize('GET_order-one-product/'), (req, res, next) => {
    getOrders().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:id', authenticate, authorize('GET_order-one-product/:id'), (req, res, next) => {
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
