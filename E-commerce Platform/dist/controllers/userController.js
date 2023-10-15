import { In } from "typeorm";
import dataSource from "../db/dataSource.js";
import Role from "../db/entities/Role.js";
import { User } from "../db/entities/User.js";
import { Order } from "../db/entities/Order.js";
import { ShoppingCart } from "../db/entities/ShoppingCart.js";
import { PaymentInfo } from "../db/entities/PaymentInfo.js";
//when the type is seller it will build paymentInfo
//we will build cart for all user type except admin 
//must we add profile for seller? 
const insertUser = async (payload) => {
    return dataSource.manager.transaction(async (transaction) => {
        try {
            const newUser = new User();
            newUser.userName = payload.userName;
            newUser.email = payload.email;
            newUser.password = payload.password;
            newUser.country = payload.country;
            newUser.type = payload.type;
            newUser.roles = await Role.findBy({
                id: In(payload.roles)
            });
            newUser.orders = await Order.findBy({
                id: In(payload.orders)
            });
            if (newUser.type !== 'admin') {
                const cart = ShoppingCart.create({
                    totalPrice: 0,
                    cartItems: []
                });
                newUser.cart = cart;
                await transaction.save(cart);
            }
            if (newUser.type === 'buyer') {
                const paymentInfo = PaymentInfo.create({
                    fullBuyerName: payload.fullBuyerName,
                    phoneNumber: payload.phoneNumber,
                    city: payload.city,
                    fullAddress: payload.fullAddress
                });
                newUser.paymentInfo = paymentInfo;
                await transaction.save(paymentInfo);
            }
            await newUser.save();
            return newUser;
        }
        catch (error) {
            throw ("Something went wrong");
        }
    });
};
export { insertUser };
//# sourceMappingURL=userController.js.map