import express from 'express'
import { getRoles, getRolesByID, insertRole } from '../controllers/roleController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Role } from '../db/entities/Role.js';

const router= express.Router();

router.post('/insertRole',authenticate, authorize('POST_roles/insertRole'),  async (req, res)=>{
    const role= req.body

    ///move this to vialed role middleware 
    if(!role.name){
        res.status(400).send('The name of role required')
    }
    if(await Role.findOneBy({ name: role.name }) ){
        res.status(400).send('This name already exist in the DB')
        return 
    }
    if(!['seller', 'admin', 'guest', 'buyer'].includes(role.name)){
        res.status(400).send('The name for role must be one of the following "seller, admin, guest, buyer" only ')
        return 
    }

    if(!role.permissions){
        res.status(400).send('Add permission for the role')
    }

    ///
    
    insertRole(role).then((data)=>{
        res.status(201).send('Role added successfully');
    }).catch(err => {
        if(err === 'This name already exist in the DB'){
            res.status(400).send(err)
        }
        res.status(500).send(err)
    });
})

router.get('/allRoles',authenticate, authorize('GET_roles/allRoles'), (req, res)=>{
    getRoles().then(data=>{
        res.status(201).send(data)
    }).catch(err=>{
        res.status(500).send(err)
    })
})

router.get('/:id',authenticate, authorize('GET_roles/:id'), (req, res)=>{
    const id= req.params.id
    getRolesByID(id).then(data=>{
        res.status(201).send(data)
    }).catch(err=>{
        res.status(500).send(err)
    })
})

export default router 