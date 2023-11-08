import express from 'express'
import { NSCategory } from "../@types/categoryType.js";
import { Category } from "../db/entities/Category.js";
import { uploadFile } from "../s3.js";
import { Product } from '../db/entities/Product.js';

const createCategory = async (payload: NSCategory.Category, imageFile: Express.Multer.File) => {
    try {
        const result = await uploadFile(imageFile)

        const newCategory = Category.create({
            ...payload,
            image: result.Location,
            slug: payload.name.toLowerCase().replace(' ', '-')
        });

        await newCategory.save()
        return newCategory;
    }
    catch (error) {
        console.log(error)
        throw ('Something went wrong')
    }
}

const getCategories = async () => {
    return await Category.find();
}

const getCategoryByName = async (slug: string) => {
    return await Category.findBy({ slug });
}


const deleteCategory = async (id: string, res: express.Response) => {
    try {
        const category = await Category.findOneBy({ id });
        if (category) {
            await category.remove();
            res.status(200).send('The category deleted successfully ')
        } else {
            res.status(404).send('The category not found!');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

//I must update the code if the user want to change the image
const updateCategory = async (id: string, payload: NSCategory.Category, res: express.Response) => {
    try {
        const existingCategory = await Category.findOneBy({ id })

        if (payload.name) {
            payload.slug = payload.name.toLowerCase().replace(' ', '-')
        }

        if (existingCategory) {
            Category.merge(existingCategory, payload);
            await Category.save(existingCategory);
            res.status(200).send("The category updated successfully")

        } else {
            res.status(404).send("Category not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

const getCategoryProducts = async (categorySlug: string, page: number, pageSize: number) => {
    try {
        const skip = (page - 1) * pageSize;

        const [products, totalCount] = await Product
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.categories', 'category')
            .where('category.slug = :categorySlug', { categorySlug })
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();

        const modifiedProducts = products.map(({ categories, ...rest }) => rest);

        return {
            modifiedProducts,
            totalCount
        };
    } catch (err) {
        console.log(err)
        throw ("Something went wrong")
    }

}


export {
    createCategory,
    getCategories,
    getCategoryByName,
    deleteCategory,
    updateCategory,
    getCategoryProducts
}