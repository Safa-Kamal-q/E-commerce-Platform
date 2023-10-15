import Stripe from 'stripe';
const stripeApiKey = process.env.STRIPE_API_KEY || 'your-default-key';
// Initialize Stripe with your secret API key from process.env
const stripe = new Stripe(stripeApiKey, {
    apiVersion: '2023-08-16', // Specify the Stripe API version
});
// Process a payment
export const processPayment = async (req, res) => {
    try {
        // Create a payment intent with Stripe
        const myPayment = await stripe.paymentIntents.create({
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
    }
    catch (error) {
        next(error); // Pass any errors to the error handler
    }
};
// Send the Stripe API key from process.env
export const sendStripeApiKey = async (req, res) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
};
function next(error) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=paymentController.js.map