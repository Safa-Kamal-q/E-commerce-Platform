import { processPayment } from '../controllers/paymentController.js';
describe('Payment Controller', () => {
    it('should process payment and return a client secret', async () => {
        const req = { body: { amount: 1000 } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        await processPayment(req, res);
        // Assert that the response contains a client secret
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            clientSecret: expect.any(String),
            message: 'Payment Successfully done',
        }));
    });
});
//# sourceMappingURL=paymentProcess.js.map