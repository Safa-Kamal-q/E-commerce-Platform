import './config.js';
import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import "reflect-metadata"
import { initDB } from './db/dataSource.js';
import usersRouter from './routers/userRouter.js'
const app = express();
const PORT = 3000;
app.use(express.json());
dotenv.config();

const dbConnection = mysql.createPool({
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
});

// Test the database connection
dbConnection.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
    connection.release(); // Release the connection back to the pool
  }
});


app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
  initDB();
});