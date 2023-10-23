import './config.js';
import express from 'express';
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
import Stripe from 'stripe';




const app = express();
const PORT = 3000;


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
  console.log(`Server is running on port ${PORT}`);
});




