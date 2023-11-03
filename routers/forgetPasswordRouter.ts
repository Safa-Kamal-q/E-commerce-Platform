import express from 'express'
import { User } from '../db/entities/User.js'
import ApiError from '../middlewares/errorHandlers/apiError.js'
import { forgetPassword, resetPassword } from '../controllers/forgetPasswordController.js'
const router = express.Router()

router.post('/forgetPassword/:email', async (req, res, next) => {
    const email = req.params.email as string
    const user = await User.findOneBy({ email })

    if (!user) {
        return next(new ApiError('User not found', 404))
    }

    forgetPassword(user, req).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        next(new ApiError('', 500))
    })
})

//send email as query 
router.patch('/resetPassword/:resetToken', async (req, res, next) => {
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const email = req.query.email as string

    if (password !== confirmPassword) {
        return next(new ApiError("The password doesn't match the confirm password, try agin", 400))
    }

    resetPassword(req, password, email).then(data => {
        if (data === 'Token is invalid, or has expired') {
            return next(new ApiError(data as string, 400))
        }
        res.status(200).json({
            status: "success",
            Token: data
        })
    }).catch(err => {
        if(err === 'Invalid Username or password!'){
            return next(new ApiError(err, 400))
        }
        next(new ApiError('', 500))
    })

})

export default router 