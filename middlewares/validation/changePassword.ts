import express, { NextFunction } from 'express'
import { User } from '../../db/entities/User.js';
import ApiError from '../errorHandlers/apiError.js';
import bcrypt from 'bcrypt'


const validateNewPassword = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["oldPassword", "email"];
    const email = req.query.email as string | ''
    const oldPassword = req.query.oldPassword as string | ''
    const user = res.locals.user


    const existUser = await User.findOne({ where: { email } });
    if (!existUser) {
        next(new ApiError("User doesn't exist", 404))
    }

    if (!req.body.newPassword) {
        errorList.push("You must give us a new password to update it ")
    }

    if (!oldPassword || !email) {
        errorList.push(`email or oldPassword missed, input it as query`)
    } else {
        const passwordMatching = await bcrypt.compare(oldPassword, user?.password || '')
        if (user.email !== email || !passwordMatching) {
            errorList.push("The entered old password or email isn't correct")
        }
    }

    if (req.body.newPassword && req.body.newPassword.length < 6) {
        errorList.push("The password length should at least be 6")
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        res.locals.existUser = existUser
        next();
    }
}

export {
    validateNewPassword
}