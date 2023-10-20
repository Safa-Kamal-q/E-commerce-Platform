import express, { NextFunction } from 'express'
import { Role } from '../../db/entities/Role.js';

const validateRole = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["name", "permissions"];
    const role = req.body;

    values.forEach(key => {
        if (!role[key]) {
            errorList.push(`${key} is require`)
        }
    })

    if (await Role.findOneBy({ name: role.name })) {
        errorList.push('This name already exist in the DB')
    }

    if (!['seller', 'admin', 'guest', 'buyer'].includes(role.name)) {
        errorList.push('The name for role must be one of the following (seller, admin, guest, buyer) only ')
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        next();
    }
}

export {
    validateRole
}