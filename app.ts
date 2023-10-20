import './config.js';
import express from 'express';
///////////////////
// import AWS, { S3 } from 'aws-sdk';
// import * as mysql from 'mysql2';

// // Your code here
// import dotenv from 'dotenv';
/////////////////////////
import "reflect-metadata"
import baseLogger from './logger.js';

import {initDB} from './db/dataSource.js'
import usersRouter from './routers/authRouter.js'
import roleRouter from './routers/roleRouter.js'
import permissionRouter from './routers/permissionRouter.js'
import productRouter from './routers/productRouter.js'
import cartItemsRouter from './routers/cartItemsRouter.js'
import orderOneProductRouter from './routers/orderOneProductRouter.js'
import orderCartItems from './routers/orderCartItemRouter.js'

import cors from 'cors'; // Import the cors middleware
import Stripe from 'stripe';


//////////
// dotenv.config();
//////////////

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());


// AWS.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: process.env.AWS_REGION,
// });


///////////////////////////////
initDB().then(() => {
  console.log("Connected to DB!");
}).catch((err: any) => {
  console.error('Failed to connect to DB: ' + err);
});
////////////////////////


app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.use('/users', usersRouter);
app.use('/roles', roleRouter)
app.use('/permissions', permissionRouter)
app.use('/products', productRouter)
app.use('/cart-items', cartItemsRouter)
app.use('/order-one-product', orderOneProductRouter)
app.use('/order-cart-items', orderCartItems)

app.use((req, res) => {
  res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, () => {
  baseLogger.info(`App is running and Listening on port ${PORT}`);
  ///////////////
  // initDB();
  ///////////////
});

