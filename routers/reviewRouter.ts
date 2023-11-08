import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js'
import { authorize } from '../middlewares/auth/authorize.js'
import { validateReview } from '../middlewares/validation/review.js'
import { addReview, deleteReview, getProductReview } from '../controllers/reviewController.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'

const router = express.Router()

router.post('/', authenticate, authorize("POST_reviews/"), validateReview, (req, res, next) => {
    const user = res.locals.user
    const product = res.locals.existProduct
    console.log(product)
    addReview(req.body, user, product).then(data => {
        res.status(201).json("Review added successfully")
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:productId', authenticate, authorize("GET_reviews/:productId"), (req, res, next)=>{
    const productId= req.params.productId

    getProductReview(productId).then(data=>{
        if(data.length === 0){
            return next(new ApiError("The product not found or has no reviews", 404))
        }
        res.status(200).send(data)
    }).catch(err=>{
        next(new ApiError("", 500))
    })
})


router.delete('/:id', authenticate, authorize('DELETE_reviews/:id'),  (req, res) => {
    const id = req.params.id
    const user = res.locals.user
    deleteReview(id, res, user);
});

export default router 