import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { deletePermission, getPermission, getPermissionByID, insertPermission } from '../controllers/permissionController.js';
import { Permission } from '../db/entities/Permission.js';
import ApiError from '../middlewares/errorHandlers/apiError.js';

const router = express.Router();

router.post('/', authenticate, authorize('POST_permissions/'), (req, res, next) => {
    const permission = req.body
    if (!permission.name) {
        next(new ApiError('the name of permission required',400))
    }

    insertPermission(permission).then(() => {
        res.status(201).send('Permission added successfully');
    }).catch(err => {
        next(new ApiError('', 500))
    });
})


router.get('/', authenticate, authorize('GET_permissions/'), (req, res, next) => {
    getPermission().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:id', authenticate, authorize('GET_permissions/:id'), (req, res, next) => {
    const id = Number(req.params.id)
    getPermissionByID(id).then(data => {
        if (data.length === 0) {
            next(new ApiError(`The permission with this Id: ${id} not found`,404))
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        console.log(err)
        next(new ApiError('', 500))
    })
})

router.delete('/:permissionName',
    authenticate, authorize('DELETE_permissions/:permissionName'),
    async (req, res, next) => {
        const permissionName = req.params.permissionName
        const existPermission = await Permission.findOne({ where: { name: permissionName } })

        if (!existPermission) {
            return next(new ApiError("permission doesn't exist", 404))
        }

        deletePermission(existPermission).then(data => {
            res.status(200).send("Permission deleted successfully")
        }).catch(err => {
            next(new ApiError('', 500))
        })
    });

export default router 