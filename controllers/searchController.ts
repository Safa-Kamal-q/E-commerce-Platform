import { ILike } from "typeorm";
import { Product } from "../db/entities/Product.js";

const search = async (keyword: string) => {

    try {
        const products = await Product.createQueryBuilder('product')
            .where('LOWER(product.title) LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('LOWER(product.description) LIKE :keyword', { keyword: `%${keyword}%` })
            .getMany();

        return products
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }

}

export {
    search
}