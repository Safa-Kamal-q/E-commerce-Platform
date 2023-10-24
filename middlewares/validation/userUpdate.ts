import express, { NextFunction } from 'express'
import { User } from '../../db/entities/User.js';

const validateUserUpdate = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const userValues = req.body;
    const id= req.params.id 

    if(res.locals.user?.email !== req.query.email || res.locals.user?.id !== req.params.id){
        next({
            code: 'authorize',
            status: 403,
            message: "You don't have the permission to update another user values"
        })
    }
    const existUser = await User.findOneBy({ id });

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

    if ( userValues.phoneNumber && userValues.phoneNumber.length !== 10 ) {
        errorList.push('The phone number length should be 10 character')
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