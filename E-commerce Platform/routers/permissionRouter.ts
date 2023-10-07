import express from 'express'
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { getPermission, getPermissionByID, insertPermission } from '../controllers/permissionController.js';

const router= express.Router();

router.post('/insertPermission',authenticate, authorize('POST_permissions/insertPermission'),  (req, res)=>{
    const permission= req.body
    if(!permission.name){
        res.status(400).send('the name of permission required')
    }

    insertPermission(permission).then(()=>{
        res.status(201).send('Permission added successfully');
    }).catch(err => {
        res.status(500).send(err)
    });
})

// authorize('GET_permissions/allPermission'),
// , 
router.get('/allPermissions',authenticate,(req, res)=>{
    getPermission().then(data=>{
        res.status(201).send(data)
    }).catch(err=>{
        res.status(500).send(err)
    })
})

router.get('/:id',authenticate, authorize('GET_permissions/:id'), (req, res)=>{
    const id= Number(req.params.id)
    getPermissionByID(id).then(data=>{
        res.status(201).send(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).send("Something went wrong")
    })
})

export default router 