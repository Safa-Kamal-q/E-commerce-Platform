import express from 'express'
import { search } from '../controllers/searchController.js'

const router= express.Router()

router.get('/:keyword', (req,res)=>{
    const keyword = req.params.keyword.toLowerCase()

    search(keyword).then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).send(err)
    })
})

export default router