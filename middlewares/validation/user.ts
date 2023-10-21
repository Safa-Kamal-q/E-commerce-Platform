import express, { NextFunction } from 'express';
import isEmail from 'validator/lib/isEmail.js'; // npm i validator
import { User } from '../../db/entities/User.js';


const validateUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ['userName', 'password', 'email', 'country', 'type', 'phoneNumber'];
    const paymentValue = ['nameForReceipt', 'phoneNumber', 'city', 'fullAddress']
    const sellerProfileValues = ['identityNumber', 'nickName', 'shopName', 'accountNumber', 'accountType', 'shippingLocation']
    const roleValues = ['roles']
    const user = req.body;

    values.forEach(key => {
        if (!user[key]) {
            errorList.push(`${key} is require`)
        }
    })

    if (user.type !== 'admin') {
        roleValues.forEach(key => {
            if (!user[key]) {
                errorList.push(`${key} is require`)
            }
        })
    }

    if (user.type === 'buyer') {
        paymentValue.forEach(key => {
            if (!user[key]) {
                errorList.push(`${key} is require for buyer user to add payment info `)
            }
        })
        // if our project for palestine only I must add more validation for numbers (+970, +972)

    }

    if (user.type === 'seller') {
        sellerProfileValues.forEach(key => {
            if (!user[key]) {
                errorList.push(`${key} is require for seller user to create seller profile `)
            }
        })

        if (user.identityNumber && user.identityNumber.length !== 9){
            errorList.push(`IdentityNumber must be 9 numbers`)
        }
        if(user.accountNumber && user.accountNumber.length !== 7){
            errorList.push(`Account number must be 7 numbers`)
        }
        if(!['current', 'saving'].includes(user.accountType)){
            errorList.push(`account type can be current or saving account only`)
        }
    }

    if ( user.phoneNumber && user.phoneNumber.length !== 10 ) {
        errorList.push('The phone number length should be 10 character')
    }
    
    if (!isEmail.default(user.email)) {
        errorList.push("The entered Email in not valid ")
    }

    if (await User.findOneBy({ email: user.email })) {
        errorList.push("The entered email already has an account, please use a different email")
    }

    if (user.password && user.password.length < 6 ) {
        errorList.push('The password length should at least be 6')
    }

    if (!['seller', 'admin', 'guest', 'buyer'].includes(user.type)) {
        errorList.push('invalid type')
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
    validateUser
}