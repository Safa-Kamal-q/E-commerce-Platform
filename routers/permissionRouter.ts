import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { getPermission, getPermissionByID, insertPermission } from '../controllers/permissionController.js';

const router = express.Router();

router.post('/', authenticate, authorize('POST_permissions/'), (req, res, next) => {
    const permission = req.body
    if (!permission.name) {
        next({
            code: 'validation',
            status: 400,
            message: 'the name of permission required'
        })
    }

    insertPermission(permission).then(() => {
        res.status(201).send('Permission added successfully');
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    });
})


router.get('/', authenticate, authorize('GET_permissions/'), (req, res, next) => {
    getPermission().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/:id', authenticate, authorize('GET_permissions/:id'), (req, res, next) => {
    const id = Number(req.params.id)
    getPermissionByID(id).then(data => {
        if (data.length === 0) {
            next({
                code: 'not found',
                status: 404,
                message: `The permission with this Id: ${id} not found`
            })
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        console.log(err)
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

export default router 