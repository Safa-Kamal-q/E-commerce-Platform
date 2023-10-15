import express from 'express'
import { validateOrderOneProduct } from '../middlewares/validation/orderOneProduct.js'
import { createOrder, deleteOrder, getOrderByID, getOrders } from '../controllers/orderOneProductControllers.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'

const router = express.Router()

//Note: we take the paymentInfo id from token for more security
//make sure that authorize work correctly 
router.post('/', authenticate, authorize('POST_order-one-product/'), validateOrderOneProduct, async (req, res) => {
    const paymentInfo = res.locals.user?.paymentInfo
    console.log(paymentInfo)
    createOrder(req.body, paymentInfo).then(() => {
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
        if (data.length === 0) {
            res.status(404).send(`The order with this Id: ${id} not found`)
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.delete('/:id', authenticate, authorize('DELETE_orders/:id'), async (req, res) => {
    deleteOrder(req.params.id, res);
});

export default router 
