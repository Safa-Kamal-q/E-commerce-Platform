import { createConnection, Connection } from 'typeorm';
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


export let connection: Connection; // Declare a connection variable

export async function initDB(): Promise<void> {
  try {
    connection = await createConnection({
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


console.log('Connected to the database');
} catch (error) {
  console.error('Failed to connect to the database:', error);
  throw error;
}
}



//////////////////////////////////////
// // this to test locally 
// export const initDB = async () =>
//   await dataSource.initialize().then(() => {
//     console.log("Connected to DB!");
//   }).catch(err => {
//     console.error('Failed to connect to DB: ' + err);
//   });
//////////////////////////////
export default DataSource