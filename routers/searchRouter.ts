import express from 'express'
import { search } from '../controllers/searchController.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'

const router = express.Router()

router.get('/:keyword', (req, res, next) => {
    const keyword = req.params.keyword.toLowerCase()

    search(keyword).then(data => {
        if (data.length === 0) {
            res.status(404).send('No result match what you search for')
            return
        }
        res.status(200).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

export default router