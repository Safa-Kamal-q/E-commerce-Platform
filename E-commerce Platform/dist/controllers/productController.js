import { Product } from "../db/entities/Product.js";
const insertProduct = async (payload) => {
    try {
        const newProduct = Product.create({
            ...payload
        });
        await newProduct.save();
        return newProduct;
    }
    catch (error) {
        console.log(error);
        throw ('Something went wrong');
    }
};
const getProducts = async () => {
    return await Product.find();
};
const getProductByID = async (id) => {
    return await Product.findBy({ id });
};
//This to get all the products that belong to specific user
const getSellerProducts = async (sellerProfileId) => {
    try {
        const products = await Product
            .createQueryBuilder('product')
            .where('product.sellerProfileId = :sellerProfileId', { sellerProfileId: sellerProfileId })
            .getMany();
        return products;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong");
    }
};
const deleteProduct = async (id, res) => {
    try {
        const product = await Product.findOneBy({ id });
        if (product) {
            await product.remove();
            res.status(200).send('The Product deleted successfully ');
        }
        else {
            res.status(404).send('The product not found!');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
};
const updateProduct = async (id, payload, res) => {
    try {
        const existingProduct = await Product.findOneBy({ id });
        if (existingProduct) {
            Product.merge(existingProduct, payload);
            await Product.save(existingProduct);
            res.status(200).send("The product updated successfully");
        }
        else {
            res.status(404).send("Product not found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
};
export { insertProduct, getProducts, getProductByID, getSellerProducts, deleteProduct, updateProduct };
//# sourceMappingURL=productController.js.map