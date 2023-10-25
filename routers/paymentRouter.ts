import express from 'express';
import bodyParser from 'body-parser';
import * as paymentController from '../controllers/paymentController.js';
import dotenv from 'dotenv';

dotenv.config();


const paymentRoute = express();

paymentRoute.use(bodyParser.json());
paymentRoute.use(bodyParser.urlencoded({ extended: false }));

paymentRoute.post('/create-customer', (req, res) => paymentController.createCustomer(req, res));
paymentRoute.post('/add-card', (req, res) => paymentController.addNewCard(req, res));
paymentRoute.post('/create-charges', (req, res) => paymentController.createCharges(req, res));

export default paymentRoute;
