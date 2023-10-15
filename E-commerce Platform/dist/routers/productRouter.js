import express from 'express';
import { deleteProduct, getProductByID, getProducts, getSellerProducts, insertProduct, updateProduct } from '../controllers/productController.js';
import { validateProduct } from '../middlewares/validation/product.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { SellerProfile } from '../db/entities/SellerProfile.js';
const router = express.Router();
router.post('/', authenticate, authorize("POST_products/"), validateProduct, (req, res) => {
    insertProduct(req.body).then(data => {
        res.status(201).send('The product added successfully');
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.get('/', authenticate, authorize('GET_products/'), (req, res) => {
    getProducts().then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.get('/:id', authenticate, authorize('GET_products/:id'), (req, res) => {
    const id = req.params.id;
    getProductByID(id).then(data => {
        if (data.length === 0) {
            res.status(404).send(`The product with this Id: ${id} not found`);
        }
        else {
            res.status(201).send(data);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.get('/seller-products/:id', authenticate, authorize('GET_products/seller-products/:id'), async (req, res) => {
    const id = req.params.id;
    const existingSellerProfile = await SellerProfile.findOne({
        where: { id },
    });
    if (!existingSellerProfile) {
        return res.status(404).send("The seller doesn't exist or the seller has no products yet");
    }
    else {
        getSellerProducts(id).then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
});
router.delete('/:id', authenticate, authorize('DELETE_products/:id'), async (req, res) => {
    const id = req.params.id;
    deleteProduct(id, res);
});
router.put('/:id', authenticate, authorize('PUT_products/:id'), async (req, res) => {
    const id = req.params.id;
    updateProduct(id, req.body, res);
});
export default router;
//# sourceMappingURL=productRouter.js.map