import express from 'express'
import { validateCartItem } from '../middlewares/validation/cartItem.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { deleteCartItem, getAllCartItems, getCartItemByID, getOneCartItems, insertCartItem, updateCartItem } from '../controllers/cartItemsController.js'
import { ShoppingCart } from '../db/entities/ShoppingCart.js'

const router = express.Router()

router.post('/', authenticate, authorize('POST_cart-items/'), validateCartItem, (req, res, next) => {
    const cart = res.locals.existingCart;
    const product = res.locals.existingProduct

    insertCartItem(req.body, cart, product).then(data => {
        res.status(201).send('The cart item added successfully')
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/', authenticate, authorize('GET_cart-items/'), (req, res, next) => {
    getOneCartItems().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/:id', authenticate, authorize('GET_cart-items/:id'), (req, res, next) => {
    const id = req.params.id
    getCartItemByID(id).then(data => {
        if (data.length === 0) {
            next({
                code: 'not found',
                status: 404,
                message: `The cart-items with this Id: ${id} not found`
            })
        } else {
            res.status(200).send(data)
        }
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})


router.get(
    '/cart/:id',
    authenticate, authorize('GET_cart-items/cart/:id'),
    async (req, res, next) => {
        const id = req.params.id

        const existingCart = await ShoppingCart.findOne({
            where: { id },
        });

        if (!existingCart) {
            next({
                code: 'not found',
                status: 404,
                message: `The cart doesn't exist or the cart has no items yet`
            })

        } else {
            getAllCartItems(id).then(data => {
                res.status(200).send(data)
            }).catch(err => {
                next({
                    status: 500,
                    message: "Something went wrong"
                })
            })
        }
    })

router.delete('/:id', authenticate, authorize('DELETE_cart-items/:id'), async (req, res) => {
    const id = req.params.id
    deleteCartItem(id, res);
});

router.put('/:id', authenticate, authorize('PUT_cart-items/:id'), async (req, res) => {
    const id = req.params.id
    updateCartItem(id, req.body, res)
})

export default router