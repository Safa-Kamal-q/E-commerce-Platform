import { In } from "typeorm";
import { NSUser } from "../@types/user.js";
import dataSource from "../db/dataSource.js";
import { Role } from "../db/entities/Role.js";
import { User } from "../db/entities/User.js";
import { Order } from "../db/entities/Order.js";
import { ShoppingCart } from "../db/entities/ShoppingCart.js";
import { PaymentInfo } from "../db/entities/PaymentInfo.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SellerProfile } from "../db/entities/SellerProfile.js";

//when the type is seller it will build paymentInfo
//we will build cart for all user type except admin 
//must we add profile for seller? 
const insertUser = async (payload: NSUser.SingleUser) => {
    return dataSource.manager.transaction(async transaction => {
        try {
            const newUser = new User();
            newUser.userName = payload.userName
            newUser.email = payload.email
            newUser.password = payload.password
            newUser.country = payload.country
            newUser.type = payload.type
            newUser.phoneNumber= payload.phoneNumber

            //the admin user just to manage the system so he hasn't orders, and has all roles by default 
            if (newUser.type !== 'admin') {
                newUser.roles = await Role.findBy({
                    id: In(payload.roles)
                });

                newUser.orders = await Order.findBy({
                    id: In(payload.orders)
                });

                const cart = ShoppingCart.create({
                    totalPrice: 0,
                    cartItems: []
                });
                newUser.cart = cart
                await transaction.save(cart);
            }

            if (newUser.type === 'buyer') {
                const paymentInfo = PaymentInfo.create({
                    nameForReceipt: payload.nameForReceipt,
                    city: payload.city,
                    fullAddress: payload.fullAddress
                })
                newUser.paymentInfo = paymentInfo
                await transaction.save(paymentInfo);
            }

            if (newUser.type === 'seller') {
                const sellerProfile = SellerProfile.create({
                    identityNumber: payload.identityNumber,
                    nickName: payload.nickName,
                    shopName: payload.shopName,
                    accountNumber: payload.accountNumber,
                    accountType: payload.accountType,
                    shippingLocation: payload.shippingLocation
                })
                newUser.sellerProfile = sellerProfile
                await transaction.save(sellerProfile);
            }

            await transaction.save(newUser);
            return newUser;
        } catch (error) {
            console.log(error)
            throw ("Something went wrong");
        }
    });
}

const login = async (email: string, password: string) => {
    try {
        const user = await User.findOneBy({
            email
        });

        const passwordMatching = await bcrypt.compare(password, user?.password || '');

        if (user && passwordMatching) {
            const token = jwt.sign(
                {
                    email: user.email,
                    fullName: user.userName
                },
                process.env.SECRET_KEY || '',
                {
                    expiresIn: "30m"
                }
            );

            return { token, fullName: user.userName };
        } else {
            throw ("Invalid Username or password!");
        }
    } catch (error) {
        console.log(error)
        throw ("Invalid Username or password!");
    }
}


export {
    insertUser,
    login
}
