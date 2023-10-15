import express, { Router } from 'express';
import { Request, Response } from 'express';
import { processPayment, sendStripeApiKey } from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';

const router: Router = express.Router();

router.route('/payment').post(authenticate, (req: Request, res: Response) => {
    processPayment(req, res);
});

router.route('/stripeapikey').get(authenticate, (req: Request, res: Response) => {
    sendStripeApiKey(req, res);
});

export default router;
