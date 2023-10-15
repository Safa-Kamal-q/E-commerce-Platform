import { Request, Response } from 'express';
import Stripe from 'stripe';
import { OrderOneProduct } from '../db/entities/OrderOneProduct.js';

const stripeApiKey = process.env.STRIPE_API_KEY || 'your-default-key';

// Initialize Stripe with your secret API key from process.env
const stripe = new Stripe(stripeApiKey, {
    apiVersion: '2023-08-16', // Specify the Stripe API version
  });

// Process a payment
export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a payment intent with Stripe
    const myPayment: Stripe.PaymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: req.body.amount,
      currency: 'ils',
      metadata: {
        company: 'Ecommerce',
      },
    });

    // Send a success response with the client secret
    res.status(200).json({
      success: true,
      clientSecret: myPayment.client_secret,
      message: 'Payment Successfully done',
    });
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
};

// Send the Stripe API key from process.env
export const sendStripeApiKey = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
};
function next(error: unknown) {
    throw new Error('Function not implemented.');
}

