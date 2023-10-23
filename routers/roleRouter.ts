import express from 'express'
import { getRoles, getRolesByID, insertRole } from '../controllers/roleController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { validateRole } from '../middlewares/validation/role.js';

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

export default router 