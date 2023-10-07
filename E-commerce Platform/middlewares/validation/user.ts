import express, { NextFunction } from 'express';
import isEmail from 'validator/lib/isEmail.js';
// npm i validator
import { User } from '../../db/entities/User.js';


const validateUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ['userName', 'password', 'email', 'country', 'type'];
    const paymentValue = ['fullBuyerName', 'phoneNumber', 'city', 'fullAddress']
    const roleOrderValues= ['roles', 'orders']
    const user = req.body;

    values.forEach(key => {
        if (!user[key]) {
            errorList.push(`${key} is require`)
        }
    })

    if (user.type !== 'admin'){
        roleOrderValues.forEach(key => {
            if (!user[key]) {
                errorList.push(`${key} is require`)
            }
        })
    }

    if (user.type === 'buyer') {
        paymentValue.forEach(key => {
            if (!user[key]) {
                errorList.push(`${key} is require for seller user to add payment info `)
            }
        })
        // if our project for palestine only I must add more validation for numbers (+970, +972)
        if (user.phoneNumber){
            if (user.phoneNumber.length < 10) {
                errorList.push('The phone number length should be 10 character')
            }
        }
        
    }

    if (!isEmail.default(user.email)) {
        errorList.push("The entered Email in not valid ")
    }

    if (await User.findOneBy({ email: user.email})){
        errorList.push("The entered email already has an account, please use a different email")
    }

    if (user.password.length < 6) {
        errorList.push('The password length should at least be 6')
    }

    if (!['seller', 'admin', 'guest', 'buyer'].includes(user.type)) {
        errorList.push('invalid type')
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        next();
    }
}

export {
    validateUser
}