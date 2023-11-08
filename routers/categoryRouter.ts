import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import multer from 'multer'
import ApiError from '../middlewares/errorHandlers/apiError.js'
import { createCategory, deleteCategory, getCategories, getCategoryByName, getCategoryProducts, updateCategory } from '../controllers/categoryController.js'
import { validateCategory } from '../middlewares/validation/category.js'

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

router.post('/', authenticate, authorize("POST_categories/"),
    upload.single('image'), validateCategory,
    (req, res, next) => {
        if (!req.file) {
            return next(new ApiError("No file uploaded for category image.", 400))
        }
        if (req.file && req.file.fieldname !== "image") {
            return next(new ApiError("The field name for category's image must be 'image'.", 400))
        }

        createCategory(req.body, req.file).then(data => {
            res.status(201).json('Category created successfully')
        }).catch(err => {
            next(new ApiError('', 500))
        })
    })

router.get('/', authenticate, authorize('GET_categories/'), (req, res, next) => {
    getCategories().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:categorySlug',
    authenticate, authorize('GET_categories/:categorySlug'),
    (req, res, next) => {
        const categorySlug = req.params.categorySlug
        getCategoryByName(categorySlug).then(data => {
            if (data.length === 0) {
                next(new ApiError(`Category with this name: ${categorySlug} not found`, 404))
            } else {
                res.status(200).send(data)
            }
        }).catch(err => {
            next(new ApiError('', 500))
        })
    })

router.delete('/:id', authenticate, authorize('DELETE_categories/:id'), async (req, res) => {
    const categoryName = req.params.id
    deleteCategory(categoryName, res);
});

router.put('/:id', authenticate, authorize('PUT_categories/:id'), async (req, res) => {
    const id = req.params.id
    updateCategory(id, req.body, res)
})

router.get('/products/:categorySlug',
    authenticate, authorize("GET_categories/products/:categorySlug"),
    (req, res, next) => {
        const page = parseInt(req.query.page as string || '1');
        const pageSize = parseInt(req.query.pageSize as string || '10');
        const categorySlug = req.params.categorySlug

        getCategoryProducts(categorySlug, page, pageSize).then(data => {
            if (data.modifiedProducts.length === 0) {
                next(new ApiError(`Category with this slug: ${categorySlug} has no products`, 404))
            } else {
                res.status(200).json({
                    page,
                    pageSize: data.modifiedProducts.length,
                    total: data.totalCount,
                    items: data.modifiedProducts
                })
            }
        }).catch(err => {
            next(new ApiError('', 500))
        })
    })


export default router 