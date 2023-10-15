import './config.js';
import express from 'express';
///////////////////
// import AWS, { S3 } from 'aws-sdk';
// import * as mysql from 'mysql2';

// // Your code here
// import dotenv from 'dotenv';
/////////////////////////
import "reflect-metadata"
import { initDB } from './db/dataSource.js';
import usersRouter from './routers/authRouter.js'
import roleRouter from './routers/roleRouter.js'
import permissionRouter from './routers/permissionRouter.js'
import productRouter from './routers/productRouter.js'
import cartItemsRouter from './routers/cartItemsRouter.js'
import orderOneProductRouter from './routers/orderOneProductRouter.js'
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


////////////////////////////

// const s3 = new AWS.S3();
// const pool = mysql.createPool({
//   connectionLimit: 10, // You can adjust this limit as needed
//   host: process.env.DB_HOST || '',
//   port: Number(process.env.DB_PORT) || 3306,
//   user: process.env.DB_USER || '',
//   password: process.env.DB_PASSWORD || '',
//   database: 'your_database', // Replace with your database name
// });

// To perform a database operation, acquire a connection from the pool
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error getting connection from the pool:', err);
//     return;
//   }

//   // Use the acquired connection to execute queries
//   connection.query('SELECT * FROM your_table', (queryErr, results) => {
//     if (queryErr) {
//       console.error('Error executing query:', queryErr);
//     } else {
//       console.log('Query results:', results);
//       // Process the query results here
//     }

//     // Release the connection back to the pool when done
//     connection.release();
//   });
// });
///////////////////

app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.use('/users', usersRouter);
app.use('/roles', roleRouter)
app.use('/permissions', permissionRouter)
app.use('/products', productRouter)
app.use('/cart-items', cartItemsRouter)
app.use('/order-one-product', orderOneProductRouter)

app.use((req, res) => {
  res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
  initDB();
});

