import express from 'express'
import bcrypt from 'bcrypt'
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { User } from '../db/entities/User.js';
import { deleteUser, getOneUser, getUsers, ordersForUser, updatePassword, updateUserInfo } from '../controllers/userController.js'
import { validateUserUpdate } from '../middlewares/validation/userUpdate.js';

const router = express.Router()


router.get('/', authenticate, authorize('GET_users/'), (req, res, next) => {
    getUsers().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

router.get('/:email', authenticate, authorize('GET_users/:email'), (req, res, next) => {
    const email = req.params.email
    const user = res.locals.user

    if (user.type !== 'admin' && (user.email !== req.query.email)) {
        res.status(403).send("You don't have permission to get another user info")
        return
    }

    getOneUser(email).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})


//must send email and password and password as query 
router.put('/password/', authenticate, authorize("PUT_users/password/"), async (req, res, next) => {
    const email = req.query.email as string | ''
    const oldPassword = req.query.oldPassword as string | ''
    const user = res.locals.user
    const newPassword = req.body.newPassword

    const existUser= await User.findOne({ where: { email }});
    if(!existUser){
        return res.status(404).send("User doesn't exist")
    }

    if(!oldPassword){
        return res.status(400).send("You must provide the old password to update it")
    }

    const passwordMatching = await bcrypt.compare(oldPassword , user?.password || '')
    if (user.email !== email || !passwordMatching) {
        return res.status(403).send("The entered old password or email isn't correct")
    }

    if (!newPassword) {
        return res.status(400).send("You must give us a new password to update it ")
    }

    if (newPassword && newPassword.length < 6) {
        return res.status(400).send("The password length should at least be 6")
    }

    updatePassword(existUser, newPassword).then(data => {
        res.status(200).send("Your password has been successfully updated.")
    }).catch(error => {
        console.log(error)
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

//I must send email and password as query for validateUserUpdate
router.put('/', authenticate, authorize("PUT_users/"), validateUserUpdate, (req, res, next) => {
    updateUserInfo(req.params.id, req.body).then(data => {
        res.status(200).send("User updated successfully")
    }).catch(error => {
        console.log(error)
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

//must send email and password  as query 
router.delete('/', authenticate, authorize('DELETE_users/'), async (req, res) => {
    const email = req.params.email as string 
    const password = req.params.password
    const user = res.locals.user

    if (!password && !email){
        return res.status(400).send("Your email and password require for deleting")
    }

    const passwordMatching = await bcrypt.compare(password , user?.password || '')
    if ( user.type !== 'admin' && (user.email !== email || !passwordMatching)) {
        return res.status(403).send("Your email and password not correct")
    }

    deleteUser(email, res);
});

router.get('/orders/:id', authenticate, authorize('GET_users/orders/:id'), async (req, res, next) => {
    const existUser = await User.findOneBy({ id: req.params.id });
    if (!existUser) {
        return res.status(404).send("User not found") 
    }

    if (existUser.type !== "buyer") {
        return res.status(400).send("The type of user is not buyer so he/she hasn't have product")
        
    }

    ordersForUser(existUser).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next({
            status: 500,
            message: "Something went wrong"
        })
    })
})

export default router