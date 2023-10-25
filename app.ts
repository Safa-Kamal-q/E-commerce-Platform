import './config.js';
import express from 'express';
import "reflect-metadata"
import mysql from 'mysql2'
import baseLogger from './logger.js';
import {initDB} from './db/dataSource.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'
import roleRouter from './routers/roleRouter.js'
import paymentRoute from './routers/paymentRouter.js';
import permissionRouter from './routers/permissionRouter.js'
import productRouter from './routers/productRouter.js'
import cartItemsRouter from './routers/cartItemsRouter.js'
import orderOneProductRouter from './routers/orderOneProductRouter.js'
import orderCartItems from './routers/orderCartItemRouter.js'

import { error404Handler, errorLogger, errorSender } from './middlewares/errorHandlers/genericHandler.js';

import cors from 'cors'; // Import the cors middleware
import Stripe from 'stripe';


const app = express();
const PORT = 3000;

app.use('/', paymentRoute);
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




initDB().then(() => {
  console.log("Connected to DB!");
}).catch((err: any) => {
  console.error('Failed to connect to DB: ' + err);
});
///////////////////////////////
// initDB().then(() => {
//   console.log("Connected to DB!");
// }).catch((err: any) => {
//   console.error('Failed to connect to DB: ' + err);
// });
////////////////////////


app.get('/', (req, res) => {
  res.send('Server UP!');
});


app.use('/users', authRouter);
app.use('/users', userRouter);
app.use('/roles', roleRouter)
app.use('/permissions', permissionRouter)
app.use('/products', productRouter)
app.use('/cart-items', cartItemsRouter)
app.use('/order-one-product', orderOneProductRouter)
app.use('/order-cart-items', orderCartItems)

app.use(errorLogger);
app.use(errorSender);
app.use(error404Handler);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  baseLogger.info(`App is running and Listening on port ${PORT}`);
  ///////////////
  initDB();
  ///////////////
});




