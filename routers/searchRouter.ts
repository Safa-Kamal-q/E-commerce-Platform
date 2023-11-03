import express from 'express'
import { search } from '../controllers/searchController.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'

const router = express.Router()

//we don't use auth since anyone can see the products
router.get('/:keyword', (req, res, next) => {
    const page = parseInt(req.query.page as string || '1');
    const pageSize = parseInt(req.query.pageSize as string || '10');
    const keyword = req.params.keyword.toLowerCase()

    search(keyword, page, pageSize).then(data => {
        if (data.products.length === 0) {
            res.status(404).send('No result match what you search for')
            return
        }
        res.status(200).json({
            page,
            pageSize: data.products.length,
            total: data.totalCount,
            items: data.products
        })
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

export default router