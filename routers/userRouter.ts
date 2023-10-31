import express from 'express'
import bcrypt from 'bcrypt'
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { User } from '../db/entities/User.js';
import { deleteUser, getOneUser, getUsers, ordersForUser, updatePassword, updateUserInfo } from '../controllers/userController.js'
import { validateUserUpdate } from '../middlewares/validation/userUpdate.js';
import ApiError from '../middlewares/errorHandlers/apiError.js';
import { validateNewPassword } from '../middlewares/validation/changePassword.js';

const router = express.Router()


router.get('/', authenticate, authorize('GET_users/'), (req, res, next) => {
    getUsers().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

router.get('/:email', authenticate, authorize('GET_users/:email'), (req, res, next) => {
    const email = req.params.email
    const user = res.locals.user

    if (user.type !== 'admin' && (user.email !== req.query.email)) {
        return next(new ApiError("You don't have permission to get another user info", 403))
    }

    getOneUser(email).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})


//must send email and password and password as query 
router.put('/password/', authenticate, authorize("PUT_users/password/"),
    validateNewPassword, async (req, res, next) => {
        const existUser1 = res.locals.existUser
        const newPassword = req.body.newPassword

        updatePassword(existUser1, newPassword).then(data => {
            res.status(200).send("Your password has been successfully updated.")
        }).catch(error => {
            console.log(error)
            next(new ApiError('', 500))
        })
    })

//I must send email and password as query for validateUserUpdate
router.put('/', authenticate, authorize("PUT_users/"), validateUserUpdate, (req, res, next) => {
    updateUserInfo(req.params.id, req.body).then(data => {
        res.status(200).send("User updated successfully")
    }).catch(error => {
        console.log(error)
        next(new ApiError('', 500))
    })
})

//must send email and password  as query 
router.delete('/', authenticate, authorize('DELETE_users/'), async (req, res, next) => {
    const email = req.params.email as string
    const password = req.params.password
    const user = res.locals.user

    if (!password && !email) {
        next(new ApiError("Your email and password require for deleting", 400))
    }

    const passwordMatching = await bcrypt.compare(password, user?.password || '')
    if (user.type !== 'admin' && (user.email !== email || !passwordMatching)) {
        next(new ApiError("Your email and password not correct", 403))
    }

    deleteUser(email, res);
});

router.get('/orders/:id', authenticate, authorize('GET_users/orders/:id'), async (req, res, next) => {
    const existUser = await User.findOneBy({ id: req.params.id });
    if (!existUser) {
        return next(new ApiError("User not found", 404))
    }

    if (existUser.type !== "buyer") {
        next(new ApiError("The type of user is not buyer so he/she hasn't have product", 400))

    }

    ordersForUser(existUser).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

export default router