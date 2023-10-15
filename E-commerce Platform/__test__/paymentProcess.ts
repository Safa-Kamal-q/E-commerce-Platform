import { Request, Response } from 'express';
import { processPayment } from '../controllers/paymentController.js';

describe('Payment Controller', () => {
  it('should process payment and return a client secret', async () => {
    const req: Request = { body: { amount: 1000 } } as Request;
    const res: Response = {
        status: jest.fn(() => res),
        json: jest.fn(),
    } as unknown as Response;

    await processPayment(req, res);

    // Assert that the response contains a client secret
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        clientSecret: expect.any(String),
        message: 'Payment Successfully done',
      })
    );
  });
});
