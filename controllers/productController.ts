import { NSProduct } from "../@types/productType.js";
import { Product } from "../db/entities/Product.js";
import express from 'express'
import { uploadFile } from "../s3.js";

const insertProduct = async (payload: NSProduct.Item, imageFile: Express.Multer.File) => {
    try {
        const result = await uploadFile(imageFile)

        const newProduct = Product.create({
            ...payload,
            basicImage: result.Location//we will store the basic image URL 
        });

        await newProduct.save()
        return newProduct;

    }
    catch (error) {
        console.log(error)
        throw ('Something went wrong')
    }
}

const getProducts = async () => {
    return await Product.find();
}

const getProductByID = async (id: string) => {
    return await Product.findBy({ id });
}

//This to get all the products that belong to specific user
const getSellerProducts = async (sellerProfileId: string) => {
    try {
        const products = await Product
            .createQueryBuilder('product')
            .where('product.sellerProfileId = :sellerProfileId', { sellerProfileId: sellerProfileId })
            .getMany();

        return products
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const deleteProduct = async (id: string, res: express.Response) => {
    try {
        const product = await Product.findOneBy({ id });
        if (product) {
            await product.remove();
            res.status(200).send('The Product deleted successfully ')
        } else {
            res.status(404).send('The product not found!');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

const updateProduct = async (id: string, payload: NSProduct.Item, res: express.Response) => {
    try {
        const existingProduct = await Product.findOneBy({ id })

        if (existingProduct) {
            Product.merge(existingProduct, payload);
            await Product.save(existingProduct);
            res.status(200).send("The product updated successfully")

        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

const addImageGallery = async (id: string, files: Express.Multer.File[] , res: express.Response) => {
    try {

        const existingProduct = await Product.findOneBy({ id })

        let imagesUrl: string [] = [];
        if (existingProduct) {

            for (const file of files) {
                const result = await uploadFile(file)
                imagesUrl.push(result.Location)
            }

            existingProduct.galleryImages= imagesUrl
            await Product.save(existingProduct);

            res.status(201).send("Gallery images added successfully ")

        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

export {
    insertProduct,
    getProducts,
    getProductByID,
    getSellerProducts,
    deleteProduct,
    updateProduct,
    addImageGallery
}