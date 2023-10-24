import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
});

export const createNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).send(customer);
  } catch (error) {
    next(error); // Handle the error using 'next' instead of 'throw'
  }
};

export const addNewCard = async (req: Request, res: Response, next: NextFunction) => {
  const {
    customer_Id,
    card_Name,
    card_ExpYear,
    card_ExpMonth,
    card_Number,
    card_CVC,
  } = req.body;

  try {
    const card_Token = await stripe.tokens.create({
      card: {
        name: card_Name,
        number: card_Number,
        exp_month: card_ExpMonth,
        exp_year: card_ExpYear,
        cvc: card_CVC,
      },
    });

    const card = await stripe.customers.createSource(customer_Id, {
      source: card_Token.id, // Do not convert to string
    });

    return res.status(200).send({ card: card.id });
  } catch (error) {
    next(error); // Handle the error using 'next' instead of 'throw'
  }
};

export const createCharges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCharge = await stripe.charges.create({
      receipt_email: 'test@gmail.com',
      amount: 50 * 100, // USD * 100
      currency: 'inr',
      source: req.body.card_ID,
      customer: req.body.customer_Id,
    });
    res.send(createCharge);
  } catch (error) {
    next(error); // Handle the error using 'next' instead of 'throw'
  }
};
