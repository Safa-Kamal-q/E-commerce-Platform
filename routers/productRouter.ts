import express from 'express'
import { addImageGallery, deleteProduct, getProductByID, getProducts, getSellerProducts, insertProduct, updateProduct } from '../controllers/productController.js'
import { validateProduct } from '../middlewares/validation/product.js'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { SellerProfile } from '../db/entities/SellerProfile.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

router.post(
    '/',
    authenticate, authorize("POST_products/"),
    upload.single('image'), validateProduct,
    (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file uploaded for product image.");
        }
        if (req.file && req.file.fieldname !== "image") {
            return res.status(400).send("the field name for product's image must be 'image'.")
        }

        insertProduct(req.body, req.file).then(data => {
            res.status(201).send('The product added successfully')
        }).catch(err => {
            res.status(500).send(err)
        })
    })

router.get('/', authenticate, authorize('GET_products/'), (req, res) => {
    getProducts().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/:id', authenticate, authorize('GET_products/:id'), (req, res) => {
    const id = req.params.id
    getProductByID(id).then(data => {
        if (data.length === 0) {
            res.status(404).send(`The product with this Id: ${id} not found`)
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})


router.get(
    '/seller-products/:id',
    authenticate, authorize('GET_products/seller-products/:id'),
    async (req, res) => {
        const id = req.params.id

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

router.delete('/:id', authenticate, authorize('DELETE_products/:id'), async (req, res) => {
    const id = req.params.id
    deleteProduct(id, res);
});

router.put('/:id', authenticate, authorize('PUT_products/:id'), async (req, res) => {
    const id = req.params.id
    updateProduct(id, req.body, res)
})

router.put("/gallery-images/:id",
    authenticate, authorize('PUT_products/gallery-images/:id'),
    upload.array('images', 5),
    async (req, res) => {

        const values = ["title", "description", "price", "quantity", "sellerProfile"];
        const errorList: String[] = [];

        values.forEach(key => {
            if (req.body[key]) {
                errorList.push(`You cannot update ${key} from this api`)
            }
        })

        if (errorList.length !== 0) {
            return res.status(400).send(errorList)
        }

        if (!req.files) {
            return res.status(400).send("No file uploaded for product image.");
        }

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];

        const id = req.params.id
        addImageGallery(id, files, res)
    })

export default router 