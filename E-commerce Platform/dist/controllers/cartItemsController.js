import { ShoppingCartItem } from "../db/entities/ShoppingCartItems.js";
import dataSource from "../db/dataSource.js";
const insertCartItem = async (payload, cart, existProduct) => {
    return dataSource.manager.transaction(async (transaction) => {
        try {
            const price = payload.quantity * existProduct.price;
            const newCartItem = ShoppingCartItem.create({
                ...payload,
                price
            });
            if (existProduct && cart) {
                cart.totalPrice += payload.quantity * existProduct.price;
                await transaction.save(cart);
            }
            await transaction.save(newCartItem);
            return newCartItem;
        }
        catch (error) {
            console.log(error);
            throw ('Something went wrong');
        }
    });
};
const getOneCartItems = async () => {
    return await ShoppingCartItem.find();
};
const getCartItemByID = async (id) => {
    return await ShoppingCartItem.findBy({ id });
};
//This to get all the cart items that belong to specific cart
const getAllCartItems = async (cartId) => {
    try {
        const cartItem = await ShoppingCartItem
            .createQueryBuilder('cartItem')
            .where('cartItem.cartId = :cartId', { cartId: cartId })
            .getMany();
        return cartItem;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong");
    }
};
const deleteCartItem = async (id, res) => {
    try {
        const cartItem = await ShoppingCartItem.findOneBy({ id });
        if (cartItem) {
            await cartItem.remove();
            res.status(200).send('The cart item deleted successfully ');
        }
        else {
            res.status(404).send('The cart item not found!');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
};
const updateCartItem = async (id, payload, res) => {
    try {
        const existingCartItem = await ShoppingCartItem.findOneBy({ id });
        if (existingCartItem) {
            ShoppingCartItem.merge(existingCartItem, payload);
            await ShoppingCartItem.save(existingCartItem);
            res.status(200).send("The cart item updated successfully");
        }
        else {
            res.status(404).send("The cart item not found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
};
export { insertCartItem, updateCartItem, deleteCartItem, getAllCartItems, getCartItemByID, getOneCartItems };
//# sourceMappingURL=cartItemsController.js.map