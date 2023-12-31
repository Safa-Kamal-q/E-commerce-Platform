import express, { NextFunction } from 'express';
import isEmail from 'validator/lib/isEmail.js'; // npm i validator
import { User } from '../../db/entities/User.js';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { Role } from '../../db/entities/Role.js';
import { In } from 'typeorm';


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

    const foundRoles = await Role.findBy({ id: In(user.roles) });

    if (foundRoles.length !== user.roles.length) {
        const foundRolesIds = foundRoles.map(role => role.id);
        const notFoundRoles = user.roles.filter((roleId: string) => !foundRolesIds.includes(roleId));
        errorList.push(`Roles with these ids: [${notFoundRoles}] not found:`)
    }

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
    }

    if (user.type === 'seller') {
        sellerProfileValues.forEach(key => {
            if (!user[key]) {
                errorList.push(`${key} is require for seller user to create seller profile `)
            }
        })

        if (user.identityNumber && user.identityNumber.length !== 9) {
            errorList.push(`IdentityNumber must be 9 numbers`)
        }
        if (user.accountNumber && user.accountNumber.length !== 7) {
            errorList.push(`Account number must be 7 numbers`)
        }
        if (!['current', 'saving'].includes(user.accountType)) {
            errorList.push(`account type can be current or saving account only`)
        }
    }

    if (user.phoneNumber) {
        const parsedPhoneNumber = parsePhoneNumber(user.phoneNumber, 'PS');
        if (!isValidPhoneNumber(user.phoneNumber)) {
            errorList.push("Invalid phone number for palestine")
        }
    }

    if (!isEmail.default(user.email)) {
        errorList.push("The entered Email in not valid ")
    }

    if (await User.findOneBy({ email: user.email })) {
        errorList.push("The entered email already has an account, please use a different email")
    }

    if (user.password && user.password.length < 6) {
        errorList.push('The password length should at least be 6')
    }

    if (!['seller', 'admin', 'buyer'].includes(user.type)) {
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