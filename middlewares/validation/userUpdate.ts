import express, { NextFunction } from 'express'
import { User } from '../../db/entities/User.js';
import bcrypt from 'bcrypt'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import ApiError from '../errorHandlers/apiError.js';

const validateUserUpdate = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const userValues = req.body;
    const user= res.locals.user
    const email= req.query.email as string 
    const password= req.query.password as string

    if (!password || !email ){
        next(new ApiError("You must provide email and password to update your info", 400))
    }

    const passwordMatching = await bcrypt.compare(password , user?.password || '')
    if (user.type!=='admin' && (user.email !== email || !passwordMatching)) {
        next(new ApiError("You don't have the permission to update another user values", 403))
    }

    const existUser = await User.findOne({ where: { email }});

    if(!existUser){
        next(new ApiError("User not found", 404))
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
        res.status(400).send(errorList)
    } else {
        next();
    }
}

export {
    validateUserUpdate
}