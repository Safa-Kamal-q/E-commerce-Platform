import express from 'express'
import { validateCartItem } from '../middlewares/validation/cartItem.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { deleteCartItem, getAllCartItems, getCartItemByID, getOneCartItems, insertCartItem, updateCartItem } from '../controllers/cartItemsController.js'
import { ShoppingCart } from '../db/entities/ShoppingCart.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'

const router = express.Router()

router.post('/', authenticate, authorize('POST_cart-items/'), validateCartItem, (req, res, next) => {
    const cart = res.locals.existingCart;
    const product = res.locals.existingProduct

    insertCartItem(req.body, cart, product).then(data => {
        res.status(201).send('The cart item added successfully')
    }).catch(err => {
        next(next(new ApiError('', 500)))
    })
})

router.get('/', authenticate, authorize('GET_cart-items/'), (req, res, next) => {
    getOneCartItems().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next(next(new ApiError('', 500)))
    })
})

router.get('/:id', authenticate, authorize('GET_cart-items/:id'), (req, res, next) => {
    const id = req.params.id
    getCartItemByID(id).then(data => {
        if (data.length === 0) {
            next(new ApiError(`The cart-items with this Id: ${id} not found`, 404))

        } else {
            res.status(200).send(data)
        }
    }).catch(err => {
        next(next(new ApiError('', 500)))
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
            next(new ApiError(`The cart doesn't exist`, 404))

        } else {
            getAllCartItems(id).then(data => {
                if (data.length === 0) {
                    res.status(200).json("This cart hasn't have items yet")
                }
                res.status(200).send(data)
            }).catch(err => {
                next(next(new ApiError('', 500)))
            })
        }
    })

router.delete('/:id', authenticate, authorize('DELETE_cart-items/:id'), async (req, res, next) => {
    const id = req.params.id
    deleteCartItem(id, res, next);
});

router.put('/:id', authenticate, authorize('PUT_cart-items/:id'), async (req, res, next) => {
    const id = req.params.id
    updateCartItem(id, req.body, res, next)
})

export default router