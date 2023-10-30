import express from 'express'
import { deleteRole, getRoles, getRolesByID, insertRole, updateRole } from '../controllers/roleController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { validateRole } from '../middlewares/validation/role.js';
import { Role } from '../db/entities/Role.js';
import { NSUser } from '../@types/userType.js';
import ApiError from '../middlewares/errorHandlers/apiError.js';

const router = express.Router();

router.post('/', authenticate, authorize('POST_roles/'), validateRole, async (req, res, next) => {

    insertRole(req.body).then((data) => {
        res.status(201).send('Role added successfully');
    }).catch(err => {
        next(new ApiError('', 500))
    });
})

router.get('/', authenticate, authorize('GET_roles/'), (req, res, next) => {
    getRoles().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:id', authenticate, authorize('GET_roles/:id'), (req, res, next) => {
    const id = req.params.id
    getRolesByID(id).then(data => {
        if (data.length === 0) {
            next(new ApiError(`The role with this Id: ${id} not found`, 404))
        } else {
            res.status(200).send(data)
        }
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.delete('/:roleName', authenticate, authorize('DELETE_roles/:roleName'), async (req, res, next) => {
    const name = req.params.roleName as NSUser.UserType
    const existRole = await Role.findOne({ where: { name } })

    if (!existRole) {
        return next(new ApiError("Role doesn't exist", 404))
    }
    
    deleteRole(existRole).then(data => {
        res.status(200).send("Role deleted successfully")
    }).catch(err => {
        next(new ApiError('', 500))
    })
});

router.put('/:roleName', authenticate, authorize('PUT_roles/roleName'), async (req, res, next) => {
    const name = req.params.roleName as NSUser.UserType
    const existRole = await Role.findOne({ where: { name } })

    if(!req.body.permissions || req.body.name){
        next(new ApiError("You can update role's permission only", 400))
    }
    
    if (!existRole) {
        return next(new ApiError("Role doesn't exist", 404))
    }

    updateRole(existRole, req.body).then(data=>{
        res.status(200).send(data)
    }).catch(error=>{
        next(new ApiError('', 500))
    })
})

export default router 