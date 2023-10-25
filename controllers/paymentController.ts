import { Request, Response } from 'express';
import Stripe from 'stripe';import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
    apiVersion: '2023-08-16',
});

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).send(customer);
  } catch (error: any) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

export const addNewCard = async (req: Request, res: Response) => {
  try {
    const {
      customer_id,
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
      card_token, // Include card_token in the request body
    } = req.body;

    let token;

    // Check if card_token is provided, generate one if not
    if (card_token) {
      token = card_token;
    } else {
      const generatedToken = await stripe.tokens.create({
        card: {
          name: card_Name,
          number: card_Number,
          exp_year: card_ExpYear,
          exp_month: card_ExpMonth,
          cvc: card_CVC,
        },
      });

      token = generatedToken.id;
    }

    // Now you can use the token to create a card source
    const card = await stripe.customers.createSource(customer_id, {
      source: token,
    });

    res.status(200).send({ card: card.id });
  } catch (error: any) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

export const createCharges = async (req: Request, res: Response) => {
  try {
    const createCharge = await stripe.charges.create({
      amount: parseInt(req.body.amount) * 100,
      currency: 'ils', // Use lowercase 'inr' for the currency
      source: req.body.card_id, // Use 'source' instead of 'card'
      customer: req.body.customer_id,
      description: 'Your charge description here', // Add a description as needed
      receipt_email: 'tester@gmail.com',
    });
    
    res.status(200).send(createCharge);
  } catch (error: any) {
    res.status(400).send({ success: false, msg: error.message });
  }
};