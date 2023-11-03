import { ILike } from "typeorm";
import { Product } from "../db/entities/Product.js";

const search = async (keyword: string, page: number, pageSize: number) => {
    try {
        const skipAmount = (page - 1) * pageSize; // Calculate how many items to skip based on the page number and limit

        const [products, totalCount] = await Product.createQueryBuilder('product')
            .where('LOWER(product.title) LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('LOWER(product.description) LIKE :keyword', { keyword: `%${keyword}%` })
            .take(pageSize) // Limit the number of items per page
            .skip(skipAmount) // Skip the necessary number of items based on pagination
            .getManyAndCount();

        return {
            products,
            totalCount
        };
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }

}

export {
    search
}