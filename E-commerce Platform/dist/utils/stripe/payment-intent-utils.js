// pages/api/payment-intent.js
import stripe from 'stripe'; // You should import the Stripe package for Node.js
export default async (req, res) => {
    if (req.method === 'POST') {
        const { cartTotal } = req.body;
        try {
            const intent = await stripe.paymentIntents.create({
                amount: cartTotal * 100,
                currency: 'ils',
                automatic_payment_methods: { enabled: true },
            });
            res.json({ client_secret: intent.client_secret });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating payment intent' });
        }
    }
    else {
        res.status(405).end(); // Method Not Allowed
    }
};
//# sourceMappingURL=payment-intent-utils.js.map