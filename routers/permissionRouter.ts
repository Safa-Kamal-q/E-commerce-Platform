import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { deletePermission, getPermission, getPermissionByID, insertPermission } from '../controllers/permissionController.js';
import { Permission } from '../db/entities/Permission.js';

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

router.delete('/:permissionName', authenticate, authorize('DELETE_permissions/:permissionName'), async (req, res) => {
    const permissionName = req.params.permissionName
    const existPermission = await Permission.findOne({ where: { name: permissionName } })

    if (!existPermission) {
        return res.status(404).send("permission doesn't exist")
    }

    deletePermission(existPermission).then(data => {
        res.status(200).send("Permission deleted successfully")
    }).catch(err => {
        res.status(500).send("Something went wrong")
    })
});

export default router 