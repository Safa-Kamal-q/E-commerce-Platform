import express from 'express'
import { search } from '../controllers/searchController.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'
import { NSFilter } from '../@types/filters.js'

const router = express.Router()

//we don't use auth since anyone can see the products
//must send filters in this format {"minPrice":15,"maxPrice":20}
router.get('/:keyword', (req, res, next) => {
    const page = parseInt(req.query.page as string || '1');
    const pageSize = parseInt(req.query.pageSize as string || '10');
    const keyword = req.params.keyword.toLowerCase()

    let filters
    if (req.query.filters) {
        filters = (JSON.parse(req.query.filters as string)) as NSFilter.Filter
    } else {
        filters = []
    }

    const orderBy = (req.query.orderBy || 'createdAt') as string
    const sortOrder = (req.query.sortOrder || 'desc') as string

    search(keyword, page, pageSize, filters, orderBy, sortOrder).then(data => {
        if (data.products.length === 0) {
            res.status(404).send('No result match your search criteria')
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