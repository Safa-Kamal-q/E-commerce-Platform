import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";
import { Product } from "./entities/Product.js";
import { Permission } from "./entities/Permission.js";
import { OrderOneProduct } from "./entities/OrderOneProduct.js";
import { ShoppingCart } from "./entities/ShoppingCart.js";
import { ShoppingCartItem } from "./entities/ShoppingCartItems.js";
import { PaymentInfo } from "./entities/PaymentInfo.js";
import dotenv from 'dotenv';
import { SellerProfile } from "./entities/SellerProfile.js";
import { OrderCartItem } from "./entities/OrderCartItem.js";

import baseLogger from "../logger.js";
dotenv.config(); // Load environment variables from .env file

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User,
        Role,
        Product,
        Permission,
        OrderCartItem,
        ShoppingCart,
        OrderOneProduct,
        ShoppingCartItem,
        PaymentInfo,
        SellerProfile
    ],
    synchronize: true, 
    logging: false, 
});

export const initDB = async () =>
    await dataSource.initialize().then(() => {
        baseLogger.info("Connected to DB!");
    }).catch(err => {
        baseLogger.error('Failed to connect to DB: ' + err)
    });

export default dataSource;
