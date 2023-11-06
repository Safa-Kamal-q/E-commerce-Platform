import { NSFilter } from "../@types/filters.js";
import { Product } from "../db/entities/Product.js";

const search = async (keyword: string, page: number, pageSize: number, filters: NSFilter.filter, orderBy: string, sortOrder: string) => {
    try {
        const skipAmount = (page - 1) * pageSize;

        const query = Product.createQueryBuilder('product')
            .where('LOWER(product.title) LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('LOWER(product.description) LIKE :keyword', { keyword: `%${keyword}%` })

        if (filters.minPrice) {
            query.andWhere('product.price >= :minPrice', { minPrice: Number(filters.minPrice) })
        }
        if (filters.maxPrice) {
            query.andWhere('product.price <= :maxPrice', { maxPrice: Number(filters.maxPrice) })
        }

        const direction = sortOrder === 'desc' ? 'DESC' : 'ASC';
        query.orderBy(`product.${orderBy}`, direction);


        const [products, totalCount] = await query
            .take(pageSize)
            .skip(skipAmount)
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