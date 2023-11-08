import express, { NextFunction } from 'express'
import { SellerProfile } from '../../db/entities/SellerProfile.js';
import { Category } from '../../db/entities/Category.js';
import { In } from 'typeorm';

const validateProduct = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ["title", "description", "price", "quantity", "sellerProfile"];
    const product = req.body;

    values.forEach(key => {
        if (!product[key]) {
            errorList.push(`${key} is require`)
        }
    })

    const categories= JSON.parse(product.categories)
    const foundCategories = await Category.findBy({ id: In(categories) });

    if (foundCategories.length !== categories.length) {
        const foundCategoriesIds = foundCategories.map(category => category.id);
        const notFoundCategories = categories.filter((categoryId: string) => !foundCategoriesIds.includes(categoryId));
        errorList.push(`Categories with these ids: [${notFoundCategories}] not found:` )
    }

    const existingSellerProfile = await SellerProfile.findOne({
        where: { id: product.sellerProfile },
    });

    if (product.sellerProfile && !existingSellerProfile) {
        errorList.push(`The entered seller profile id doesn't exist`)
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        res.locals.foundCategories= foundCategories
        next();
    }
}

export {
    validateProduct
}