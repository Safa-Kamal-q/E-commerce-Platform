import express from 'express'
import { Product } from "../db/entities/Product.js";
import { NSReview } from "../@types/review.js";
import { Review } from "../db/entities/Review.js";
import { User } from "../db/entities/User.js";
import { error } from "console";
import dataSource from '../db/dataSource.js';

const addReview = async (payload: NSReview.Review, user: User, product: Product) => {
    return dataSource.manager.transaction(async transaction => {
        try {
            const newReview = Review.create({
                ...payload,
                user,
                product
            });

            //this need fix since it doesn't store in product database 
            product.ratingSum += payload.rating
            product.ratingQuantity += 1
            product.ratingAvg = product.ratingSum / (product.ratingQuantity)
            console.log(product)
            await transaction.save(product);

            await transaction.save(newReview);
            return newReview;
        }
        catch (error) {
            console.log(error)
            throw ('Something went wrong')
        }
    })

}

const getProductReview = async (productId: string) => {
    try {
        const reviews = await Review.find({
            where: { product: { id: productId } }
        })
        return reviews
    } catch (err) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const deleteReview = async (reviewId: string, res: express.Response, user: User) => {
    try {

        const review = await Review.findOne({
            where: { id: reviewId },
            relations: ['user']
        });

        const userReview = review?.user as User
        if (review) {
            if (user.type !== 'admin' && user.id !== userReview.id) {
                return res.status(403).json('You can delete your own review only')
            }
            await review.remove();
            res.status(200).json('Review deleted successfully ')
        } else {
            res.status(404).json('Review not found!');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

export {
    addReview,
    getProductReview,
    deleteReview,
}