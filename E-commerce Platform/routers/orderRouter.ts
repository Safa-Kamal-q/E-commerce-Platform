import express from 'express'
import { validateOrder } from '../middlewares/validation/orders.js'
import { createOrder, deleteOrder, getOrderByID, getOrders } from '../controllers/orderControllers.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'

const router = express.Router()

router.post('/', validateOrder, async (req, res) => {
    createOrder(req.body).then(() => {
        res.status(201).send("Order added successfully")
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/', authenticate, authorize('GET_orders/'), (req, res) => {
    getOrders().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/:id', authenticate, authorize('GET_orders/:id'), (req, res) => {
    const id = req.params.id
    getOrderByID(id).then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.delete('/:id', authenticate, authorize('DELETE_orders/:id'), async (req, res) => {
    const id = req.params.id

    deleteOrder(id).then(data => {
        res.status(201).send(data)
    }).catch(err => {
        if (err.includes("The order not found")) {
            res.status(400).send(err)
        } else {
            res.status(500).send("Something went wrong")
        }
    })
});

export default router 
