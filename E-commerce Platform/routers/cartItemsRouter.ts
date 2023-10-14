import express from 'express'
import { validateCartItem } from '../middlewares/validation/cartItem.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { deleteCartItem, getAllCartItems, getCartItemByID, getOneCartItems, insertCartItem, updateCartItem } from '../controllers/cartItemsController.js'
import { ShoppingCart } from '../db/entities/ShoppingCart.js'

const router = express.Router()

router.post('/', validateCartItem, authenticate, authorize('POST_cart-items/'), (req, res) => {
    insertCartItem(req.body).then(data => {
        res.status(201).send('The cart item added successfully')
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/', authenticate, authorize('GET_cart-items/'), (req, res) => {
    getOneCartItems().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/:id', authenticate, authorize('GET_cart-items/:id'), (req, res) => {
    const id = req.params.id
    getCartItemByID(id).then(data => {
        if(data.length === 0 ){
            res.status(404).send(`The cart-items with this Id: ${id} not found`)
        }else{
            res.status(201).send(data)
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})


router.get(
    '/cart/:id',
    authenticate, authorize('GET_cart-items/cart/:id'),
    async (req, res) => {
        const id = req.params.id

        const existingCart = await ShoppingCart.findOne({
            where: { id },
        });

        if (!existingCart) {
            return res.status(404).send("The cart doesn't exist or the cart has no items yet")

        } else {
            getAllCartItems(id).then(data => {
                res.status(201).send(data)
            }).catch(err => {
                res.status(500).send(err)
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