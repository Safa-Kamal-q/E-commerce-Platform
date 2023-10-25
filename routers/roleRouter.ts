import express from 'express'
import { deleteRole, getRoles, getRolesByID, insertRole, updateRole } from '../controllers/roleController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { validateRole } from '../middlewares/validation/role.js';
import { Role } from '../db/entities/Role.js';
import { NSUser } from '../@types/userType.js';

const router = express.Router();

router.post('/', authenticate, authorize('POST_roles/'), validateRole, async (req, res, next) => {

    insertRole(req.body).then((data) => {
        res.status(201).send('Role added successfully');
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    });
})

router.get('/', authenticate, authorize('GET_roles/'), (req, res, next) => {
    getRoles().then(data => {
        res.status(201).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/:id', authenticate, authorize('GET_roles/:id'), (req, res, next) => {
    const id = req.params.id
    getRolesByID(id).then(data => {
        if (data.length === 0) {
            next({
                code: 'not found',
                status: 404,
                message: `The role with this Id: ${id} not found`
            })
        } else {
            res.status(201).send(data)
        }
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.delete('/:roleName', authenticate, authorize('DELETE_roles/:roleName'), async (req, res) => {
    const name = req.params.roleName as NSUser.UserType
    const existRole = await Role.findOne({ where: { name } })

    if (!existRole) {
        return res.status(404).send("Role doesn't exist")
    }
    
    deleteRole(existRole).then(data => {
        res.status(200).send("Role deleted successfully")
    }).catch(err => {
        res.status(500).send("Something went wrong")
    })
});

router.put('/:roleName', authenticate, authorize('PUT_roles/roleName'), async (req, res) => {
    const name = req.params.roleName as NSUser.UserType
    const existRole = await Role.findOne({ where: { name } })

    if(!req.body.permissions || req.body.name){
        return res.status(400).send("You can update role's permission only")
    }
    
    if (!existRole) {
        return res.status(404).send("Role doesn't exist")
    }

    updateRole(existRole, req.body).then(data=>{
        res.status(200).send(data)
    }).catch(error=>{
        res.status(500).send(error)
    })
})

export default router 