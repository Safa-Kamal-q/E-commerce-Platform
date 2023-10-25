import express, { NextFunction } from 'express'
import { User } from '../../db/entities/User.js';
import bcrypt from 'bcrypt'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

const validateUserUpdate = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const userValues = req.body;
    const user= res.locals.user
    const email= req.query.email as string 
    const password= req.query.password as string

    if (!password || !email ){
        next({
            code: 'validation',
            status: 400,
            message: "You must provide email and password to update your info"
        })
    }

    const passwordMatching = await bcrypt.compare(password , user?.password || '')
    if (user.type!=='admin' && (user.email !== email || !passwordMatching)) {
        next({
            code: 'authorize',
            status: 403,
            message: "You don't have the permission to update another user values"
        })
    }

    const existUser = await User.findOne({ where: { email }});

    if(!existUser){
        next({
            code: 'not found',
            status: 404,
            message: "User not found"
        })
    }

    if(userValues.password){
        errorList.push("You can't change the password from this api, user /users/password/:id")
    }

    if(userValues.email){
        errorList.push("You can't change the email")
    }

    if(userValues.orders | userValues.type){
        errorList.push("You can't update this")
    }

    if (userValues.phoneNumber) {
        const parsedPhoneNumber = parsePhoneNumber(userValues.phoneNumber, 'PS');
        if (!isValidPhoneNumber(userValues.phoneNumber)) {
            errorList.push("Invalid phone number for Palestine")
        }
    }

    if (errorList.length > 0) {
        next({
            code: 'validation',
            status: 400,
            message: errorList
        })
    } else {
        next();
    }
}

export {
    validateUserUpdate
}