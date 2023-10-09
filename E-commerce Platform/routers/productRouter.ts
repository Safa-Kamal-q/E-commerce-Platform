import express from 'express'
import { deleteProduct, getProductByID, getProducts, getSellerProducts, insertProduct, updateProduct } from '../controllers/productController.js'
import { validateProduct } from '../middlewares/validation/product.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { SellerProfile } from '../db/entities/SellerProfile.js'
import { Product } from '../db/entities/Product.js'

const router = express.Router()

router.post(
    '/insertProduct',
    authenticate, authorize("POST_products/insertProduct"), validateProduct,
    (req, res) => {
        insertProduct(req.body).then(data => {
            res.status(201).send('The product added successfully')
        }).catch(err => {
            res.status(500).send(err)
        })
    })

router.get('/allProduct', authenticate, authorize('GET_products/allProduct'), (req, res) => {
    getProducts().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/:id', authenticate, authorize('GET_products/:id'), (req, res) => {
    const id = req.params.id
    getProductByID(id).then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})


router.get(
    '/sellerProduct/:sellerId',
    authenticate, authorize('GET_products/sellerProduct/:sellerId'),
    async (req, res) => {
        const id = req.params.sellerId

        const existingSellerProfile = await SellerProfile.findOne({
            where: { id },
        });

        if (!existingSellerProfile) {
            return res.status(404).send("The seller doesn't exist or the seller has no products yet")

        } else {
            getSellerProducts(id).then(data => {
                res.status(201).send(data)
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    })

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    deleteProduct(id, res);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id
    updateProduct(id, req.body, res)
})

export default router 