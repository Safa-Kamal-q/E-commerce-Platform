import { Router, Request, Response, NextFunction } from 'express';
import stripe from 'stripe';
import * as stripeHandler from '../controllers/stripeHandler.js';


const router = Router();
const stripeInstance = new stripe('sk_test_51JINs1SHKFpjeywqugn3nyuLK1inUNc6uN5GJsN0ESwCahDK8uOSLhXgS0ezrTqPRp5TxaW2jynxhFWno7fPfOeV00Y5a48XSG', {
    apiVersion: '2023-08-16', // Specify your desired Stripe API version
  });


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Stripe Checkout Example' });
  });



router.post('/create-checkout-session', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await stripeInstance.checkout.sessions.create({
        customer: 'cus_KudUxj75qTue5P',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price: 'price_1KEoG2SHKFpjeywqDvm3EbiI', // One-time pricing
          quantity: req.body.quantity,
        }],
        success_url: 'http://localhost:4900/success.html?id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:4900/cancel.html',
      });
      res.send({ id: session.id });
    } catch (e) {
      console.error(e);
      res.status(500).send('Error creating a checkout session');
    }
  });

  router.post('/create-Customer', stripeHandler.createNewCustomer);
  router.post('/add-Card', stripeHandler.addNewCard);
  router.post('/create-Charges', stripeHandler.createCharges);

export default router;
