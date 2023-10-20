import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { createOrderFromCart, deleteOrder, getOrderByID, getOrders } from '../controllers/orderCartItems.js'
import { validateOrderCartItem } from '../middlewares/validation/orderCartItem.js'

const router = express.Router()

router.post('/', authenticate, authorize('POST_order-cart-items/'), validateOrderCartItem, async (req, res) => {
    const paymentInfo = res.locals.user?.paymentInfo

    createOrderFromCart(req.body, paymentInfo).then(() => {
        res.status(201).send("Order created successfully")
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/', authenticate, authorize('GET_order-cart-items/'), (req, res) => {
    getOrders().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/:id', authenticate, authorize('GET_order-cart-items/:id'), (req, res) => {
    const id = req.params.id
    getOrderByID(id).then(data => {
        if (data.length === 0) {
            res.status(404).send(`The order with this Id: ${id} not found`)
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.delete('/:id', authenticate, authorize('DELETE_order-cart-items/:id'), async (req, res) => {
    deleteOrder(req.params.id, res);
});

export default router 