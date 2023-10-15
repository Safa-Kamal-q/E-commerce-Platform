import express from 'express';
import { Request, Response } from 'express';
import { processPayment, sendStripeApiKey } from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';

const router = express.Router();

router.route('/payment').post(authenticate, processPayment);

router.route('/stripeapikey').get(authenticate, sendStripeApiKey);

export default router;
