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

dotenv.config(); // Load environment variables from .env file

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_ADDON_HOST,
  port: Number(process.env.MYSQL_ADDON_PORT),
  username: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  entities: [
      User,
       Role,
       Product,
       Permission,
       OrderOneProduct,
       ShoppingCart,
       OrderCartItem,
       ShoppingCartItem,
       PaymentInfo,
       SellerProfile
       ],
      synchronize: true, // Set to true for development; consider migrations for production
      logging: false, // Set to true to log SQL queries (for debugging)
    });

export const initDB = async () =>
    await dataSource.initialize().then(() => {
        console.log('DB connected');
    }).catch(err => {
        console.log("DB connection failed", err);
    });




//////////////////////////////////////
// // this to test locally 
// const dataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   // username: process.env.DB_USER,
//   username: 'root',
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [
//     User,
//     Role,
//     Product,
//     Permission,
//     OrderOneProduct,
//     ShoppingCart,
//     OrderCartItem,
//     ShoppingCartItem,
//     PaymentInfo,
//     SellerProfile
//   ],
//   synchronize: true, // Set to true for development; consider migrations for production
//   logging: false, // Set to true to log SQL queries (for debugging)
// });


// export const initDB = async () =>
//   await dataSource.initialize().then(() => {
//     console.log("Connected to DB!");
//   }).catch(err => {
//     console.error('Failed to connect to DB: ' + err);
//   });
//////////////////////////////
export default dataSource;
