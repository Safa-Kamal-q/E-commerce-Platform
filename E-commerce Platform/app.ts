import './config.js';
import express from 'express';
///////////////////
// import multer from 'multer';
// import * as AWS from 'aws-sdk'; // Import AWS SDK
// import mysql from 'mysql';
// import dotenv from 'dotenv';
/////////////////////////
import "reflect-metadata"
import { initDB } from './db/dataSource.js';
import usersRouter from './routers/authRouter.js'
import roleRouter from './routers/roleRouter.js'
import permissionRouter from './routers/permissionRouter.js'

const app = express();
const PORT = 3000;
app.use(express.json());
//////////
// dotenv.config();
//////////////


// AWS.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3(); // Create an S3 instance


// // Configure Multer for S3
// const upload = multer({
//   storage: multer.memoryStorage(), // Use memory storage to temporarily store the file
// });

// // Define a route to handle file uploads
// app.post('/upload', upload.single('image'), (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // Upload the file to S3
//   const params = {
//     Bucket: 'my-ecommerce-files',
//     Key: file.originalname, // Use the original file name as the key
//     Body: file.buffer,
//     ACL: 'public-read', // Set ACL for public access
//   };

//   s3.upload(params, (err: any, data: { Location: any; }) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error uploading file.');
//     }

//     // Respond with the URL of the uploaded file
//     res.json({ url: data.Location });
//   });
// });


////////////////////////////////////
// const dbConnection = mysql.createPool({
//   host: process.env.DB_HOST || '',
//   port: Number(process.env.DB_PORT) || 3306,
//   user: process.env.DB_USER || '',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || '',
// });

// Test the database connection
// dbConnection.getConnection((err, connection) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to the database.');
//     connection.release(); // Release the connection back to the pool
//   }
// });
/////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.use('/users', usersRouter);
app.use('/roles', roleRouter)
app.use('/permissions', permissionRouter)

app.use((req, res) => {
  res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
  initDB();
});