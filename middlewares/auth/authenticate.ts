import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../db/entities/User.js';
import ApiError from '../errorHandlers/apiError.js';

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['authorization'] || '';
  let tokenIsValid;
  try {
    tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
  } catch (error) { }

  if (tokenIsValid) {
    const decoded = jwt.decode(token, { json: true });
    const user = await User.findOne({ where: { email: decoded?.email || '' }, relations: ['paymentInfo'] });
    res.locals.user = user;
    next();
  } else {
    next(new ApiError("You are Unauthorized!", 401))
  }
}

export {
  authenticate
}