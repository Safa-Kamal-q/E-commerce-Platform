import express, { NextFunction } from 'express'
import { Category } from '../../db/entities/Category.js';

const validateCategory = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["name"];
    const category = req.body;

    values.forEach(key => {
        if (!category[key]) {
            errorList.push(`${key} is require`)
        }
    })

    if (await Category.findOneBy({ name: category.name })) {
        errorList.push('This name already exist in the DB')
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        next();
    }
}

export {
    validateCategory
}